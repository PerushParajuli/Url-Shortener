const userModel = require("../model/User");
const { setUser, getUser } = require("../services/auth");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the email already exists
    const verify = await userModel.findOne({ email: email });
    if (verify) {
      return res.status(403).json({ message: "User already Exists" });
    }

    const saltRounds = 15;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const response = await userModel.create({
      email: email,
      password: encryptedPassword,
    });

    if (!response) {
      return res.status(400).json({ message: "Invalid email" });
    }

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
    const users = await userModel.find({});
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
      .json({ message: "Problem fetching user data by the admin" });
  }
};

const setRole = async (req, res) => {
  const { userId, userRole } = req.body;

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

module.exports = {
  signUp,
  signIn,
  signOut,
  deleteUser,
  changeName,
  getAllUsers,
  setRole,
};
