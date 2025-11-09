<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Password Reset Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; text-align: center;">
        <h1 style="color: #2c3e50; margin-bottom: 30px;">Password Reset Code</h1>
        
        <p style="font-size: 16px; margin-bottom: 30px;">
            You requested a password reset. Use the following code to reset your password:
        </p>
        
        <div style="background: #fff; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px; margin: 30px 0; display: inline-block;">
            <span style="font-size: 32px; font-weight: bold; color: #e74c3c; letter-spacing: 5px;">{{ $code }}</span>
        </div>
        
        <p style="font-size: 14px; color: #7f8c8d; margin-top: 30px;">
            This code will expire in {{ $expiresIn }}. If you didn't request this password reset, please ignore this email.
        </p>
    </div>
</body>
</html>