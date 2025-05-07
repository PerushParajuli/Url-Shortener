const userModel = require("../model/User");
const { setUser, getUser } = require("../services/auth");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const email = req.session.email;
  const password = req.session.password;

  try {
    const response = await userModel.create({
      email: email,
      password: password,
      active: true,
    });

    req.session.destroy((err) => {
      if (err) {
        console.error(`Error destroying session: ${err}`);
        return res
          .status(500)
          .json({ success: false, message: "Error destroying session" });
      }
    });

    return res
      .status(200)
      .json({ success: true, message: "User succesfully created!" });
  } catch (error) {
    res.json({ success: false, message: `Error signing up a user: ${error}` });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify is the account exists
    const account = await userModel.findOne({ email: email });

    if (!account) {
      return res
        .status(404)
        .json({ message: "User doesnot exist, Signup Please!" });
    }

    // Verify is the password matches
    const isPasswordMatching = await bcrypt.compare(password, account.password);

    if (!isPasswordMatching) {
      return res
        .status(403)
        .json({ message: "Password incorrect, please enter a valid password" });
    }

    // generating cookie token
    const token = setUser(account);
    return res
      .status(200)
      .cookie("uid", token, { maxAge: 3600000, httpOnly: true })
      .json({
        message: `Username '${account.username}' successfully logged in`,
      });
  } catch (error) {
    console.error(`Error logging in: ${error}`);
    return res.status(500).json({ message: "internal server error" });
  }
};

const signOut = async (req, res) => {
  try {
    // Clear the cookie by setting its expiration date to past

    res.clearCookie("uid", { httpOnly: true });
    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error(`Error logging out: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const changeName = async (req, res) => {
  const { newName } = req.body;

  if (!newName) {
    return res.status(404).json({ message: "Please provide the new username" });
  }

  const userId = req.userId;

  try {
    const response = await userModel.findByIdAndUpdate(userId, {
      username: newName,
    });

    if (response) {
      return res
        .status(200)
        .json({ message: "Successfully changed the username" });
    }
  } catch (error) {
    console.error(`Problem changing the username: ${error}`);
    return res.status(500).json({ message: "Error changing the username" });
  }
};

const changePassword = async (req, res) => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await userModel.findById(userId);

    // Verify password is a match
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    // hashing the new password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const cryptedPassword = await bcrypt.hash(newPassword, salt);

    if (isMatch) {
      // update the old password with new password
      user.password = cryptedPassword;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Successfully changed the user password",
      });
    }
  } catch (err) {
    console.error(`Error while changing password: ${err}`);
    return res.status(500).json({
      success: false,
      message: "Error while changing the user password",
    });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await userModel.findByIdAndDelete(userId);

    // remove the cookie
    res.clearCookie("uid");

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User account deleted succesfully" });
  } catch (error) {
    console.error(`Error Deleting the User ${error}`);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Admin functionalities
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .select("-password -profilePicture -_id -__v -createdAt -updatedAt");

    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }
    return res.status(200).json({ success: true, users: users });
  } catch (error) {
    console.error(`Problem fetching user data ${error}`);
    return res
      .status(500)
      .json({ message: "Problem fetching users data by the admin" });
  }
};

const getSpecificUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await userModel.findById(userId).select("-password");
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "User with the following Id doesnot exist",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User information succesfully retrieved",
      data: response,
    });
  } catch (error) {
    console.error(`Error retrieving user based on the given ID: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Error retrieving user based on the given ID",
    });
  }
};

const setRole = async (req, res) => {
  const userRole = req.body.userRole;
  const userId = req.param.id;

  const availableRoles = ["user", "moderator", "sub admin"];
  const isFromAvailableRoles = availableRoles.includes(userRole);

  if (!isFromAvailableRoles) {
    return res.status(403).json({ message: "Role not allowed!" });
  }

  try {
    const result = await userModel.findByIdAndUpdate(userId, {
      role: userRole,
    });

    if (!result) {
      return res.status(403).json({
        success: false,
        message: "Cannot assign the role",
      });
    }

    return res.status(201).json({
      success: true,
      message: `Successfully changed role to ${userRole}`,
    });
  } catch (error) {
    console.error(`Problem while assigning role as admin: ${error}`);

    return res.status(502).json({
      success: false,
      message: "You maynot have authority to assign roles",
    });
  }
};

const deactivateAccount = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await userModel.findByIdAndUpdate(userId, {
      active: false,
    });
    if (response.active) {
      return res
        .status(200)
        .json({ message: "Successfully reactivated the user." });
    }
  } catch (error) {
    console.error("Error deactivating user:", error);
    return res.status(500).json({ message: "Failed to deactivate user." });
  }
};

const reactivateAccount = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await userModel.findByIdAndUpdate(userId, {
      active: true,
    });
    if (response.active) {
      return res
        .status(200)
        .json({ message: "Successfully deactivated the user." });
    }
  } catch (error) {
    console.error("Error reactivating user:", error);
    return res.status(500).json({ message: "Failed to reactivate user." });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  deleteUser,
  changeName,
  changePassword,
  getSpecificUser,
  getAllUsers,
  setRole,
  deactivateAccount,
  reactivateAccount,
};
