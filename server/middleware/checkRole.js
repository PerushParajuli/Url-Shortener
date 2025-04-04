const getUser = require("../services/auth");

const checkRole = (req, res, next) => {
  const token = req.cookies.uid;

  try {
    const decoded = getUser(token);
    if (decoded) {
      const role = decoded.role;
      req.role = role;
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Role Extraction Failed" });
  }
};

module.exports = checkRole;
