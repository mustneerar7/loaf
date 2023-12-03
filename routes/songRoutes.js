/**
 * Routes associated with the song controller.
 * @module SongRoutes
 */

const express = require("express");
const router = express.Router();

const songController = require("../controllers/songController");

router.post("/new", songController.addSong);
router.get("/", songController.getAllSongs);
router.get("/:id", songController.getSong);
router.get("/search/:title", songController.searchSong);

module.exports = router;
