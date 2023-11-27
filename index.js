/**
 * @file Entrypoint for the server.
 */

const express = require("express");

const createConnection = require("./configs/mongo");

const jwtValidator = require("./middlewares/jwtValidator");

const userRoutes = require("./routes/userRoutes");
const songRoutes = require("./routes/songRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const authRoutes = require("./routes/authRoutes");

// Open connection to database.
createConnection();

const app = express();

// Middlewares
app.use(express.json());

// Endpoints
app.get("/", (req, res) => {
  res.send("Hello there 👋");
});

app.use("/api/v1/users", jwtValidator, userRoutes);
app.use("/api/v1/songs", jwtValidator, songRoutes);
app.use("/api/v1/playlists", jwtValidator, playlistRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
