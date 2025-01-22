import transporter from "@/lib/nodemailer";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {

    try {
        const emailHtml = `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f5f7;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 650px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #244855;
            color: #ffffff;
            padding: 30px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .content {
            padding: 30px;
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
        }
        .content h2 {
            font-size: 22px;
            color: #244855;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .otp {
            background-color: #f9fafb;
            border: 1px solid #dde3e7;
            padding: 20px;
            margin: 25px 0;
            border-radius: 6px;
            font-size: 18px;
            font-weight: 500;
            color: #244855;
        }
        .cta-button {
            display: inline-block;
            background-color: #E64833;
            color: #ffffff;
            font-size: 16px;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            margin-top: 20px;
            transition: background-color 0.3s ease;
        }
        .cta-button:hover {
            background-color: #244855;
        }
        .footer {
            background-color: #f7f7f7;
            color: #777;
            font-size: 14px;
            padding: 20px;
            text-align: center;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verification Code</h1>
        </div>
        <div class="content">
            <h2>Hello ${username},</h2>
            <p>Welcome to the Training and Placement Department at R C Patel Institute of Technology, Shirpur. Please use the following verification code to complete your registration:</p>

            <div class="otp">
                <p><strong>Verification Code:</strong> ${verifyCode}</p>
            </div>

            <p><strong>Note:</strong> This code will expire in 10 minutes. Please use it promptly to complete your registration.</p>

            <p>If you did not request this code, please ignore this email or contact the administration immediately.</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} R C Patel Institute of Technology, Shirpur. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

    `;

        await transporter.sendMail({
            from: 'RCPIT Training and Placement Department',
            to: email,
            subject: 'RCPIT Training and Placement Verification Code',
            html: emailHtml,
        });

        return { success: true, message: 'Verification email sent successfully using nodemailer' };
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return { success: false, message: 'Failed to send verification email' };
    }
}
