/**
 * @file Creates a connection to MongoDB Atlas.
 */

const mongoose = require("mongoose");

const createConnection = async () => {
  mongoose.connect(
    "mongodb+srv://mustneerar7:0786-Aua7@project-gramophone.pytcgpn.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = createConnection;
