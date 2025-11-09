<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthManager;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Auth\AuthenticationException;

class AuthenticatedSessionController extends Controller
{

    private $auth;

    /**
     * @param AuthManager $auth
     */
    public function __construct(AuthManager $auth) 
    {
        $this->auth = $auth;
    }

    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    // public function store(LoginRequest $request): RedirectResponse
    public function store(Request $request): JsonResponse
    {

        // dd("#store");

        // return new JsonResponse([
        //     'message'      => 'Authenticated.',
        //     //'data'         => $data,
        //     'token_type'   => 'Bearer',
        //     'user'         => [],
        // ], 200);

        // $request->authenticate();

        // $request->session()->regenerate();

        // return redirect()->intended(route('dashboard', absolute: false));

        $credentials = $request->only(['email', 'password']);

        //dump($credentials);

        // remember_token on
        // if (Auth::attempt($credentials, true)) {
        if (Auth::attempt($credentials)) {
    
            //$request->authenticate();
            
            $request->session()->regenerate();
            //$request->session()->regenerateToken();
            $user = $request->user();

            // $data = DB::table('admin_users')
            //     ->where('admin_users.id', $user->id)
            //     ->first();
            // $data = DB::table('m_account')
            //     ->select('m_account.*', 'm_shiten.m_shitenname')
            //     ->leftJoin('m_shiten', function($join) {
            //         $join->whereColumn('m_account.m_shitencode', 'm_shiten.m_shitencode');
            //     })
            //     ->where('m_account.userid', $user->userid)
            //     ->first();

            $user = Auth::user();
            $access_token = $user->createToken('auth_token')->plainTextToken;

            return new JsonResponse([
                'message'      => 'Authenticated.',
                //'data'         => $data,
                'access_token' => $access_token,
                'token_type'   => 'Bearer',
                'user'         => $user,
            ], 200);
        }

        // throw new AuthenticationException();

        // Return JSON error instead of redirect
        return response()->json([
            'message' => 'Authentication failed.',
            'serverError' => true,
            'serverErrorData' => ['Invalid credentials'],
        ], 401);
    }



    /**
     * Destroy an authenticated session.
     */
    // public function destroy(Request $request): RedirectResponse
    public function destroy(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return new JsonResponse([
            'message' => 'Logged out successfully.',
        ]);

        // return redirect('/');
    }
}
