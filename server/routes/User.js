const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  signUp,
  signIn,
  signOut,
  changeName,
  deleteUser,
} = require("../controller/User");
const checkRole = require("../middleware/checkRole");

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/signout", isAuthenticated, signOut);
router.patch("/username", isAuthenticated, changeName);
router.delete("/delete", isAuthenticated, deleteUser);
router.get("/users", isAuthenticated, checkRole, userInfo); // for admin

module.exports = router;
