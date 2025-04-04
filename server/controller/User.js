const userModel = require("../model/User");
const { setUser } = require("../services/auth");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;

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

    return res.status(200).json({ message: "User succesfully created!" });
  } catch (error) {
    res.json({ message: `Error signing up a user: ${error}` });
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
        message: `User: ${account.username} successfully logged in`,
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

module.exports = { signUp, signIn, signOut };
