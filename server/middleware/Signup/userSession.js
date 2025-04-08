const session = require("express-session");

module.exports = session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using https
});
