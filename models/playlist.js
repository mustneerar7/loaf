/**
 * Playlist model module.
 * @module Playlist
 */

var mongoose = require("mongoose");

/**
 * Playlist schema.
 * @typedef {Object} PlaylistSchema
 * @property {string} title - The playlist's title.
 * @property {string} createdBy - The playlist's creator.
 * @property {Array} songs - An array of song IDs that the playlist contains.
 */

var playlistSchema = new mongoose.Schema({
  title: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

// Playlist model from schema.
var Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
