const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailVerificationTokenSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      required: true,
      expires: "5m",
    },
  },
  { timestamps: true }
);

const EmailVerification = mongoose.model(
  "EmailVerification",
  emailVerificationTokenSchema
);

module.exports = EmailVerification;
