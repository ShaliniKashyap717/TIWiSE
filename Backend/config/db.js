const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Skipping MongoDB Connection for now...");
  } catch (error) {
    console.error("MongoDB connection failed");
  }
};

module.exports = connectDB;
