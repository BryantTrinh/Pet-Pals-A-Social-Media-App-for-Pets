import React, { useState } from 'react';

const ProfilePictureUpload = () => {
  const [file, setFile] = useState(null);
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new formData();
    formData.append("profilePicture", file);
    // here we send formData to the backend using axios or fetch api....
  };
// returning a form that contains an input field for selecting the file and a submit button for uploading file. 
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileUpload} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ProfilePictureUpload;