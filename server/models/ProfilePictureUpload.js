const express = require('express');
// multer is a dependency that will store the image as binary data
const multer = require('multer');
const mongoose = require('mongoose');
// setting up multer by creating a 'memoryStorage' object and a multer instance with the storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
const User = mongoose.model("User", {...});
const router = express.Router();

// upload.single function is middleware provided by multer that processes the 'profilePicture' field in the req.body and then stores the uploaded file in memory. file.buffer is the binary data of the uploaded file. buffer= property of file, which is an object returned by multer when processing uploaded file. Binary data can be stored in a MongoDB. 

router.post("/profile-picture", upload.array("profilePicture"), async (req, res) => {
  const user = await User.findById(req.user.id);
  user.profilePicture = [];
  req.files.forEach((file) => {
    user.profilePicture.push(file.buffer);
  });
  await user.save();
  res.send();
});