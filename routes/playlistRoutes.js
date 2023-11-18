/**
 * Routes associated with the playlist controller.
 * @module PlaylistRoutes
 */

const express = require("express");
const router = express.Router();

const playlistController = require("../controllers/playlistController");

router.post("/new", playlistController.createPlaylist);
router.put("/:id/songs", playlistController.addSongToPlaylist);
router.delete("/:id/songs", playlistController.deleteSongFromPlaylist);
router.delete("/:id", playlistController.deletePlaylist);
router.get("/", playlistController.getAllPlaylists);
router.get("/:id", playlistController.getPlaylistsByUser);

module.exports = router;
