/**
 * Controller functions for managing user data in the database.
 * @module authController
 */

const User = require("../models/user");
const bcrypt = require("bcrypt");


/**
 * Creates a new user in the database.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the newly created user.
 */
const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);

    user.password = await bcrypt.hash(user.password, 12);
    await user.save();

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });

  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};


/**
 * Logs in a user.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the logged in user.
 * @throws {Error} - Throws an error if the email is not found or the password is incorrect.
 */
const login = async (req, res) => {

  if (req.session.user) {
    console.log("User already logged in");
    return res.send(req.session.user);
  }

  const { email, password } = req.body;

  let requestedUser = await User.findOne({ email });

  if (!requestedUser) {
    return res.status(404).send("Email not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    requestedUser.password
  );

  if (!isPasswordCorrect) {
    return res.status(401).send("Incorrect password");
  }

  req.session.user = requestedUser;
  console.log("Session created");

  res.cookie("user", requestedUser);
  console.log("User info sent to client");

  return res.send(requestedUser);
};


/**
 * Logs out a user.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing a message.
 */
const logout = (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    console.log("Session destroyed");

    res.clearCookie("user");
    console.log("Cookie cleared");

    res.send("Logged out");
  });
};

module.exports = {
  login,
  signup,
  logout,
};
