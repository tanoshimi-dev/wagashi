<?php

use App\Http\Controllers\Auth\Admin\AdminAuthController;
use App\Http\Controllers\Auth\Admin\AdminPasswordResetController;
use Illuminate\Support\Facades\Route;

// ========================================
// 管理者認証ルート（未認証）
// ========================================
Route::middleware('guest:admin')->prefix('admin')->group(function () {
    
    // ログイン
    Route::post('login', [AdminAuthController::class, 'login'])
        ->name('admin.login');

    // パスワードリセットリクエスト
    Route::post('forgot-password', [AdminPasswordResetController::class, 'sendResetLink'])
        ->name('admin.password.email');

    // パスワードリセット実行
    Route::post('reset-password', [AdminPasswordResetController::class, 'reset'])
        ->name('admin.password.store');
});

// ========================================
// 管理者認証ルート（認証済み）
// ========================================
Route::middleware('auth:admin')->prefix('admin')->group(function () {
    
    // 管理者情報取得
    Route::get('user', [AdminAuthController::class, 'user'])
        ->name('admin.user');

    // ログアウト
    Route::post('logout', [AdminAuthController::class, 'logout'])
        ->name('admin.logout');

    // パスワード変更
    Route::post('change-password', [AdminAuthController::class, 'changePassword'])
        ->name('admin.password.change');
});