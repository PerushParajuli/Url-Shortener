const express = require("express");
const {
  addOriginalUrl,
  getShortenedUrl,
  updateUrlDetails,
  deleteUrl,
  deleteAllUrls,
} = require("../controller/Url");
const router = express.Router();

router.post("/add", addOriginalUrl);
router.get("/get", getShortenedUrl);
router.patch("/:id", updateUrlDetails);
router.delete("/delete/:id", deleteUrl);
router.delete("/clearAll", deleteAllUrls);

module.exports = router;
