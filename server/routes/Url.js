const express = require("express");
const { addOriginalUrl, getShortenedUrl } = require("../controller/Url");
const router = express.Router();

router.post("/convert", addOriginalUrl);
router.get("/shortend", getShortenedUrl);

module.exports = router;
