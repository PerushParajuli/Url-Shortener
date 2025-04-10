const express = require("express");
const {
  addOriginalUrl,
  getShortenedUrl,
  updateUrlDetails,
  deleteUrl,
} = require("../controller/Url");
const router = express.Router();

router.post("/add", addOriginalUrl);
router.get("/get", getShortenedUrl);
router.patch("/:id", updateUrlDetails);
router.delete("/:id", deleteUrl); 
// router.delete("/", deleteAllUrls)

module.exports = router;
