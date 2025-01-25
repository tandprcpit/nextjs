import transporter from "@/lib/nodemailer";
import { ApiResponse } from "@/types/apiResponse";

export async function sendCredentialsEmail(
  email: string,
  prn: string,
  password: string,
  department: string
): Promise<ApiResponse> {
  try {
    const emailHtml = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Account Credentials</title>
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
        .credentials {
            background-color: #f9fafb;
            border: 1px solid #dde3e7;
            padding: 20px;
            margin: 25px 0;
            border-radius: 6px;
            font-size: 18px;
            font-weight: 500;
            color: #244855;
        }
        .credentials p {
            margin: 5px 0;
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
            <h1>Your Account Credentials</h1>
        </div>
        <div class="content">
            <h2>Welcome to R C Patel Institute of Technology, Shirpur!</h2>
            <p>Your account has been successfully created. Below are your login credentials:</p>

            <div class="credentials">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>PRN:</strong> ${prn}</p>
                <p><strong>Password:</strong> ${password}</p>
                <p><strong>Department:</strong> ${department}</p>
            </div>

            <p>You can log in using either your <strong>PRN</strong> or <strong>Email</strong> along with your password. Please remember to change your password after your first login.</p>

            <a href="https://tandp-rcpit.vercel.app/sign-in" class="cta-button">Login Now</a>

            <p>If you did not request this account, please contact the administration immediately.</p>
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
      subject: 'RCPIT Training and Placement - Your Account Credentials',
      html: emailHtml,
    });

    return { success: true, message: `Credentials email sent successfully ${email}` };
  } catch (emailError) {
    console.error("Error sending credentials email", emailError);
    return { success: false, message: 'Failed to send credentials email' };
  }
}
