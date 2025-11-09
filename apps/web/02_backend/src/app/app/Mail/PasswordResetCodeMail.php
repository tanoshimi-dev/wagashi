<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetCodeMail extends Mailable
{
    use SerializesModels;

    public $code;

    public function __construct(string $code)
    {
        $this->code = $code;
    }

    public function build()
    {
        return $this->subject('Password Reset Code')
                    ->view('emails.password-reset-code')
                    ->with([
                        'code' => $this->code,
                        'expiresIn' => '15 minutes',
                    ]);
    }
}