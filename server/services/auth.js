const jwt = require("jsonwebtoken")

const setUser = (user) => {
  const { email, role } = user;
  const userId = user._id;
  const secret = process.env.SECRET_KEY;

  try {
    const userToken = jwt.sign({ userId, email, role }, secret, {
      expiresIn: "1h",
    });
    if (userToken) {
      return userToken;
    }
  } catch (err) {
    console.error(`Error generating token: ${err}`);
    throw new Error("Token Generation Failed!!!");
  }

  return userToken;
};

const getUser = (token) => {
  const secret = process.env.SECRET_KEY;

  if (!token) {
    console.error("No token provided");
    throw new Error(`Token is required for verification`);
  }

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error(`Error verifying the user: ${err}`);
    throw new Error("Token Verification Failed");
  }
};

module.exports = { setUser, getUser };
