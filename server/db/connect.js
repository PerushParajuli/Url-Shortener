const mongoose = require("mongoose");

const connectDB = async (connectionString) => {
  try {
    const response = await mongoose.connect(connectionString);
    console.log(`Connected to the database '${response.connection.host}'`);
  } catch (error) {
    console.log(
      `Error connecting to the database for following reason: ${error}`
    );
  }
};

module.exports = { connectDB };
