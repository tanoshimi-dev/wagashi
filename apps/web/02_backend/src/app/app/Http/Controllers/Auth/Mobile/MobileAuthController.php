<?php

namespace App\Http\Controllers\Auth\Mobile;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\PasswordResetCode;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;

use App\Services\FirebaseService;

class MobileAuthController extends Controller
{

    protected FirebaseService $firebaseService;

    public function __construct(FirebaseService $firebaseService)
    {
        $this->firebaseService = $firebaseService;
    }

    /**
     * Firebase認証によるログイン/登録
     */
    public function firebaseAuth(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'id_token' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 422);
            }

            // Firebase ID Tokenを検証
            $result = $this->firebaseService->verifyIdToken($request->id_token);

            if (!$result['success']) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid Firebase token',
                    'error' => $result['error'],
                ], 401);
            }

            // ユーザーを取得または作成
            $user = User::firstOrCreate(
                ['email' => $result['email']],
                [
                    'name' => $result['claims']['name'] ?? explode('@', $result['email'])[0],
                    'firebase_uid' => $result['uid'],
                    'email_verified_at' => $result['email_verified'] ? now() : null,
                    'password' => Hash::make(Str::random(32)), // ランダムパスワード
                ]
            );

            // メール未認証の場合は認証済みにする
            if (!$user->email_verified_at && $result['email_verified']) {
                $user->markEmailAsVerified();
            }

            // 新規ユーザーの場合はウェルカムメールを送信
            // if ($user->wasRecentlyCreated) {
            //     $user->notify(new WelcomeEmail());
            // }

            // トークンを作成
            // $deviceName = $this->generateDeviceName($request);
            // $token = $user->createToken(
            //     name: $deviceName,
            //     abilities: ['mobile:read', 'mobile:write', 'mobile:update'],
            //     expiresAt: now()->addDays(30)
            // );

            // 登録後にメール認証を送信
            $user->sendMobileEmailVerificationNotification();
            // 登録イベントを発火（メール認証通知を送信）
            //event(new Registered($user));

            // デバイス情報を作成
            $deviceName = $this->generateDeviceName($request);
            
            // メール未認証でも使える制限付きトークンを作成
            $token = $user->createToken(
                name: $deviceName,
                abilities: ['mobile:unverified'], // 制限付き権限
                // abilities: ['mobile:read', 'mobile:write', 'mobile:update'],
                expiresAt: now()->addDays(7) // 7日間の制限付きアクセス
            );            

            return response()->json([
                'status' => 'success',
                'message' => $user->wasRecentlyCreated ? 'Account created successfully' : 'Login successful',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'email_verified_at' => $user->email_verified_at,
                        'firebase_uid' => $user->firebase_uid,
                    ],
                    'token' => $token->plainTextToken,
                    'token_type' => 'Bearer',
                    'expires_at' => $token->accessToken->expires_at?->toISOString(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Firebase authentication failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * モバイルアプリ用ユーザー登録
     */
    public function register(Request $request): JsonResponse
    {
// dump($request->all());

// // With this:
// \Log::info('Registration request data:', $request->all());
// \Log::info('Request headers:', $request->headers->all());
// \Log::info('Request method:', $request->method());
// \Log::info('Request URL:', $request->fullUrl());
        try {

            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);


            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // モバイルアプリ用のトークンを作成
            $token = $user->createToken(
                name: 'mobile-app-' . $request->header('User-Agent', 'unknown'),
                abilities: ['mobile:read', 'mobile:write']
            )->plainTextToken;

            // MobileAuthControllerのregisterメソッドに以下を追加
            // 登録後にメール認証を送信
            $user->sendMobileEmailVerificationNotification();
            // 登録イベントを発火（メール認証通知を送信）
            //event(new Registered($user));

            // デバイス情報を作成
            $deviceName = $this->generateDeviceName($request);
            
            // メール未認証でも使える制限付きトークンを作成
            $token = $user->createToken(
                name: $deviceName,
                abilities: ['mobile:unverified'], // 制限付き権限
                expiresAt: now()->addDays(7) // 7日間の制限付きアクセス
            );

            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully. Please check your email to verify your account.',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'email_verified_at' => $user->email_verified_at,
                        'created_at' => $user->created_at->toISOString(),
                    ],
                    'token' => $token->plainTextToken,
                    'token_type' => 'Bearer',
                    'token_name' => $token->accessToken->name,
                    'expires_at' => $token->accessToken->expires_at?->toISOString(),
                    'requires_email_verification' => true,
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * モバイルアプリ用ログイン
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'device_name' => 'string|max:255', // デバイス識別用
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // 既存のトークンを削除（オプション）
        if ($request->boolean('revoke_other_tokens', false)) {
            $user->tokens()->delete();
        }

        // 新しいトークンを作成
        $deviceName = $request->device_name ?? 'mobile-app-' . now()->timestamp;
        $token = $user->createToken(
            name: $deviceName,
            abilities: ['mobile:read', 'mobile:write'],
            expiresAt: now()->addDays(30) // 30日間有効
        )->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
            ],
            'token' => $token,
            'token_type' => 'Bearer',
            'expires_at' => now()->addDays(30)->toISOString(),
        ]);
    }

    /**
     * ユーザー情報取得
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
            'token_info' => [
                'name' => $request->user()->currentAccessToken()->name,
                'abilities' => $request->user()->currentAccessToken()->abilities,
                'created_at' => $request->user()->currentAccessToken()->created_at,
                'expires_at' => $request->user()->currentAccessToken()->expires_at,
            ]
        ]);
    }

    /**
     * ログアウト（現在のトークンを無効化）
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    /**
     * 全てのトークンを無効化
     */
    public function logoutAll(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'All sessions logged out successfully'
        ]);
    }

    /**
     * トークン一覧取得
     */
    public function tokens(Request $request): JsonResponse
    {
        $tokens = $request->user()->tokens()->select([
            'id', 'name', 'abilities', 'created_at', 'updated_at', 'expires_at', 'last_used_at'
        ])->get();

        return response()->json([
            'tokens' => $tokens
        ]);
    }

    /**
     * 特定のトークンを削除
     */
    public function revokeToken(Request $request, $tokenId): JsonResponse
    {
        $deleted = $request->user()->tokens()->where('id', $tokenId)->delete();

        if ($deleted) {
            return response()->json([
                'message' => 'Token revoked successfully'
            ]);
        }

        return response()->json([
            'message' => 'Token not found'
        ], 404);
    }

    /**
     * メール認証リンクの再送信
     */
    public function resendEmailVerification(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            if ($user->hasVerifiedEmail()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email is already verified',
                ], 422);
            }

            // $user->sendEmailVerificationNotification();
            $user->sendMobileEmailVerificationNotification();

            return response()->json([
                'status' => 'success',
                'message' => 'Email verification link sent successfully',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to send verification email',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * メール認証（モバイル用）
     */
    public function verifyEmail(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'verification_code' => 'required|string',
                'email' => 'required|email',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User not found',
                ], 404);
            }

            if ($user->hasVerifiedEmail()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email is already verified',
                ], 422);
            }

            // 認証コードを検証（実装はカスタマイズが必要）
            if ($this->verifyEmailCode($user, $request->verification_code)) {
                $user->markEmailAsVerified();
                event(new Verified($user));

                // 制限付きトークンを削除し、フル権限のトークンを作成
                $user->tokens()->where('abilities', 'like', '%mobile:unverified%')->delete();
                
                $deviceName = $this->generateDeviceName($request);
                $token = $user->createToken(
                    name: $deviceName,
                    abilities: ['mobile:read', 'mobile:write', 'mobile:update'],
                    expiresAt: now()->addDays(30)
                );

                return response()->json([
                    'status' => 'success',
                    'message' => 'Email verified successfully',
                    'data' => [
                        'user' => [
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'email_verified_at' => $user->email_verified_at,
                        ],
                        'token' => $token->plainTextToken,
                        'token_type' => 'Bearer',
                    ]
                ]);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Invalid verification code',
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email verification failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * パスワードリセットリンクの送信
     */
    public function sendPasswordResetLink(Request $request): JsonResponse
    {
        // try {
        //     $validator = Validator::make($request->all(), [
        //         'email' => 'required|email|exists:users,email',
        //     ]);

        //     if ($validator->fails()) {
        //         return response()->json([
        //             'status' => 'error',
        //             'message' => 'Validation failed',
        //             'errors' => $validator->errors(),
        //         ], 422);
        //     }

        //     $status = Password::sendResetLink($request->only('email'));

        //     if ($status === Password::RESET_LINK_SENT) {
        //         return response()->json([
        //             'status' => 'success',
        //             'message' => 'Password reset link sent to your email',
        //         ]);
        //     }

        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Failed to send password reset link',
        //     ], 500);

        // } catch (\Exception $e) {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Failed to send password reset link',
        //         'error' => $e->getMessage(),
        //     ], 500);
        // }

        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|exists:users,email',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $success = PasswordResetCode::sendResetCode($request->email);

            if ($success) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Password reset code sent to your email. Code expires in 15 minutes.',
                ]);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to send password reset code',
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to send password reset code',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * コードを使ったパスワードリセット（モバイル用）
     */
    public function resetPassword(Request $request): JsonResponse
    {
        // try {
        //     $validator = Validator::make($request->all(), [
        //         'email' => 'required|email',
        //         'token' => 'required|string',
        //         'password' => 'required|string|min:8|confirmed',
        //     ]);

        //     if ($validator->fails()) {
        //         return response()->json([
        //             'status' => 'error',
        //             'message' => 'Validation failed',
        //             'errors' => $validator->errors(),
        //         ], 422);
        //     }

        //     $status = Password::reset(
        //         $request->only('email', 'password', 'password_confirmation', 'token'),
        //         function ($user, $password) {
        //             $user->forceFill([
        //                 'password' => Hash::make($password),
        //                 'remember_token' => Str::random(60),
        //             ])->save();

        //             // パスワード変更後、全てのトークンを無効化
        //             $user->tokens()->delete();
        //         }
        //     );

        //     if ($status === Password::PASSWORD_RESET) {
        //         return response()->json([
        //             'status' => 'success',
        //             'message' => 'Password reset successfully. Please login with your new password.',
        //         ]);
        //     }

        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Failed to reset password. Invalid token or email.',
        //     ], 422);

        // } catch (\Exception $e) {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Password reset failed',
        //         'error' => $e->getMessage(),
        //     ], 500);
        // }
        
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|exists:users,email',
                'code' => 'required|string|size:6',
                'password' => 'required|string|min:8|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 422);
            }

            // コードを検証
            $isValid = PasswordResetCode::verifyCode($request->email, $request->code);

            if (!$isValid) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid or expired reset code',
                ], 422);
            }

            // パスワードを更新
            $user = User::where('email', $request->email)->first();
            $user->forceFill([
                'password' => Hash::make($request->password),
                'remember_token' => Str::random(60),
            ])->save();

            // 使用済みコードを削除
            PasswordResetCode::deleteUsedCode($request->email, $request->code);

            // 全てのトークンを無効化（セキュリティのため）
            $user->tokens()->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Password reset successfully. Please login with your new password.',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Password reset failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * メール認証コードを検証（カスタム実装）
     */
    private function verifyEmailCode(User $user, string $code): bool
    {
        // 実装例：データベースに保存された認証コードと比較
        // または、時間ベースのコード生成ロジックを使用
        
        // シンプルな例：ユーザーIDベースの固定コード
        $expectedCode = substr(md5($user->id . $user->email), 0, 6);
        
        return hash_equals($expectedCode, $code);
    }

    /**
     * デバイス名を生成
     */
    private function generateDeviceName(Request $request): string
    {
        $deviceType = $request->device_type ?? 'mobile';
        $deviceName = $request->device_name ?? 'Unknown Device';
        $timestamp = now()->format('Y-m-d_H:i:s');
        
        return "{$deviceType}-{$deviceName}-{$timestamp}";
    }

    /**
     * パスワードリセットコードの検証
     */
    public function verifyPasswordResetCode(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|exists:users,email',
                'code' => 'required|string|size:6',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $isValid = PasswordResetCode::verifyCode($request->email, $request->code);

            if ($isValid) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Code verified successfully. You can now reset your password.',
                ]);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired reset code',
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Code verification failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Firebase認証によるログイン（既存ユーザー）
     */
    public function firebaseLogin(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'id_token' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 422);
            }

            // Firebase ID Tokenを検証
            $result = $this->firebaseService->verifyIdToken($request->id_token);

            if (!$result['success']) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid Firebase token',
                    'error' => $result['error'],
                ], 401);
            }

            // ユーザーを取得
            $user = User::where('email', $result['email'])->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User not found. Please register first.',
                ], 404);
            }

            // メール認証状態を同期
            if (!$user->email_verified_at && $result['email_verified']) {
                $user->markEmailAsVerified();
            }

            // メール未認証の場合はエラー
            if (!$user->hasVerifiedEmail()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Please verify your email before signing in.',
                    'requires_verification' => true,
                ], 403);
            }

            // 既存の古いトークンを削除（オプション）
            $user->tokens()->where('created_at', '<', now()->subDays(30))->delete();

            // 新しいトークンを作成
            $deviceName = $this->generateDeviceName($request);
            $token = $user->createToken(
                name: $deviceName,
                abilities: ['mobile:read', 'mobile:write', 'mobile:update'],
                expiresAt: now()->addDays(30)
            );

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'email_verified_at' => $user->email_verified_at,
                        'firebase_uid' => $user->firebase_uid,
                    ],
                    'token' => $token->plainTextToken,
                    'token_type' => 'Bearer',
                    'expires_at' => $token->accessToken->expires_at?->toISOString(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Login failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}