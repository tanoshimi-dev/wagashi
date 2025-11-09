<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetCodeMail;

class PasswordResetCode extends Model
{
    protected $fillable = [
        'email',
        'code',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public $timestamps = false;

    /**
     * パスワードリセットコードを生成して送信
     */
    public static function sendResetCode(string $email): bool
    {
        try {
            // 既存のコードを削除
            static::where('email', $email)->delete();

            // 新しい6桁のコードを生成
            $code = str_pad(random_int(100000, 999999), 6, '0', STR_PAD_LEFT);

            // コードを保存（15分間有効）
            static::create([
                'email' => $email,
                'code' => $code,
                'expires_at' => now()->addMinutes(15),
            ]);

            // メール送信
            Mail::to($email)->send(new PasswordResetCodeMail($code));

            return true;
        } catch (\Exception $e) {
            \Log::error('Failed to send password reset code: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * コードを検証
     */
    public static function verifyCode(string $email, string $code): bool
    {
        $resetCode = static::where('email', $email)
            ->where('code', $code)
            ->where('expires_at', '>', now())
            ->first();

        return $resetCode !== null;
    }

    /**
     * 使用済みコードを削除
     */
    public static function deleteUsedCode(string $email, string $code): void
    {
        static::where('email', $email)
            ->where('code', $code)
            ->delete();
    }

    /**
     * 期限切れのコードを削除
     */
    public static function deleteExpiredCodes(): void
    {
        static::where('expires_at', '<', now())->delete();
    }
}