<?php

namespace App\Http\Controllers\Auth\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use Illuminate\Http\Request;
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

        $admin = AdminUser::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            throw ValidationException::withMessages([
                'email' => ['メールアドレスまたはパスワードが正しくありません。'],
            ]);
        }

        // セッションベースの認証
        Auth::guard('admin')->login($admin, $request->boolean('remember'));

        $request->session()->regenerate();

        return response()->json([
            'message' => 'ログインしました',
            'admin' => $admin,
        ]);
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
