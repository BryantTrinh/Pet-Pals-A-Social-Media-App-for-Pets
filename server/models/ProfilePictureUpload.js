const express = require('express');
// multer is a dependency that will store the image as binary data
const multer = require('multer');
const mongoose = require('mongoose');
const storage = multer.memoryStorage():
const upload = multer({ storage });
const User = mongoose.model("User", {...});
const router = express.Router();


router.post("/profile-picture", upload.single("profilePicture"), async (req, res) => {
  const user = await User.findById(req.user.id);
  user.profilePicture = req.file.buffer;
  await user.save();
  res.send();
});