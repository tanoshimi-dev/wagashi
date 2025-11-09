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

class TagController extends Controller
{

    /**
     * get all tags.
     */
    public function getTags(Request $request): JsonResponse
    {

        $tags = DB::table('tags')->get();

        return new JsonResponse([
            'message' => 'Tags retrieved successfully.',
            'tags' => $tags,
        ], 200);

    }

    /**
     * create a tag.
     */
    public function createTag(Request $request): JsonResponse
    {

        $tag = $request->input('tag');

        DB::table('tags')->insert(
            ['tag' => $tag
             , 'created_at' => now()
             , 'updated_at' => now()
            ]
        );

        $tags = DB::table('tags')->get();

        return new JsonResponse([
            'message' => 'Tags retrieved successfully.',
            'tags' => $tags,
        ], 200);

    }


    /**
     * update a tag.
     */
    public function updateTag(Request $request): JsonResponse
    {

        $id = $request->input('id');
        $tag = $request->input('tag');

        DB::table('tags')->where('id', $id)->update([
            'tag' => $tag,
            'updated_at' => now()
        ]);

        $tags = DB::table('tags')->get();

        return new JsonResponse([
            'message' => 'Tags retrieved successfully.',
            'tags' => $tags,
        ], 200);

        $tags = DB::table('tags')->get();

        return new JsonResponse([
            'message' => 'Tags retrieved successfully.',
            'tags' => $tags,
        ], 200);

    }


    /**
     * delete a tag.
     */
    public function deleteTag(Request $request): JsonResponse
    {

        $id = $request->input('id');

        if (empty($id) || !is_numeric($id)) {
            return new JsonResponse([
                'message' => 'Invalid tag ID.',
            ], 400);
        }

        DB::table('tags')->where('id', $id)->delete();

        $tags = DB::table('tags')->get();

        return new JsonResponse([
            'message' => 'Tags retrieved successfully.',
            'tags' => $tags,
        ], 200);

    }

    

}
