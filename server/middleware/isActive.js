// middleware to check if user account is active

const isActive = (req, res, next) => {
  const active = req.active;

  if (active) {
    return next();
  } else {
    return res.status(403).json({
      success: false,
      message: "User account is deactivated cannot see details",
    });
  }
};

module.exports = isActive;
