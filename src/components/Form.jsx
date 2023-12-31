import React, { useState } from "react";
import axios from "axios";
import { useRegisterUserMutation } from "../store/store";

const MyForm = () => {
  const [UserData, setUserData] = useState({
    firstName: "",
    photo: null,
    photoPreview: null,
  });
  const [registerUser, status] = useRegisterUserMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...UserData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({
          ...UserData,
          photo: file,
          photoPreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      e.target.value = null;
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a UserData object to send form data

    console.log(UserData);

    let formData = {
      name: UserData.firstName,
      me: UserData.photo,
    };

    console.log(formData);
    try {
      registerUser(formData);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

//   console.log(status);
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type='text'
          name='firstName'
          value={UserData.firstName}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Upload Photo:
        <input
          type='file'
          accept='image/*'
          name='photo'
          onChange={handleFileChange}
        />
      </label>
      <br />

      {UserData.photoPreview && (
        <img
          src={UserData.photoPreview}
          alt='Preview'
          style={{ maxWidth: "200px", maxHeight: "200px" }}
        />
      )}

      <br />

      <button type='submit'>Submit</button>
    </form>
  );
};

export default MyForm;
