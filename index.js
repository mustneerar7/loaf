/**
 * @file Entrypoint for the server.
 */

const express = require("express");
const createConnection = require("./configs/mongo");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const authCheck = require("./middlewares/authCheck");

const userRoutes = require("./routes/userRoutes");
const songRoutes = require("./routes/songRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const authRoutes = require("./routes/authRoutes");

// Open connection to database.
createConnection();

const app = express();

// Middlewares
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2.592e9,
    },
  })
);
app.use(cookieParser());

// Endpoints
app.get("/", (req, res) => {
  res.send("Hello there 👋");
});

app.use("/api/v1/users", authCheck, userRoutes);
app.use("/api/v1/songs", authCheck, songRoutes);
app.use("/api/v1/playlists", authCheck, playlistRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
