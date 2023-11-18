/**
 * Controller for managing playlists in the database.
 * @module playlistController
 */

var Playlist = require("../models/playlist");


/**
 * Creates a new playlist in the database.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the created playlist.
 */
const createPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body);
    
    res.status(201).json({
      status: "success",
      data: {
        playlist,
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
 * Adds a song to a playlist.
 * @function
 * @async
 * @param {Object} req - Express request object containing the playlist ID and song object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the updated playlist.
 */
const addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    playlist.songs.push(req.body);
    playlist.save();

    res.status(201).json({
      status: "success",
      data: {
        playlist,
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
 * Deletes a song from a playlist.
 * @function
 * @async
 * @param {Object} req - Express request object containing the playlist ID and song object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the updated playlist.
 */
const deleteSongFromPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    playlist.songs.pull(req.body);
    playlist.save();

    res.status(201).json({
      status: "success",
      data: {
        playlist,
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
 * Deletes a specific playlist from the database.
 * @function
 * @async
 * @param {Object} req - Express request object containing the playlist ID.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the deleted playlist.
 */
const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);

    res.status(201).json({
      status: "success",
      data: {
        playlist,
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
 * Gets all playlists from the database.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing all playlists in the database.
 */
const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();

    res.status(200).json({
      status: "success",
      results: playlists.length,
      data: {
        playlists,
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
 * Gets all playlists from a specific user.
 * @function
 * @async
 * @param {Object} req - Express request object containing the user ID.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing all playlists created by the specified user.
 */
const getPlaylistsByUser = async (req, res) => {
  try {
    const playlists = await Playlist.find({ createdBy: req.params.id });

    res.status(200).json({
      status: "success",
      results: playlists.length,
      data: {
        playlists,
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
  createPlaylist,
  addSongToPlaylist,
  deleteSongFromPlaylist,
  deletePlaylist,
  getAllPlaylists,
  getPlaylistsByUser,
};
