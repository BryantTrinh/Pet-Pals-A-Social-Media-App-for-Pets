const express = require('express');
// multer is a dependency that will store the image as binary data
const multer = require('multer');
const mongoose = require('mongoose');
// setting up multer by creating a 'memoryStorage' object and a multer instance with the storage
const storage = multer.memoryStorage();
// fileFilter used as a callback function that validates the MIME type of the uploaded file.
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "video/mp4",
      "video/quicktime",
      "video/avchd",
      "video/x-flv",
      "video/x-f4v",
      "video/x-matroska",
      "video/webm",
      "video/ogg"
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Invalid file type");
      error.code = "INVALID_FILE_TYPE";
      return cb(error, false);
    }
    cb(null, true);
  }
});
const User = mongoose.model("User", {...});
const router = express.Router();

// upload.single function is middleware provided by multer that processes the 'profilePicture' field in the req.body and then stores the uploaded file in memory. file.buffer is the binary data of the uploaded file. buffer= property of file, which is an object returned by multer when processing uploaded file. Binary data can be stored in a MongoDB. 
// mimetype represents type of uploaded file.
// Probably best practice to store them in separate fields to make it easier to filter and retrieve later on.

router.post("/profile-picture", upload.array("profilePicture"), async (req, res) => {
  const user = await User.findById(req.user.id);
  user.profilePicture = [];
  req.files.forEach((file) => {
    user.profilePicture.push({
      buffer: file.buffer,
      mimetype: file.mimetype
    });
  });
  await user.save();
  res.send();
});