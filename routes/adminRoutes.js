const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const adminValidator = require("../middlewares/adminValidator");

router.post("/login", adminController.login);
router.post("/logout", adminController.logout);
router.get("/admin", adminController.dashboard);
router.post("/add-song", adminValidator, adminController.addSong);
router.post("/delete-song/:id", adminValidator, adminController.deleteSong);

module.exports = router;
