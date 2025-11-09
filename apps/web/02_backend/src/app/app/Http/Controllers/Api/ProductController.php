<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{

    /**
     * get all products.
     */
    public function getProducts(Request $request): JsonResponse
    {

        $products = DB::table('products')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.category as category_name')
            ->orderBy('products.id', 'asc')
            ->get();

        return new JsonResponse([
            'message' => 'Products retrieved successfully.',
            'products' => $products,
        ], 200);

    }

    /**
     * get specific product.
     */
    public function getProduct(Request $request): JsonResponse
    {

        $productId = $request->input('pid');

        $product = DB::table('products')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.category as category_name')
            ->where('products.id', $productId)
            ->first();

        $productTags = DB::table('product_tags')
            ->select('product_tags.id', 'product_tags.product_id', 'product_tags.tag_id', 'tags.tag')
            ->leftJoin('tags', 'product_tags.tag_id', '=', 'tags.id')
            ->where('product_tags.product_id', $productId)
            ->get();
        
        $productIngredients = DB::table('product_ingredients')
            ->select('product_ingredients.id', 'product_ingredients.product_id', 'product_ingredients.ingredient_id', 'ingredients.ingredient')
            ->leftJoin('ingredients', 'product_ingredients.ingredient_id', '=', 'ingredients.id')
            ->where('product_ingredients.product_id', $productId)
            ->get();

        if (!$product) {
            return new JsonResponse([
                'message' => 'Product not found.',
            ], 404);
        }

        // $productにtagsとingredientsを追加
        if( $productTags ) {
            foreach( $productTags as $tag ) {
                $product->tags[] = $tag->tag_id;
                $product->tag_names[] = $tag->tag;
            }
        } else {
            $product->tags = [];
            $product->tag_names = [];
        }

        if( $productIngredients ) {
            foreach( $productIngredients as $ingredient ) {
                $product->ingredients[] = $ingredient->ingredient_id;
                $product->ingredient_names[] = $ingredient->ingredient;
            }
        } else {
            $product->ingredients = [];
            $product->ingredient_names = [];
        }

        return new JsonResponse([
            'message' => 'Product retrieved successfully.',
            'product' => $product,
            'product_tags' => $productTags,
            'product_ingredients' => $productIngredients,
        ], 200);

    }


    /**
     * create a product.
     */
    public function createProduct(Request $request): JsonResponse
    {

        $productName = $request->input('product_name');
        $productDescription = $request->input('product_description');
        $productPrice = $request->input('product_price');
        $categoryId = $request->input('category_id');
        //$productImageFile = $request->product_image_file;
        $productImageFile = $request->product_image_file;
        $tagIds = $request->input('tag_ids');
        $ingredientIds = $request->input('ingredient_ids');

        // 登録処理
        DB::transaction(function () use (
            $productName,
            $productDescription,
            $productPrice,
            $categoryId,
            $productImageFile,
            $tagIds,
            $ingredientIds
        ) {

            DB::table('products')->insert([
                'name' => $productName,
                'description' => $productDescription,
                'price' => $productPrice,
                'category_id' => $categoryId,
                //  'image_file' => $productImageFile,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            $newProductId = DB::getPdo()->lastInsertId();

            // File
            $imageFile = "{$newProductId}.png";
            //$file = $request->product_image_file;
            $productImageFile->storeAs('products', $imageFile, 'public');

            // Tags
            if (is_array($tagIds)) {
                foreach ($tagIds as $tagId) {
                    DB::table('product_tags')->insert([
                        'product_id' => $newProductId,
                        'tag_id' => $tagId,
                        'created_at' => now()
                    ]);
                }
            }

            // Ingredients
            if (is_array($ingredientIds)) {
                foreach ($ingredientIds as $ingredientId) {
                    DB::table('product_ingredients')->insert([
                        'product_id' => $newProductId,
                        'ingredient_id' => $ingredientId,
                        'created_at' => now()
                    ]);
                }
            }

        });

        $products = DB::table('products')->get();

        return new JsonResponse([
            'message' => 'Products retrieved successfully.',
            'products' => $products,
        ], 200);

    }


    /**
     * update a product.
     */
    public function updateProduct(Request $request): JsonResponse
    {

        $productId = $request->input('product_id');
        $productName = $request->input('product_name');
        $productDescription = $request->input('product_description');
        $productPrice = $request->input('product_price');
        $categoryId = $request->input('category_id');
        //$productImageFile = $request->product_image_file;
        $productImageFile = $request->product_image_file;
        $tagIds = $request->input('tag_ids');
        $ingredientIds = $request->input('ingredient_ids');

        // 登録処理
        DB::transaction(function () use (
            $productId,
            $productName,
            $productDescription,
            $productPrice,
            $categoryId,
            $productImageFile,
            $tagIds,
            $ingredientIds
        ) {

            DB::table('products')
                ->where('id', $productId)
                ->update([
                    'name' => $productName,
                    'description' => $productDescription,
                    'price' => $productPrice,
                    'category_id' => $categoryId,
                    'updated_at' => now()
                ]);

            // File
            if ($productImageFile) {
                $imageFile = "{$productId}.png";
                // Delete old image if exists
                Storage::disk('public')->delete("products/{$imageFile}");
                $productImageFile->storeAs('products', $imageFile, 'public');
            }

            // Tags
            DB::table('product_tags')->where('product_id', $productId)->delete();
            if (is_array($tagIds)) {
                foreach ($tagIds as $tagId) {
                    DB::table('product_tags')->insert([
                        'product_id' => $productId,
                        'tag_id' => $tagId,
                        'created_at' => now()
                    ]);
                }
            }

            // Ingredients
            DB::table('product_ingredients')->where('product_id', $productId)->delete();
            if (is_array($ingredientIds)) {
                foreach ($ingredientIds as $ingredientId) {
                    DB::table('product_ingredients')->insert([
                        'product_id' => $productId,
                        'ingredient_id' => $ingredientId,
                        'created_at' => now()
                    ]);
                }
            }

        });

        $products = DB::table('products')->get();

        return new JsonResponse([
            'message' => 'Products retrieved successfully.',
            'products' => $products,
        ], 200);

    }


    /**
     * delete a product.
     */
    public function deleteProduct(Request $request): JsonResponse
    {

        $productId = $request->input('id');

        if (empty($productId) || !is_numeric($productId)) {
            return new JsonResponse([
                'message' => 'Invalid product ID.',
            ], 400);
        }

        DB::table('products')->where('id', $productId)->delete();

        $products = DB::table('products')->get();

        return new JsonResponse([
            'message' => 'Products retrieved successfully.',
            'products' => $products,
        ], 200);

    }
    
}
