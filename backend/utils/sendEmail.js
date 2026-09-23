const nodemailer = require("nodemailer");

const sendEmail = async (to, otp, name = "User") => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("EMAIL ERROR: EMAIL_USER or EMAIL_PASS is not defined in .env");
    throw new Error("Email credentials are missing. Please add them to your .env file.");
  }

  // Create a transporter using Gmail
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // True for 465, false for other ports
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send the email
    const info = await transporter.sendMail({
      from: `"Refresh Cart 🛒" <${process.env.EMAIL_USER}>`, // MUST match EMAIL_USER
      to: to,
      subject: "Refresh Cart OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background:#f4f4f4;">
          <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px;">
            <h2 style="color:#2e7d32; text-align:center;">
              Welcome to Refresh Cart 🛒
            </h2>
            <p>Hello <b>${name}</b>,</p>
            <p>Your One-Time Password (OTP) for verification is:</p>
            <div style="text-align:center; margin:25px 0;">
              <span style="font-size:32px; letter-spacing:5px; font-weight:bold; color:#2e7d32; background:#e8f5e9; padding:12px 24px; border-radius:8px; display:inline-block;">
                ${otp}
              </span>
            </div>
            <p>This OTP is valid for <b>5 minutes</b>.</p>
            <p style="color:red;">Do not share this OTP with anyone.</p>
            <hr>
            <p style="text-align:center; color:gray;">
              Thank you for choosing Refresh Cart 💚
            </p>
          </div>
        </div>
      `,
    });

    console.log("✅ EMAIL SENT SUCCESSFULLY VIA NODEMAILER!");
    console.log("Message ID:", info.messageId);
    return true;

  } catch (error) {
    console.error("❌ NODEMAILER ERROR:", error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;