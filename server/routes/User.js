const express = require("express");
const router = express.Router();
const { signUp, signin } = require("../controller/User");

router.post("/auth/signup", signUp);
router.post("/auth/signin", signin);

module.exports = router;
