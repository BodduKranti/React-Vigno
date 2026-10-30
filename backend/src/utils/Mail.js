import nodemailer from "nodemailer";
import { ENV } from "../config/ENV.js";

// Create Gmail SMTP transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS,
    },

    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
});

// Verify SMTP connection
export const verifyEmailConnection = async () => {
    try {
        await transporter.verify();
        console.log("Gmail SMTP connection successful");
        return true;
    } catch (error) {
        console.error("Gmail SMTP connection failed:", error.message);
        return false;
    }
};

// Send OTP email
export const sendOTPemail = async (to, otp) => {
    try {
        const info = await transporter.sendMail({
            from: {
                name: "Quick Bite",
                address: ENV.SMTP_USER,
            },

            to,

            subject: "Reset Your Password - Quick Bite",

            html: `
                <!DOCTYPE html>
                <html>
                <body style="font-family:Arial;background:#f4f4f5;padding:20px;">

                    <div style="
                        max-width:500px;
                        margin:auto;
                        background:white;
                        border-radius:12px;
                        overflow:hidden;
                    ">

                        <div style="
                            background:#ff6b06;
                            padding:25px;
                            text-align:center;
                            color:white;
                        ">
                            <h1>Quick Bite</h1>
                            <p>Fresh food, fast service!</p>
                        </div>

                        <div style="padding:30px;text-align:center;">

                            <h2>Reset Your Password</h2>

                            <p>
                                We received a request to reset your password.
                                Use the OTP below to continue.
                            </p>

                            <div style="
                                background:#fff7ed;
                                padding:25px;
                                border:1px dashed #ff6b06;
                                border-radius:8px;
                            ">

                                <h1 style="
                                    color:#ff6b06;
                                    letter-spacing:8px;
                                ">
                                    ${otp}
                                </h1>

                                <p style="color:#c2410c;">
                                    This code expires in 5 minutes.
                                </p>

                            </div>

                            <p>
                                Do not share this OTP with anyone.
                            </p>

                            <p>
                                Regards,<br/>
                                <b>Quick Bite Team</b>
                            </p>

                        </div>

                        <div style="
                            padding:20px;
                            background:#fafafa;
                            text-align:center;
                            color:#71717a;
                        ">
                            <p>Automated email. Please do not reply.</p>
                            <p>
                                &copy; ${new Date().getFullYear()}
                                Quick Bite
                            </p>
                        </div>

                    </div>

                </body>
                </html>
            `,
        });

        console.log("OTP email sent successfully:", info.messageId);

        return {
            success: true,
            messageId: info.messageId,
        };

    } catch (error) {
        console.error("OTP EMAIL ERROR:", {
            message: error.message,
            code: error.code,
            response: error.response,
            command: error.command,
        });

        throw new Error("Unable to send OTP email");
    }
};