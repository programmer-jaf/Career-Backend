import nodemailer from "nodemailer";
import config from "../config/config.js";
const transporter = nodemailer.createTransport({
  service: config.mail_service,
  auth: {
    user: config.mail_email,
    pass: config.mail_password,
  },
});

const sendResetEmail = async (userEmail, resetToken) => {
  const resetLink = `${config.frontend_domain}/reset-password/${resetToken}`; // your Career frontend
  const mailOptions = {
    from: config.mail_email,
    to: userEmail,
    subject: "Reset your Career password",
    html: `
      <div style="font-family:sans-serif;">
        <h2>Password Reset</h2>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="padding:10px 20px; background:#4f46e5; color:#fff; border-radius:6px; text-decoration:none;">
          Reset Password
        </a>
        <p>This link will expire in 15 minutes.</p>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error ", error);
    } else {
      console.log("Email sent successfully ", info.response);
    }
  });
};

export default sendResetEmail;
