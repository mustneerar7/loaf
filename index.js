/**
 * @file Entrypoint for the server.
 */

const express = require("express");
const createConnection = require("./configs/mongo");

const userRoutes = require("./routes/userRoutes");
const songRoutes = require("./routes/songRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

// Open connection to database.
createConnection();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Endpoints
app.get("/", (req, res) => {
  res.send("Hello there 👋");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/songs", songRoutes);
app.use("/api/v1/playlists", playlistRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
