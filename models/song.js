/**
 * Song model module.
 * @module Song
 */

const mongoose = require("mongoose");

/**
 * Schema
 * @typedef {Object} SongSchema
 * @property {string} title - The title of the song.
 * @property {string} artist - The artist of the song.
 * @property {string} [album=Single] - The album of the song. Defaults to "Single".
 * @property {string} [genre] - The genre of the song.
 * @property {string} [year] - The year the song was released.
 * @property {string} [artwork] - The URL of the artwork for the song.
 * @property {string} [songFile] - The URL of the audio file for the song.
 */

const Song = mongoose.model(
  "Song",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      default: "Single",
    },
    genre: String,
    year: String,
    artwork: String,
    songFile: String,
  })
);

module.exports = Song;
