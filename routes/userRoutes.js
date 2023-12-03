/**
 * Routes associated with the user controller.
 * @module UserRoutes
 */

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.delete("/:id", userController.deleteUser);
router.patch("/:id", userController.addSongToLikedSongs);

module.exports = router;
