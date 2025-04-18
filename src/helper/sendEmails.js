import nodemailer from "nodemailer";
import config from "../config/config.js";
const transporter = nodemailer.createTransport({
  service: config.mail_service, // Gmail service
  auth: {
    user: config.mail_email, // Your Gmail address
    pass: config.mail_password, // App Password generated from Google
  },
});

const sendResetEmail = async (userEmail, resetToken) => {
  const resetLink = `${config.frontend_domain}/reset-password/${resetToken}`; // your app URL
  const mailOptions = {
    from: '"Career" <programmerjaf@gmail.com>', // Sender's address
    to: userEmail, // Recipient
    subject: "Reset your password", // Subject line
    html: `
      <div style="font-family:sans-serif;">
        <h2>Password Reset</h2>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="padding:10px 20px; background:#4f46e5; color:#fff; border-radius:6px; text-decoration:none;">
          Reset Password
        </a>
        <p>This link will expire in 15 minutes.</p>
      </div>
    `, // HTML body
    headers: {
      "X-Mailer": "NodeMailer", // Identifies the sending software
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};

export default sendResetEmail;
