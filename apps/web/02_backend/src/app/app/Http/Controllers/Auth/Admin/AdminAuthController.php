<?php

namespace App\Http\Controllers\Auth\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    /**
     * 管理者ログイン
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $adminUser = AdminUser::where('email', $request->email)->first();

        if (!$adminUser || !Hash::check($request->password, $adminUser->password)) {
            throw ValidationException::withMessages([
                'email' => ['メールアドレスまたはパスワードが正しくありません。'],
            ]);
        }

        // セッションベースの認証
        Auth::guard('admin')->login($adminUser, $request->boolean('remember'));

        $request->session()->regenerate();

        // return response()->json([
        //     'message' => 'ログインしました',
        //     'admin' => $admin,
        // ]);

        return new JsonResponse([
            'message'      => 'Authenticated.',
            // 'access_token' => $access_token,
            // 'token_type'   => 'Bearer',
            'user'         => $adminUser,
        ], 200);        
    }

    /**
     * 現在の管理者情報を取得
     */
    public function user(Request $request)
    {
        return response()->json([
            'admin' => Auth::guard('admin')->user(),
        ]);
    }

    /**
     * 管理者ログアウト
     */
    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'ログアウトしました',
        ]);
    }

    /**
     * CSRF Cookie を取得
     */
    public function csrf()
    {
        return response()->json([
            'message' => 'CSRF cookie set',
        ]);
    }
}
