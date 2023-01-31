import React, { useState } from 'react';
import { GraphQLUpload ) from 'apollo-upload-client';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

// "e" = event
const ProfilePictureUpload = () => {
  const [files, setFiles] = useState([]);
  const handleFileUpload = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const graphQLUploadObjects = files.map((file) => GraphQLUpload.convertFile(file));
    // maxCount: 1 , so users can only upload one photo/video at a time.
    const uploader = upload.any({ maxCount: 1 });
    uploader(req, res, (err) => {
          if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(400).send(err);
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(400).send(err);
      }
    req.files.forEach((file) => {
      formData.append("profilePicture", file);
    });
  }};
};
  // here we send formData to the backend using fetch api
  // returning a form that contains an input field for selecting the file and a submit button for uploading file. 
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileUpload} multiple />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ProfilePictureUpload;