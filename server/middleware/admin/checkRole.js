const { getUser } = require("../../services/auth");

const checkRole = (req, res, next) => {
  const token = req.cookies.uid;

  try {
    const decoded = getUser(token);
    if (decoded.role === "admin") {
      req.role = decoded.role;
      next();
    } else {
      return res.status(403).json({ message: "Access Denied" });
    }
  } catch (error) {
    console.error(`Error extracting information from token: ${error.message}`);
    res.status(500).json({ message: "Token extraction failed" });
  }
};

module.exports = checkRole;
