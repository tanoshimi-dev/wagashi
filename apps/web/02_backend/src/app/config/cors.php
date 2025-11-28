<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // 'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // 'allowed_methods' => ['*'],

    // 'allowed_origins' => ['*'],

    // 'allowed_origins_patterns' => [],

    // 'allowed_headers' => ['*'],

    // 'exposed_headers' => [],

    // 'max_age' => 0,

    // 'supports_credentials' => false,

//    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'user', 'forgot-password'],
    'paths' => [
        'api/*', 
        'sanctum/csrf-cookie', 
        'login', 'logout', 'user', 'forgot-password', 'register', 
        'admin/*',
        //'/',
    ],
    'allowed_methods' => ['*'],
    //'allowed_origins' => ['*'],
    // Specify the exact origins that should be allowed (no '*' when supports_credentials = true)
    'allowed_origins' => [
        'http://localhost:3000',
        //'http://127.0.0.1:3000',
        // add other dev origins as needed, e.g. mobile web ui or your PC lan IP:
        // 'http://192.168.0.154:3000',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,    
    //'supports_credentials' => false,
    'supports_credentials' => true,

];
