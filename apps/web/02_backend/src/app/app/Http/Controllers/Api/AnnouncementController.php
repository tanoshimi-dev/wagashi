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

class AnnouncementController extends Controller
{

    /**
     * get all announcements.
     */
    public function getAnnouncements(Request $request): JsonResponse
    {

        $announcements = DB::table('announcements')
            ->orderBy('announcements.id', 'asc')
            ->get();

        return new JsonResponse([
            'message' => 'Announcements retrieved successfully.',
            'announcements' => $announcements,
        ], 200);

    }

    /**
     * get specific announcement.
     */
    public function getAnnouncement(Request $request): JsonResponse
    {

        $announcementId = $request->input('id');

        $announcement = DB::table('announcements')
            ->where('id', $announcementId)
            ->first();

        if (!$announcement) {
            return new JsonResponse([
                'message' => 'Announcement not found.',
            ], 404);
        }

        return new JsonResponse([
            'message' => 'Announcement retrieved successfully.',
            'announcement' => $announcement,
        ], 200);

    }


    /**
     * create an announcement.
     */
    public function createAnnouncement(Request $request): JsonResponse
    {

        $title = $request->input('title');
        $announcement = $request->input('announcement');


        // 登録処理
        DB::table('announcements')->insert([
            'title' => $title,
            'announcement' => $announcement,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $lastInsertId = DB::getPdo()->lastInsertId();

        $announcement = DB::table('announcements')->where('id', $lastInsertId)->first();

        return new JsonResponse([
            'message' => 'Announcement created successfully.',
            'announcement' => $announcement,
        ], 200);

    }


    /**
     * update a announcement.
     */
    public function updateAnnouncement(Request $request): JsonResponse
    {

        $id = $request->input('id');
        $title = $request->input('title');
        $announcement = $request->input('announcement');

        // 更新処理
        DB::table('announcements')->where('id', $id)->update([
            'title' => $title,
            'announcement' => $announcement,
            'updated_at' => now()
        ]);


        $announcements = DB::table('announcements')->where('id', $id)->get();

        return new JsonResponse([
            'message' => 'Announcements retrieved successfully.',
            'announcements' => $announcements,
        ], 200);

    }


    /**
     * delete a announcement.
     */
    public function deleteAnnouncement(Request $request): JsonResponse
    {

        $id = $request->input('id');

        if (empty($id) || !is_numeric($id)) {
            return new JsonResponse([
                'message' => 'Invalid announcement ID.',
            ], 400);
        }

        DB::table('announcements')->where('id', $id)->delete();

        $announcements = DB::table('announcements')->get();

        return new JsonResponse([
            'message' => 'Announcements retrieved successfully.',
            'announcements' => $announcements,
        ], 200);

    }
    
}
