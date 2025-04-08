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
    },
  },
  { timestamps: true }
);

// Add a TTL index to the createdAt field
emailVerificationTokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 200 }
);

const EmailVerification = mongoose.model(
  "EmailVerification",
  emailVerificationTokenSchema
);

module.exports = EmailVerification;
