<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\Mobile\MobileAuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\AnnouncementController;

// ========================================
// 管理者用API（認証必須）
// admin_auth.php で管理しているため、ここでは API エンドポイントのみ
// ========================================
Route::middleware(['auth:admin', 'web'])->prefix('admin')->group(function () {
    // カテゴリ管理
    Route::post('/category-create', [CategoryController::class, 'createCategory']);
    Route::post('/category-update', [CategoryController::class, 'updateCategory']);
    Route::post('/category-delete', [CategoryController::class, 'deleteCategory']);

    // 原材料管理
    Route::get('/ingredients', [IngredientController::class, 'getIngredients']);
    Route::post('/ingredient-create', [IngredientController::class, 'createIngredient']);
    Route::post('/ingredient-update', [IngredientController::class, 'updateIngredient']);
    Route::post('/ingredient-delete', [IngredientController::class, 'deleteIngredient']);

    // タグ管理
    Route::get('/tags', [TagController::class, 'getTags']);
    Route::post('/tag-create', [TagController::class, 'createTag']);
    Route::post('/tag-update', [TagController::class, 'updateTag']);
    Route::post('/tag-delete', [TagController::class, 'deleteTag']);

    // 商品管理
    Route::post('/product-create', [ProductController::class, 'createProduct']);
    Route::post('/product-update', [ProductController::class, 'updateProduct']);
    Route::post('/product-delete', [ProductController::class, 'deleteProduct']);

    // お知らせ管理
    Route::post('/announcement-create', [AnnouncementController::class, 'createAnnouncement']);
    Route::post('/announcement-update', [AnnouncementController::class, 'updateAnnouncement']);
    Route::post('/announcement-delete', [AnnouncementController::class, 'deleteAnnouncement']);
});

// ========================================
// 公開API（認証不要）
// ========================================
Route::get('/products', [ProductController::class, 'getProducts']);
Route::get('/product', [ProductController::class, 'getProduct']);
Route::get('/announcements', [AnnouncementController::class, 'getAnnouncements']);
Route::get('/announcement', [AnnouncementController::class, 'getAnnouncement']);
Route::get('/categories', [CategoryController::class, 'getCategories']);

// ========================================
// モバイルアプリ用API（認証不要）
// ========================================
Route::prefix('mobile')->group(function () {
    Route::post('/register', [MobileAuthController::class, 'register']);
    Route::post('/register2', [MobileAuthController::class, 'firebaseAuth']);
    
    Route::post('/login', [MobileAuthController::class, 'login']);
    Route::post('/forgot-password', [MobileAuthController::class, 'sendPasswordResetLink']);
    Route::post('/reset-password', [MobileAuthController::class, 'resetPassword']);
    Route::post('/email/verify', [MobileAuthController::class, 'verifyEmail']);
});

// ========================================
// モバイルアプリ用API（認証必要）
// ========================================
Route::prefix('mobile')->middleware('auth:sanctum')->group(function () {
    Route::get('/user', [MobileAuthController::class, 'user']);
    Route::post('/logout', [MobileAuthController::class, 'logout']);
    Route::post('/logout-all', [MobileAuthController::class, 'logoutAll']);
    Route::get('/tokens', [MobileAuthController::class, 'tokens']);
    Route::delete('/tokens/{tokenId}', [MobileAuthController::class, 'revokeToken']);
    Route::post('/email/verification-notification', [MobileAuthController::class, 'resendEmailVerification']);
});

