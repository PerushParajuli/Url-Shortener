const nodemailer = require("nodemailer");
const EmailVerification = require("../model/EmailVerification");
const userModel = require("../model/User");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "perushparajuli@gmail.com",
    pass: "ncov cuuw svhn ytnd",
  },
});

const sendVerificationToken = async (email, token) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Email Verification Token for URL shortener",
      html: `<h1>Your Verification Token is ${token}</h1>`,
      text: `Token: ${token}`,
    });

    return response.accepted.length > 0;
  } catch (error) {
    console.error(`Failed to send verification token to ${email}: ${error}`);
    return false;
  }
};

// This middleware checks if the email and password are provided, verifies if the email already exists in the database, and sends a verification token if the email is new.

const verificationTokenSenderMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({ message: "Email and Password Required" });
  }
  
  req.email = email;
  req.password = password;

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
