const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      default: "User",
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
    },
    password: {
      type: String,
      required: true,
      unqiue: true,
    },
    role: {
      type: String,
      default: "user", // can also be admin
    },
    profilePicture: {
      type: String,
    },
    active: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
