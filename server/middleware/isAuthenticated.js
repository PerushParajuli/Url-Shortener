const { getUser } = require("../services/auth");

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.uid;

  if (!token) {
    return res.status(401).json({ message: "LogIn or Signup" });
  }

  try {
    const decoded = getUser(token);
    if (decoded) {
      return next();
    }
  } catch (err) {
    return res.status(401).json({ message: "Token verification failed" });
  }
};

module.exports = isAuthenticated;
