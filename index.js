/**
 * @file Entrypoint for the server.
 */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const createConnection = require("./configs/mongo");

const userRoutes = require("./routes/userRoutes");
const songRoutes = require("./routes/songRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const jwtValidator = require("./middlewares/jwtValidator");

// Load environment variables
dotenv.config({ path: `${__dirname}/config.env` });

// Open connection to database.
createConnection();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session middleware
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Set view engine
app.set("view engine", "ejs");

// Set static folders
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/v1/users", jwtValidator, userRoutes);
app.use("/api/v1/songs", jwtValidator, songRoutes);
app.use("/api/v1/playlists", jwtValidator, playlistRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 8080.");
});
