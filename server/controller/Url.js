const urlModel = require("../model/Url");
const { nanoid } = import("nanoid");
const validUrl = require("valid-url");
const { URL } = require("url");
const { default: mongoose } = require("mongoose");

const addOriginalUrl = async (req, res) => {
  const originalUrl = req.body.originalUrl;
  const userId = req.userId;

  if (!originalUrl) {
    return res
      .status(403)
      .json({ success: false, message: "original url required" });
  }

  // check if url is valid
  const isUrlValid = validUrl.isUri(originalUrl);

  if (!isUrlValid) {
    return res
      .status(403)
      .json({ success: false, message: "URL is not a valid url" });
  }

  // check if the url already exists, if it does then return the existing data instead of creating a new shortend url
  try {
    const response = await urlModel.findOne({ originalUrl: originalUrl });

    if (response) {
      return res.status(400).json({
        success: false,
        message: "Url already exist",
        data: response.shortenedUrl,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is some error while checking the database",
    });
  }

  const parsedUrl = new URL(originalUrl);
  const hostname = parsedUrl.hostname;
  const baseUrl = "http://shortenUrl/";

  const short_id = nanoid(7);
  const shortenedUrl = `${baseUrl}${short_id}`;

  // store the url within database
  try {
    const response = await urlModel.create({
      originalUrl: originalUrl,
      shortenedUrl: shortenedUrl,
      domainName: hostname,
      userId: userId,
    });

    if (response) {
      res.status(201).json({
        success: true,
        message: "successfully created a shortened url",
        data: {
          userId: response.userId,
          originalUrl: response.originalUrl,
          shortenedUrl: response.shortenedUrl,
        },
      });
    }
  } catch (error) {
    console.log(`There was problem storing the shortened URL: ${error}`);
  }
};

const getShortenedUrl = async (req, res) => {
  const userId = req.userId;

  try {
    const urls = await urlModel.find({ userId });
    if (!urls) {
      return res.status(404).json({
        success: false,
        message: "No Urls associated to the given user",
      });
    }

    return res.status(200).json({ success: true, data: urls });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving URLs",
      error: error,
    });
  }
};

const updateUrlDetails = async (req, res) => {
  const urlId = req.params.id;
  const { title, description } = req.body;
  const urlDetails = {};
  if (title) urlDetails.title = title;
  if (description) urlDetails.description = description;

  try {
    const updatedData = await urlModel.findByIdAndUpdate(
      urlId,
      { $set: urlDetails },
      { new: true }
    );

    if (!updatedData) {
      return res
        .status(400)
        .json({ success: false, message: "Could not update the database" });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated title and description",
      data: updatedData,
    });
  } catch (error) {
    console.error(`Error updating the database: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Problem updating the database",
    });
  }
};

const deleteUrl = async (req, res) => {
  const urlId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(urlId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Url Id" });
    }
    const response = await urlModel.findByIdAndDelete(urlId);
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Problem deleting the url" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Successfully deleted the url" });
  } catch (error) {
    console.error(`Problem deleting this url: ${error}`);
    return res
      .status(500)
      .json({ success: false, message: "Problem deleting this specific url" });
  }
};

const deleteAllUrls = async (req, res) => {
  const userId = req.userId;

  try {
    const response = await urlModel.deleteMany({
      userId: userId,
    });

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "No URL exist that is related to this user",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All URL related to user has been successfully deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Could not delete Url data related to user: ${error}`,
    });
  }
};

module.exports = {
  addOriginalUrl,
  getShortenedUrl,
  updateUrlDetails,
  deleteUrl,
  deleteAllUrls,
};
