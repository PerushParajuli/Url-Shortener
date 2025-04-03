const urlModel = require("../model/Url");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "Tried creating Url" });
});

module.exports = router;
