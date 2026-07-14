const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBookmark,
  getBookmarks,
  deleteBookmark,
} = require("../controllers/bookmarkController");

router.post("/", authMiddleware, createBookmark);

router.get("/:videoId", authMiddleware, getBookmarks);

router.delete("/:id", authMiddleware, deleteBookmark);

module.exports = router;