/**
 * Controller functions for managing user data in the database.
 * @module userController
 */

const User = require("../models/user");


/**
 * Gets the list of all users in the database.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the list of all users.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
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
 * Gets a specific user from the database.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the requested user.
 */
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
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
 * Deletes a specific user from the database.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};


/**
 * Adds a song to the user's liked songs.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the updated user.
 */
const addSongToLikedSongs = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.likedSongs.push(req.body.songId);
    await user.save();

    res.status(200).json({
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
 * Deletes a song from the user's liked songs.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the updated user.
 */
const deleteSongFromLikedSongs = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.likedSongs.pull(req.body.songId);
    await user.save();

    res.status(200).json({
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


module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  addSongToLikedSongs,
  deleteSongFromLikedSongs,
};
