import React, { useRef, useState, useEffect } from "react";

import { useMutation } from "@apollo/client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import CloseIcon from "@mui/icons-material/Close";

import "../../Assets/Styles/Modals/OpenPostModal.scss";

const CreateNewPostModal = (props) => {
  const { openModal, setOpenPostModal, postModalData } = props;

  const handleClose = () => {
    setOpenPostModal(false);
  };

  return (
    <>
      <Modal
        className={"post-modal"}
        open={openModal}
        onClose={() => handleClose()}
      >
        <Box
          className={"post-modal-box"}
          //   style={handleModal === 1 ? { width: 1058 } : {}}
        >
          <div className="post-modal-container">
            <img
              className="post-modal-content"
              src={postModalData}
              alt={"post"}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CreateNewPostModal;
