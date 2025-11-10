<?php

namespace App\Http\Middleware;

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful as Middleware;

class CustomEnsureFrontendRequestsAreStateful extends Middleware
{
    
    //private $XSRFTOKEN = "STOREAPP-LOCAL-XSRF-TOKEN";

    /**
     * Add the CSRF token to the response cookies.
     */
    protected function addCookieToResponse($request, $response)
    
    {
        $cookieName = 'WAGASHI-' . (env('APP_ENV') ? '-' . env('APP_ENV') : ''). 'XSRF-TOKEN';

        $config = config('session');
    error_log("CustomEnsureFrontendRequestsAreStateful CALLED: addCookieToResponse");


        if ($response instanceof \Symfony\Component\HttpFoundation\Response) {
            $response->headers->setCookie(
                new \Symfony\Component\HttpFoundation\Cookie(
                    //self::, // Your custom cookie name
                    $cookieName,
                    $request->session()->token(),
                    $this->availableAt(60 * $config['lifetime']),
                    $config['path'],
                    $config['domain'],
                    $config['secure'],
                    false,
                    false,
                    $config['same_site'] ?? null
                )
            );
        }

        return $response;
    }
}