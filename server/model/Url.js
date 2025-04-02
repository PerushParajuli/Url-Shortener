const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    title: {
      type: String, // Title for the given Original Url
    },
    originalUrl: {
      type: String,
      required: true,
      unique: true,
    },
    shortenedUrl: {
      type: String,
      required: true,
      unique: true,
    },
    domainName: {
      type: String,
      required: true,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const urlModel = mongoose.model("url", urlSchema);

module.exports = urlModel