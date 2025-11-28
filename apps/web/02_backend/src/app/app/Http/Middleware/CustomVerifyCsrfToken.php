<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class CustomVerifyCsrfToken extends Middleware
{

    //const HEADER_NAME = 'STOREAPP-XSRF-TOKEN' . (env('ENV_NAME') ? "-" . env('ENV_NAME') : "");

    // web.phpのルートでCSRF保護を無効にする場合、ここに追加
    protected $except = [
        'register',
        'forgot-password',
        'reset-password',
        // Add any other routes you want to test without CSRF
    ];
    protected function getTokenFromRequest($request)
    {
        // prefer config value (works when config is cached), fallback to env with default
        $appEnv = config('app.env', env('APP_ENV', 'local'));
        $headerName = 'WAGASHI-XSRF-TOKEN' . ($appEnv ? '-' . $appEnv : '');

        error_log("★★★ headerName: " . $headerName);
        error_log("★★★ getTokenFromRequest called for: " . $request->url());
        error_log("★★★ Method: " . $request->method());
        
        // ヘッダーの詳細をログ出力
        error_log("★★★ ヘッダーの詳細をログ出力 START");        
        $headers = $request->headers->all();
        foreach ($headers as $key => $value) {
            if (stripos($key, 'csrf') !== false || stripos($key, 'xsrf') !== false) {
               error_log("★★★ Header {$key}: " . json_encode($value));
            }
        }
        error_log("★★★ ヘッダーの詳細をログ出力 END");        
        
        $token = $request->input('_token') ?: $request->header('X-CSRF-TOKEN');
        error_log("★★★ Token from _token or X-CSRF-TOKEN: " . ($token ?: 'NULL'));

        // X-XSRF-TOKENヘッダーをチェック
        if (!$token && $header = $request->header('X-'. $headerName)) {
        // if (!$token && $header = $request->header('X-XSRF-TOKEN')) {
            // error_log("★★★ Raw X-XSRF-TOKEN header: " . $header);
            // error_log("★★★ Header length: " . strlen($header));
            
            // try {
            //     $token = $this->encrypter->decrypt($header, static::serialized());
            //     error_log("★★★ Successfully decrypted X-XSRF-TOKEN");
            //     error_log("★★★ Decrypted token: " . substr($token, 0, 20) . "...");
            // } catch (\Exception $e) {
            //     error_log("★★★ Failed to decrypt X-XSRF-TOKEN: " . $e->getMessage());
            //     error_log("★★★ Exception class: " . get_class($e));
            // }
        
            error_log("★★★ Raw X-XSRF-TOKEN header: " . substr($header, 0, 50) . "...");

            // VerifyCsrfTokenのロジック
            // $token = CookieValuePrefix::remove($this->encrypter->decrypt($header, static::serialized()));

            try {
                $decryptedToken = $this->encrypter->decrypt($header, static::serialized());
                error_log("★★★ Successfully decrypted X-XSRF-TOKEN");
                error_log("★★★ Decrypted token (raw): " . $decryptedToken);
                
                // パイプ文字が含まれている場合は、後半部分を使用
                if (str_contains($decryptedToken, '|')) {
                    $tokenParts = explode('|', $decryptedToken);
                    $token = end($tokenParts); // 最後の部分を取得
                    error_log("★★★ Token after pipe split: " . $token);
                } else {
                    $token = $decryptedToken;
                }
                
            } catch (\Exception $e) {
                error_log("★★★ Failed to decrypt X-XSRF-TOKEN: " . $e->getMessage());
            }        
        }

        // セッションのトークンと比較
        if ($request->session()) {
            $sessionToken = $request->session()->token();
            error_log("★★★ Session token: " . $sessionToken);
            error_log("★★★ Session token length: " . strlen($sessionToken));
            error_log("★★★ Request token: " . ($token ?: 'NULL'));
            error_log("★★★ Request token length: " . strlen($token ?: ''));
            
            if ($token && $sessionToken) {
                error_log("★★★ Tokens match: " . (hash_equals($sessionToken, $token) ? 'YES' : 'NO'));
                // 文字コードの確認
                error_log("★★★ Session token hex: " . bin2hex(substr($sessionToken, 0, 10)));
                error_log("★★★ Request token hex: " . bin2hex(substr($token, 0, 10)));
            }
        } else {
            // error_log("★★★ No session available");
        }

        // error_log("★★★ Final token: " . ($token ?: 'NULL'));
        return $token;
    }

    protected function addCookieToResponse($request, $response)
    {
        // prefer config value (works when config is cached), fallback to env with default
        $appEnv = config('app.env', env('APP_ENV', 'local'));
        $cookieName = 'WAGASHI-XSRF-TOKEN' . ($appEnv ? '-' . $appEnv : '');

        $config = config('session');
        error_log("★★★ cookieName: " . $cookieName);
        error_log("★★★ addCookieToResponse called = " . $request->method());

        if ($response instanceof \Symfony\Component\HttpFoundation\Response) {
            $cookieValue = $request->session()->token();
            error_log("★★★ Setting cookie with token: " . $cookieValue);
            
            $response->headers->setCookie(
                new \Symfony\Component\HttpFoundation\Cookie(
                     $cookieName,
                    //'STEP4-LOCAL-XSRF-TOKEN',
                    $cookieValue,
                    $this->availableAt(60 * $config['lifetime']),
                    $config['path'],
                    $config['domain'],
                    $config['secure'],
                    false,
                    false,
                    $config['same_site'] ?? null
                )
            );
            
            // error_log("★★★ Cookie set successfully");
        }

        return $response;
    }
}