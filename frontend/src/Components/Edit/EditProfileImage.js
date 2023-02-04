import React, { useState, useEffect, useRef } from "react";

import { convertToBase64 } from "../../Services/Utils/blobToBase64";

import defaultUserLogo from "../../Assets/Pictures/default-user-logo.png";

import "../../Assets/Styles/EditProfileImage.scss";

const EditProfileImage = (props) => {
  const [image, setImage] = useState(props.imageFile);
  const inputFile = useRef(null);

  useEffect(() => {
    if (typeof props.imageFile === "string" && props.imageFile.length > 0) {
      setImage(props.imageFile);
    }
  }, [props]);

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg",
      "image/x-icon",
    ];

    if (validTypes.indexOf(file.type) === -1) return false;

    return true;
  };

  const pickNewImageHandler = () => {
    inputFile.current.click();
  };

  const updateImage = (e) => {
    if (!validateFile(e.target.files[0])) return;

    let file = e.target.files[0];

    setImage(file);

    const convert = async () => {
      let data = await convertToBase64(file);

      props.onChange(data);
    };

    convert();
  };

  return (
    <div className="edit-profile-image-container">
      <div style={{ width: 73 }}>
        {image.length !== 0 ? (
          <img
            className="edit-profile-settings-default-image"
            src={image}
            alt={"default"}
          />
        ) : (
          <img
            className="edit-profile-settings-default-image"
            src={defaultUserLogo}
            alt={"default"}
          />
        )}
      </div>

      <div className="edit-profile-image-username-and-update-image-button">
        {props.username}

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          ref={inputFile}
          onChange={(e) => updateImage(e)}
        />
        <button
          className="edit-profile-image-button"
          variant="contained"
          color="primary"
          component="span"
          onClick={() => pickNewImageHandler()}
        >
          Change profile image
        </button>
      </div>
    </div>
  );
};

export default EditProfileImage;
