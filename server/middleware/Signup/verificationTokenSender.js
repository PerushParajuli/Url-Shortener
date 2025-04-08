const nodemailer = require("nodemailer");
const EmailVerification = require("../../model/EmailVerification");
const userModel = require("../../model/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationToken = async (email, token) => {
  try {
    const response = await transporter.sendMail({
      from: `"URL Shortener Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your email for URL Shortener",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2>Email Verification</h2>
          <p>Hello,</p>
          <p>Here is your verification token:</p>
          <p style="font-size: 1.5em; font-weight: bold; color: #2a7ae2;">${token}</p>
          <p>If you did not request this, please ignore this message.</p>
          <p>Thanks,<br>The URL Shortener Team</p>
        </div>
      `,
      text: `Your verification token is: ${token}\n\nIf you did not request this, you can ignore this message.\n\nThanks,\nThe URL Shortener Team`,
    });

    return response.accepted.length > 0;
  } catch (error) {
    console.error(`Failed to send verification token to ${email}: ${error}`);
    return false;
  }
};

const verificationTokenSenderMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({ message: "Email and Password Required" });
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const cryptedPassword = await bcrypt.hash(password, salt);

  req.session.email = email;
  req.session.password = cryptedPassword;

  // check if email already exist
  const verify = await userModel.findOne({ email: email });
  if (verify) {
    return res.status(403).json({
      message:
        "User with the same email already exist. Try using another email",
    });
  }

  const verificationToken = crypto.randomInt(33333, 99999).toString();

  try {
    //   Store verification token and email in a database
    const response = await EmailVerification.create({
      email: email,
      verificationCode: verificationToken,
    });

    if (response) {
      const emailSent = await sendVerificationToken(email, verificationToken);
      if (emailSent) {
        return next();
      }

      return res.status(500).json({
        success: false,
        message: `Failed to send verification token to ${email}`,
      });
    }
    return res.status(500).json({
      success: false,
      message: `Error storing verification token in the database`,
    });
  } catch (error) {
    console.error(`Error storing verification token`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = verificationTokenSenderMiddleware;
