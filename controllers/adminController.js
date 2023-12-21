const User = require("../models/user");
const Song = require("../models/song");

const bcrypt = require("bcrypt");

// A function which logs in the user if the email and password are correct
// and accountType is admin.
// create a session, return a cookie with the session id and user.
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email)
      return res.status(400).send({
        status: "fail",
        message: "Email is required.",
      });

    if (!password)
      return res.status(400).send({
        status: "fail",
        message: "Password is required.",
      });

    let requestedUser = await User.findOne({ email });

    if (!requestedUser)
      return res.status(404).send({
        status: "fail",
        message: "User not found.",
      });

    // check if password is correct using bcrypt
    const isPasswordCorrect = await bcrypt.compare(
      password,
      requestedUser.password
    );

    // if user is not an admin, return an error
    if (requestedUser.accountType !== "admin")
      return res.status(401).send({
        status: "fail",
        message: "You are not authorized to access this page.",
      });

    if (!isPasswordCorrect)
      return res.status(401).send({
        status: "fail",
        message: "Incorrect password.",
      });
    else {
      const songs = await Song.find();

      req.session.user = requestedUser;
      res.cookie("user", requestedUser._id);

      res.render("layout", { user: requestedUser, songs: songs });
    }
  } catch (error) {
    res.redirect("/admin", { user: error.message });
  }
};

// A function which logs out the user.
// destroy the session and clear the cookie.
const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie("user");
  res.redirect("/admin");
};

// The root dashboard route.
const dashboard = async (req, res) => {
  // get all songs
  const songs = await Song.find();
  req.session.songs = songs;

  res.render("layout", { user: req.session.user, songs: req.session.songs });
};

// A function which adds a song to the database.
const addSong = async (req, res) => {
  try {
    const { title, artist, album, year, artwork } = req.body;

    // Validate the form data (you might want to add more validation)
    if (!title || !artist || !album) {
      return res.status(400).json({
        status: "fail",
        message: "Title, artist, and album are required fields.",
      });
    }

    // Create Song file name
    // remove spaces from title and artist
    stringTitle = title.replace(/\s/g, "");
    stringArtist = artist.replace(/\s/g, "");

    const songFile = `${stringArtist}-${stringTitle}.mp3`;

    // Create a new song
    const newSong = new Song({ title, artist, album, year, artwork, songFile });

    // Save the new song to your database.
    await newSong.save();

    // get all songs
    const songs = await Song.find();

    req.session.songs = songs;

    // render the layout with the songs
    res.render("layout", { songs: songs, user: req.session.user });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

// A function which deletes a song from the database.
const deleteSong = async (req, res) => {
  try {
    const songId = req.params.id;

    await Song.findByIdAndDelete(songId);

    // get all songs
    const songs = await Song.find();
    req.session.songs = songs;

    // Redirect to the page displaying songs
    res.render("layout", { songs: songs, user: req.session.user });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
  logout,
  dashboard,
  addSong,
  deleteSong,
};
