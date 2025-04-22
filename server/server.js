const express = require("express");
const env = require("dotenv");
env.config();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./db/connect");
const userRoutes = require("./routes/User");
const urlRoutes = require("./routes/Url");
const isAuthenticated = require("./middleware/isAuthenticated");
const userSession = require("./middleware/Signup/userSession");

const port = process.env.PORT;
const connection_string = process.env.CONNECTION_STRING;

const app = express();

// Necessary Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Session Middleware
app.use(userSession);

// Custom middleware and processes
app.use("/api/user", userRoutes);
app.use("/api/urls", isAuthenticated, urlRoutes);

// Connect to database
connectDB(connection_string);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
