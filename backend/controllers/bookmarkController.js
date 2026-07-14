const Bookmark = require("../models/Bookmark");

// Create Bookmark
const createBookmark = async (req, res) => {
  try {
    const { videoId, bookmarkName, timestamp } = req.body;

    const bookmark = await Bookmark.create({
      userId: req.user.id,
      videoId,
      bookmarkName,
      timestamp,
    });

    res.status(201).json({
      success: true,
      bookmark,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Bookmarks of a Video
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      userId: req.user.id,
      videoId: req.params.videoId,
    }).sort({ timestamp: 1 });

    res.json({
      success: true,
      bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Bookmark (Bonus)
const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    await Bookmark.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Bookmark deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBookmark,
  getBookmarks,
  deleteBookmark,
};