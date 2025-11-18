<?php

namespace App\Services;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth as FirebaseAuth;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;

class FirebaseService
{
    protected FirebaseAuth $auth;

    public function __construct()
    {
        $factory = (new Factory)->withServiceAccount(config('services.firebase.credentials'));
        $this->auth = $factory->createAuth();
    }

    /**
     * Verify Firebase ID Token
     */
    public function verifyIdToken(string $idToken): array
    {
        try {
            $verifiedIdToken = $this->auth->verifyIdToken($idToken);
            
            return [
                'success' => true,
                'uid' => $verifiedIdToken->claims()->get('sub'),
                'email' => $verifiedIdToken->claims()->get('email'),
                'email_verified' => $verifiedIdToken->claims()->get('email_verified'),
                'claims' => $verifiedIdToken->claims()->all(),
            ];
        } catch (FailedToVerifyToken $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Get Firebase user by UID
     */
    public function getUserByUid(string $uid)
    {
        return $this->auth->getUser($uid);
    }
}
