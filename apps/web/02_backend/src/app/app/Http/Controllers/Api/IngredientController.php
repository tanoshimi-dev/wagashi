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

class IngredientController extends Controller
{

    /**
     * get all ingredients.
     */
    public function getIngredients(Request $request): JsonResponse
    {

        $ingredients = DB::table('ingredients')->get();

        return new JsonResponse([
            'message' => 'Ingredients retrieved successfully.',
            'ingredients' => $ingredients,
        ], 200);

    }

    /**
     * create a ingredient.
     */
    public function createIngredient(Request $request): JsonResponse
    {

        $ingredient = $request->input('ingredient');

        DB::table('ingredients')->insert(
            ['ingredient' => $ingredient
             , 'created_at' => now()
             , 'updated_at' => now()
            ]
        );

        $ingredients = DB::table('ingredients')->get();

        return new JsonResponse([
            'message' => 'Ingredients retrieved successfully.',
            'ingredients' => $ingredients,
        ], 200);

    }


    /**
     * update a ingredients.
     */
    public function updateIngredient(Request $request): JsonResponse
    {

        $id = $request->input('id');
        $ingredient = $request->input('ingredient');

        DB::table('ingredients')->where('id', $id)->update([
            'ingredient' => $ingredient,
            'updated_at' => now()
        ]);

        $ingredients = DB::table('ingredients')->get();

        return new JsonResponse([
            'message' => 'Ingredients retrieved successfully.',
            'ingredients' => $ingredients,
        ], 200);

        $ingredients = DB::table('ingredients')->get();

        return new JsonResponse([
            'message' => 'Ingredients retrieved successfully.',
            'ingredients' => $ingredients,
        ], 200);

    }


    /**
     * delete a ingredients.
     */
    public function deleteIngredient(Request $request): JsonResponse
    {

        $id = $request->input('id');

        if (empty($id) || !is_numeric($id)) {
            return new JsonResponse([
                'message' => 'Invalid category ID.',
            ], 400);
        }

        DB::table('ingredients')->where('id', $id)->delete();

        $ingredients = DB::table('ingredients')->get();

        return new JsonResponse([
            'message' => 'Ingredients retrieved successfully.',
            'ingredients' => $ingredients,
        ], 200);

    }

    

}
