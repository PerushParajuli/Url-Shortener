const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  signUp,
  signIn,
  signOut,
  changeName,
  deleteUser,
  getAllUsers,
  getSpecificUser,
  setRole,
  deactivateAccount,
  reactivateAccount,
} = require("../controller/User");
const checkRole = require("../middleware/checkRole");
const isActive = require("../middleware/isActive");

// User routes
router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/signout", isAuthenticated, isActive, signOut);
router.patch("/username", isAuthenticated, isActive, changeName);
router.delete("/delete", isAuthenticated, isActive, deleteUser);

// Admin routes
router.get("/admin/users", isAuthenticated, checkRole, getAllUsers);

router.get("/admin/users/:id", isAuthenticated, checkRole, getSpecificUser);

router.post("/admin/setRole/:id", isAuthenticated, checkRole, setRole);

router.post(
  ".admin/deactivate/:id",
  isAuthenticated,
  checkRole,
  deactivateAccount
);

router.post(
  "/admin/deactivate/:id",
  isAuthenticated,
  checkRole,
  reactivateAccount
);

module.exports = router;
