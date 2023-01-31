import React, { useState } from 'react';
// "e" = event
const ProfilePictureUpload = () => {
  const [files, setFiles] = useState([]);
  const handleFileUpload = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new formData();
    files.forEach((file) => {
      formData.append("profilePicture", file);
    });
    // here we send formData to the backend using axios or fetch api....
  };
// returning a form that contains an input field for selecting the file and a submit button for uploading file. 
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileUpload} multiple />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ProfilePictureUpload;