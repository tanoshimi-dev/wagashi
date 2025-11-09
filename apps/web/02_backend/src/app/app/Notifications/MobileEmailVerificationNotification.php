<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class MobileEmailVerificationNotification extends Notification
{
    use Queueable;

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $verificationCode = $this->generateVerificationCode($notifiable);
        
        return (new MailMessage)
            ->subject('Verify Your Email Address')
            ->line('Please verify your email address by using the verification code below:')
            ->line('')
            ->line('Verification Code: ' . $verificationCode)
            ->line('')
            ->line('This code will expire in 60 minutes.')
            ->line('If you did not create an account, no further action is required.');
    }

    private function generateVerificationCode($user): string
    {
        // ユーザーIDベースの6桁コード生成
        return substr(md5($user->id . $user->email), 0, 6);
    }
}