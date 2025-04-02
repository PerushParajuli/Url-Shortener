const express = require("express");
const env = require("dotenv");
const {connectDB} = require("./db/connect");
env.config();

const port = process.env.PORT;
const connection_string = process.env.CONNECTION_STRING;

const app = express();

// Connect to database
connectDB(connection_string);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
