const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/bookmarks", bookmarkRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GVCC Learning Portal API Running",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});