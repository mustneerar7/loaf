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
      message: "User created successfully.",
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
  try {
    if (req.session.user) {
      return res.send({
        status: "success",
        message: "User already logged in.",
        data: req.session.user ,
      });
    }

    const { email, password } = req.body;

    if (!email)
      return res.status(400).send({ 
        status: "fail", 
        message: "Email is required." 
      });

    if (!password)
      return res.status(400).send({ 
        status: "fail", 
        message: "Password is required." 
      });

    let requestedUser = await User.findOne({ email });

    if (!requestedUser)
      return res.status(404).send({ 
        status: "fail", 
        message: "User not found." 
      });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      requestedUser.password
    );

    if (!isPasswordCorrect)
      return res.status(401).send({ 
        status: "fail", 
        message: "Incorrect password." 
      });

    req.session.user = requestedUser;
    res.cookie("user", requestedUser);

    return res.send({
      status: "success",
      message: "Logged in successfully.",
      data: requestedUser ,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
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
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({
          status: "fail",
          message: "Could not log out.",
        });
      }

      res.clearCookie("user");

      res.send({
        status: "success",
        message: "Logged out successfully.",
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};


module.exports = {
  login,
  signup,
  logout,
};
