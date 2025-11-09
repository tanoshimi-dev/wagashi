<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\Mobile\MobileAuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\AnnouncementController;
// use App\Http\Controllers\Auth\Mobile\MobilePasswordResetController;
// use App\Http\Controllers\Auth\Mobile\MobileEmailVerificationController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// SPA用API（セッション + CSRF認証）
Route::middleware(['auth:sanctum', 'web'])->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json([
            'user' => $request->user(),
            'auth_type' => 'spa'
        ]);
    });

    Route::post('/category-create', [CategoryController::class, 'createCategory']);
    Route::post('/category-update', [CategoryController::class, 'updateCategory']);
    Route::post('/category-delete', [CategoryController::class, 'deleteCategory']);

    Route::get('/ingredients', [IngredientController::class, 'getIngredients']);
    Route::post('/ingredient-create', [IngredientController::class, 'createIngredient']);
    Route::post('/ingredient-update', [IngredientController::class, 'updateIngredient']);
    Route::post('/ingredient-delete', [IngredientController::class, 'deleteIngredient']);

    Route::get('/tags', [TagController::class, 'getTags']);
    Route::post('/tag-create', [TagController::class, 'createTag']);
    Route::post('/tag-update', [TagController::class, 'updateTag']);
    Route::post('/tag-delete', [TagController::class, 'deleteTag']);

    Route::post('/product-create', [ProductController::class, 'createProduct']);
    Route::post('/product-update', [ProductController::class, 'updateProduct']);
    Route::post('/product-delete', [ProductController::class, 'deleteProduct']);

    Route::post('/announcement-create', [AnnouncementController::class, 'createAnnouncement']);
    Route::post('/announcement-update', [AnnouncementController::class, 'updateAnnouncement']);
    Route::post('/announcement-delete', [AnnouncementController::class, 'deleteAnnouncement']);

});

// TODO: 認証不要にするか検討
Route::get('/products', [ProductController::class, 'getProducts']);
Route::get('/product', [ProductController::class, 'getProduct']);
Route::get('/announcements', [AnnouncementController::class, 'getAnnouncements']);
Route::get('/announcement', [AnnouncementController::class, 'getAnnouncement']);
Route::get('/categories', [CategoryController::class, 'getCategories']);

// モバイルアプリ用API（認証不要）
Route::prefix('mobile')->group(function () {

    Route::post('/register', [MobileAuthController::class, 'register']);
    Route::post('/login', [MobileAuthController::class, 'login']);

    // パスワードリセット
    Route::post('/forgot-password', [MobileAuthController::class, 'sendPasswordResetLink']);
    Route::post('/reset-password', [MobileAuthController::class, 'resetPassword']);
    
    // メール認証（認証不要）
    Route::post('/email/verify', [MobileAuthController::class, 'verifyEmail']);
});

// モバイルアプリ用API（認証必要）
Route::prefix('mobile')->middleware('auth:sanctum')->group(function () {
    Route::get('/user', [MobileAuthController::class, 'user']);
    Route::post('/logout', [MobileAuthController::class, 'logout']);
    Route::post('/logout-all', [MobileAuthController::class, 'logoutAll']);
    Route::get('/tokens', [MobileAuthController::class, 'tokens']);
    Route::delete('/tokens/{tokenId}', [MobileAuthController::class, 'revokeToken']);

    // メール認証状態チェック
    //Route::get('/email/verification-status', [MobileEmailVerificationController::class, 'status']);
    // メール認証関連（認証必要）
    Route::post('/email/verification-notification', [MobileAuthController::class, 'resendEmailVerification']);


});


