/**
 * @file Creates a connection to MongoDB Atlas.
 */

const mongoose = require("mongoose");

const createConnection = async () => {
  mongoose.connect(process.env.DATABASE_URL);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = createConnection;
