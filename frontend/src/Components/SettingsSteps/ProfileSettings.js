import React, { useEffect, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import jwt_decode from "jwt-decode";

import { UPDATE_USER, GET_PERSONAL_DATA } from "../../Services/Queries/user";

import SettingsInputField from "../../Layouts/SettingsInputField";

import "../../Assets/Styles/ProfileSettings.scss";
import EditProfileImage from "../Edit/EditProfileImage";

const ProfileSettings = () => {
  const [updateUser, { data }] = useMutation(UPDATE_USER);

  const getPersonalData = useQuery(GET_PERSONAL_DATA, {
    variables: { id: jwt_decode(window.localStorage.getItem("token")).id },
  });

  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isProfileImageChanged, setIsProfileImageChanged] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  // const [formValues, setFormValues] = useState({
  //   name: "",
  //   username: "",
  //   bio: "",
  //   email: "",
  //   gender: "" ? "" : "Male",
  // });

  const handleSubmit = async () => {
    try {
      await updateUser({
        variables: {
          input: {
            id: jwt_decode(window.localStorage.getItem("token")).id,
            profileImage: profileImage,
            name: name,
            username: username,
            bio: bio,
            email: email,
            gender: gender,
          },
        },
      });

      const event = new Event("getProfilePicture");
      document.dispatchEvent(event);
    } catch (err) {
      console.log(err);
    }
  };

  const fillFields = (userDTO) => {
    setName(userDTO.name);
    setUsername(userDTO.username);
    setBio(userDTO.bio);
    setEmail(userDTO.email);
    setGender(userDTO.gender);
  };

  useEffect(() => {
    if (data && data.updateUser.status === 200) {
      alert(data.updateUser.message);
    }
  }, [data]);

  useEffect(() => {
    if (!getPersonalData.loading && getPersonalData.data) {
      if (
        getPersonalData.data.getPersonalData.profileImage.slice(0, 3) === '{"b'
      ) {
        let image = JSON.parse(
          getPersonalData.data.getPersonalData.profileImage
        ).blob;

        setProfileImage(image);
      } else {
        setProfileImage(getPersonalData.data.getPersonalData.profileImage);
      }

      let userDTO = { ...getPersonalData.data.getPersonalData, id: 1 };

      delete userDTO.__typename;

      fillFields(userDTO);
    }
  }, [getPersonalData.data, getPersonalData.loading]);

  // useEffect(() => {
  //   setIsProfileImageChanged(false);
  //   handleSubmit();
  // }, [isDataChanged]);

  return (
    <div className="profile-settings-container">
      <div className="profile-settings-image-container">
        <EditProfileImage
          username={username}
          imageFile={profileImage}
          onChange={(image) => {
            setProfileImage(image);
            setIsProfileImageChanged(true);
          }}
        />
      </div>

      <div className="profile-settings-name-container">
        <SettingsInputField
          title="Name"
          type="text"
          onChange={(val) => {
            setName(val);
            setIsDataChanged(true);
          }}
          value={name}
        />
      </div>

      <div className="profile-settings-name-container">
        <SettingsInputField
          title="Username"
          type="text"
          onChange={(val) => {
            setUsername(val);
            setIsDataChanged(true);
          }}
          value={username}
        />
      </div>

      <div className="profile-settings-name-container">
        <SettingsInputField
          title="Bio"
          type="text"
          multiline={true}
          onChange={(val) => {
            setBio(val);
            setIsDataChanged(true);
          }}
          value={bio}
        />
      </div>

      <div className="profile-settings-name-container">
        <SettingsInputField
          title="Email"
          type="email"
          onChange={(val) => {
            setEmail(val);
            setIsDataChanged(true);
          }}
          value={email}
        />
      </div>

      <div className="profile-settings-gender-dropdown-container">
        <label className="profile-settings-gender-label">Gender</label>
        <select
          className="profile-settings-gender-dropdown"
          onChange={(val) => {
            setGender(val.target.value);
            setIsDataChanged(true);
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Custom">Custom</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>

      <div className="profile-settings-submit-button-container">
        <button
          onClick={() => handleSubmit()}
          className={
            isDataChanged
              ? "profile-settings-save-changes-button"
              : "profile-settings-save-changes-button-not-completed"
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
