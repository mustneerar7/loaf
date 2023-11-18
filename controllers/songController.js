/**
 * Controller for managing songs in the database.
 * @module songController
 */

const Song = require("../models/song");


/**
 * Creates a new song in the database.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the created song.
 */
const addSong = async (req, res) => {
  try {
    const songs = await Song.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        songs,
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
 * Gets the list of all songs in the database.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the list of songs.
 */
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();

    res.status(200).json({
      status: "success",
      results: songs.length,
      data: {
        songs,
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
 * Gets a specific song from the database.
 * @function
 * @async
 * @param {Object} req - Express request object containing the song ID.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the song.
 */
const getSong = async (req, res) => {
  try {
    const songs = await Song.findById(req.params.id);
    
    res.status(200).json({
      status: "success",
      data: {
        songs,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};


// Exports.
module.exports = {
  addSong,
  getAllSongs,
  getSong,
};
