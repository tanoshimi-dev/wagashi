<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{

    /**
     * get all categories.
     */
    public function getCategories(Request $request): JsonResponse
    {

        $categories = DB::table('categories')->get();

        return new JsonResponse([
            'message' => 'Categories retrieved successfully.',
            'categories' => $categories,
        ], 200);

    }

    /**
     * create a categories.
     */
    public function createCategory(Request $request): JsonResponse
    {

        $category = $request->input('category');
        
        DB::table('categories')->insert(
            ['category' => $category
             , 'created_at' => now()
             , 'updated_at' => now()
            ]
        );

        $categories = DB::table('categories')->get();

        return new JsonResponse([
            'message' => 'Categories retrieved successfully.',
            'categories' => $categories,
        ], 200);

    }


    /**
     * update a categories.
     */
    public function updateCategory(Request $request): JsonResponse
    {

        $id = $request->input('id');
        $category = $request->input('category');

        DB::table('categories')->where('id', $id)->update([
            'category' => $category,
            'updated_at' => now()
        ]);

        $categories = DB::table('categories')->get();

        return new JsonResponse([
            'message' => 'Categories retrieved successfully.',
            'categories' => $categories,
        ], 200);

        $categories = DB::table('categories')->get();

        return new JsonResponse([
            'message' => 'Categories retrieved successfully.',
            'categories' => $categories,
        ], 200);

    }


    /**
     * delete a categories.
     */
    public function deleteCategory(Request $request): JsonResponse
    {

        $id = $request->input('id');

        if (empty($id) || !is_numeric($id)) {
            return new JsonResponse([
                'message' => 'Invalid category ID.',
            ], 400);
        }

        DB::table('categories')->where('id', $id)->delete();

        $categories = DB::table('categories')->get();

        return new JsonResponse([
            'message' => 'Categories retrieved successfully.',
            'categories' => $categories,
        ], 200);

    }

    

}
