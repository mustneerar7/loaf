/**
 * User model module.
 * @module User
 */

var mongoose = require("mongoose");

/**
 * User schema.
 * @typedef {Object} UserSchema
 * @property {string} username - The user's username.
 * @property {string} displayName - The user's display name.
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @property {string} accountType - The user's account type. Defaults to "standard".
 * @property {Array} likedSongs - An array of song IDs that the user has liked.
 */

var userSchema = new mongoose.Schema({
  // mandatory fields
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already in use"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 8;
      },
      message: (props) => `${props.value} must be at least 8 characters`,
    },
  },

  // default values
  accountType: {
    type: String,
    default: "standard",
  },

  // optional
  likedSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

// User model created from the user schema.
var User = mongoose.model("User", userSchema);

module.exports = User;
