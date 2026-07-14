const express = require("express");
const router = express.Router();

const {
  getVideos,
  getVideoById,
} = require("../controllers/videoController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getVideos);

router.get("/:id", authMiddleware, getVideoById);

module.exports = router;