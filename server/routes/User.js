const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  signUp,
  signIn,
  signOut,
  changeName,
  changePassword,
  deleteUser,
  getAllUsers,
  getSpecificUser,
  setRole,
  deactivateAccount,
  reactivateAccount,
} = require("../controller/User");
const checkRole = require("../middleware/admin/checkRole");
const isActive = require("../middleware/isActive");
const verificationTokenSenderMiddleware = require("../middleware/Signup/verificationTokenSender");
const verificationTokenCheckerMiddleware = require("../middleware/Signup/verificationTokenCheker");

// Endpoint to send verification Token
router.post(
  "/auth/sendVerificationToken",
  verificationTokenSenderMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Verification token sent to User Email",
    });
  }
);

// Endpoint to verify token and signup
router.post(
  "/auth/verifyTokenAndSignup",
  verificationTokenCheckerMiddleware,
  signUp
);

// Other user routes
router.post("/auth/signin", signIn);
router.post("/signout", isAuthenticated, isActive, signOut);
router.patch("/username", isAuthenticated, isActive, changeName);
router.patch("/password", isAuthenticated, isActive, changePassword);
router.delete("/delete", isAuthenticated, isActive, deleteUser);

// Admin routes
router.get("/admin/users", isAuthenticated, checkRole, getAllUsers);

router.get("/admin/users/:id", isAuthenticated, checkRole, getSpecificUser);

router.post("/admin/setRole/:id", isAuthenticated, checkRole, setRole);

router.post(
  "/admin/deactivate/:id",
  isAuthenticated,
  checkRole,
  deactivateAccount
);

router.post(
  "/admin/reactivate/:id",
  isAuthenticated,
  checkRole,
  reactivateAccount
);

module.exports = router;
