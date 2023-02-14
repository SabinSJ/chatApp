import React, { useRef, useState, useEffect } from "react";

import { useMutation } from "@apollo/client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import CloseIcon from "@mui/icons-material/Close";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import EmojiPicker from "emoji-picker-react";

import { CREATE_POST } from "../../Services/Queries/user";
import { convertToBase64 } from "../../Services/Utils/blobToBase64";

import MultimediaUploadLogo from "../../Assets/Pictures/multimedia-upload.svg";
import defaultUserLogo from "../../Assets/Pictures/default-user-logo.png";

import "../../Assets/Styles/Modals/CreateNewPostModal.scss";

const CreateNewPostModal = (props) => {
  const [createPost, { data }] = useMutation(CREATE_POST);

  const [newPost, setNewPost] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [typeOfContent, setTypeOfContent] = useState("");
  const inputRef = useRef();

  const [handleModal, setHandleModal] = useState(0);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleClose = () => {
    props.setOpenModal(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDrop = (event) => {
    event.preventDefault();

    if (!validateFile(event.dataTransfer.files[0])) return;

    let file = event.dataTransfer.files[0];

    setNewPost(URL.createObjectURL(file));
  };

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg",
      "image/x-icon",
      "video/mp4",
    ];

    if (validTypes.indexOf(file.type) === -1) return false;

    return true;
  };

  const uploadFile = (e) => {
    if (!validateFile(e.target.files[0])) return;

    let file = e.target.files[0];

    setTypeOfContent(file.type);

    setPreviewContent(URL.createObjectURL(file));

    const convert = async () => {
      let data = await convertToBase64(file);

      setNewPost(data);
    };

    convert();
  };

  const handleSubmit = async () => {
    try {
      await createPost({
        variables: {
          input: {
            content: newPost,
            content_type: typeOfContent,
            content_description: description,
            content_location: location,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data && data.createNewPost.status === 200) {
      alert(data.createNewPost.message);
    }
  }, [data]);

  const handleBackButton = () => {
    if (handleModal === 0) setNewPost("");
    else if (handleModal === 1) setHandleModal(0);
  };

  return (
    <>
      <Modal
        className={"create-new-post-modal"}
        open={props.openModal}
        onClose={() => handleClose()}
      >
        <Box
          className={"create-new-post-modal-box"}
          style={handleModal === 1 ? { width: 1058 } : {}}
        >
          <div className="create-new-post-top-container">
            {newPost.length !== 0 && (
              <button
                className="create-new-post-discard-button"
                onClick={() => handleBackButton()}
              >
                <KeyboardBackspaceIcon />
              </button>
            )}
            <p className="create-new-post-title">Create new post</p>
            {newPost.length !== 0 && handleModal === 0 ? (
              <button
                className="create-new-post-next-button"
                onClick={() => setHandleModal(1)}
              >
                Next
              </button>
            ) : (
              <button
                className="create-new-post-next-button"
                onClick={() => handleSubmit()}
              >
                Share
              </button>
            )}
          </div>
          <div
            className="create-new-post-content"
            style={handleModal === 1 ? { justifyContent: "space-between" } : {}}
          >
            {newPost.length !== 0 ? (
              <>
                {handleModal === 0 ? (
                  <>
                    {typeOfContent === "video/mp4" ? (
                      <video
                        className="create-new-post-added-image"
                        controls={false}
                        autoPlay
                        loop
                      >
                        <source src={previewContent} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        className="create-new-post-added-image"
                        src={previewContent}
                        alt="post data"
                      />
                    )}
                  </>
                ) : (
                  <>
                    {typeOfContent === "video/mp4" ? (
                      <video
                        className="create-new-post-added-image"
                        controls={false}
                        autoPlay
                        loop
                      >
                        <source src={previewContent} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        className="create-new-post-added-image"
                        style={
                          handleModal === 1
                            ? {
                                width: "70%",
                                height: 714,
                                borderBottomRightRadius: 0,
                              }
                            : { width: "100%" }
                        }
                        src={previewContent}
                        alt="post data"
                      />
                    )}

                    <div className="create-new-post-description-section">
                      <div className="create-new-post-user-image-and-username">
                        <img
                          className="create-new-post-profile-image"
                          src={defaultUserLogo}
                          alt="default"
                        />

                        <p className="create-new-post-username">sabinsj07</p>
                      </div>

                      <div className="create-new-post-description-input-container">
                        <FormControl className="form-control-input-base">
                          <InputBase
                            className="create-new-post-description-input"
                            multiline
                            placeholder="Write a caption..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            inputProps={{ maxLength: 250 ? 250 : undefined }}
                            rows={3}
                          />
                          <div className="create-new-post-emoji-button-and-nr-characters">
                            <div className="create-new-post-emoji-button-container">
                              <button
                                className="create-new-post-open-emoji-list"
                                onClick={() =>
                                  setIsEmojiPickerVisible(!isEmojiPickerVisible)
                                }
                              >
                                <InsertEmoticonIcon />
                              </button>
                            </div>

                            <p className="create-new-post-number-of-description-characters">
                              {description.length}/250
                            </p>
                          </div>
                        </FormControl>

                        {isEmojiPickerVisible && (
                          <EmojiPicker
                            onEmojiClick={(e) => {
                              setDescription(description + e.emoji);
                              console.log(e);
                              setIsEmojiPickerVisible(false);
                            }}
                          />
                        )}

                        <FormControl className="form-control-input-base">
                          <InputBase
                            className="create-new-post-locaiton-input"
                            placeholder="Add location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            inputProps={{ maxLength: 250 ? 250 : undefined }}
                          >
                            <LocationOnOutlinedIcon />
                          </InputBase>
                        </FormControl>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div
                className="create-new-post-dropzone"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleOnDrop(e)}
              >
                <img
                  className="create-new-post-image"
                  src={MultimediaUploadLogo}
                  alt="multimedia"
                />
                <p className="create-new-post-add-text">
                  Drag photos and videos here
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => uploadFile(event)}
                  hidden
                  ref={inputRef}
                />
                <button
                  className="create-new-post-add-button"
                  onClick={() => inputRef.current.click()}
                >
                  Select from computer
                </button>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CreateNewPostModal;
