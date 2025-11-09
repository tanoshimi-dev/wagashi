<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Notifications\MobileEmailVerificationNotification;

use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    //use HasFactory, Notifiable;
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    /**
     * モバイルアプリ専用のトークン作成
     */
    public function createMobileToken(string $deviceName, array $abilities = ['*']): string
    {
        return $this->createToken(
            name: "mobile-{$deviceName}-" . now()->timestamp,
            abilities: $abilities,
            expiresAt: now()->addDays(30)
        )->plainTextToken;
    }

    /**
     * モバイルアプリ用のメール認証通知を送信
     */
    // public function sendEmailVerificationNotification()
    public function sendMobileEmailVerificationNotification()
    {
        $this->notify(new MobileEmailVerificationNotification);
    }

}
