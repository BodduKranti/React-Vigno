import nodemailer from 'nodemailer'
import { ENV } from '../config/ENV.js';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS,
    },
});

// bitequick24@gmail.com
// B$oddu278501
// wtrg vffm qjks vkvf app password

export const sendOTPemail = async (to, otp) => {
    await transporter.sendMail({
        from: ENV.SMTP_USER,
        to: to,
        subject: "Reset your password",
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Password Reset - Quick Bite</title>
            </head>
            <body style="margin:0; padding:0; background-color:#f4f4f5; font-family:Arial,Helvetica,sans-serif;">

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                style="background-color:#f4f4f5; padding:30px 12px;">
                <tr>
                <td align="center">

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                    style="max-width:520px; background:#ffffff; border-radius:12px; overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td align="center" style="background:#ff6b06; padding:28px 20px;">
                        <h1 style="margin:0; color:#ffffff; font-size:28px;">
                            Quick Bite
                        </h1>
                        <p style="margin:8px 0 0; color:#fff7ed; font-size:14px;">
                            Fresh food, fast service!
                        </p>
                        </td>
                    </tr>

                    <!-- Email content -->
                    <tr>
                        <td style="padding:32px 24px; color:#27272a;">

                        <h2 style="margin:0 0 16px; font-size:22px; text-align:center;">
                            Reset Your Password
                        </h2>

                        <p style="font-size:15px; line-height:1.7; color:#52525b;">
                            Hello,
                        </p>

                        <p style="font-size:15px; line-height:1.7; color:#52525b;">
                            We received a request to reset your password.
                            Use the verification code below to securely reset it.
                        </p>

                        <!-- OTP box -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                            style="margin:24px 0; background:#fff7ed; border:1px dashed #ff6b06; border-radius:8px;">
                            <tr>
                            <td align="center" style="padding:24px 12px;">
                                <p style="margin:0 0 12px; color:#71717a; font-size:13px;">
                                YOUR PASSWORD RESET OTP
                                </p>

                                <h1 style="margin:0; color:#ff6b06; font-size:36px; letter-spacing:8px;">
                                ${otp}
                                </h1>

                                <p style="margin:16px 0 0; color:#c2410c; font-size:13px;">
                                This code expires in 5 minutes.
                                </p>
                            </td>
                            </tr>
                        </table>

                        <p style="font-size:14px; line-height:1.7; color:#52525b;">
                            Enter this code on the password reset page to continue.
                            For your security, do not share this code with anyone.
                        </p>

                        <p style="font-size:14px; line-height:1.7; color:#52525b;">
                            If you did not request a password reset, you can safely
                            ignore this email.
                        </p>

                        <p style="margin:28px 0 0; font-size:14px; color:#27272a;">
                            Best regards,<br />
                            <strong>The Quick Bite Team</strong>
                        </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center"
                        style="background:#fafafa; border-top:1px solid #e4e4e7; padding:20px;">
                        <p style="margin:0; font-size:12px; line-height:1.6; color:#71717a;">
                            This is an automated email. Please do not reply.
                        </p>
                        <p style="margin:8px 0 0; font-size:12px; color:#a1a1aa;">
                            &copy; ${new Date().getFullYear()} Quick Bite. All rights reserved.
                        </p>
                        </td>
                    </tr>

                    </table>
                </td>
                </tr>
            </table>

            </body>
            </html>
            `
    })
}