import React from "react";

import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
// import FavoriteIcon from "@mui/icons-material/Favorite";

import UploadPostImage from "../Assets/Pictures/upload_post_image.svg";

import "../Assets/Styles/UsersPostsCard.scss";

const UsersPostsCard = (props) => {
  const { userPosts, setOpenPostModal, setPostModalData } = props;

  const handleOpenPostModal = (data) => {
    setPostModalData(data);
    setOpenPostModal(true);
  };

  return (
    <>
      {userPosts.length !== 0 ? (
        userPosts.map((post, index) => (
          <>
            <div
              style={{
                backgroundImage: `url(${post})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
              id={index}
              className="users-posts-section"
              src={post}
              alt={"post"}
            >
              <div
                className="users-posts-overlay-container"
                onClick={() => handleOpenPostModal(post)}
              >
                <div className="users-posts-overlay">
                  <ChatBubbleIcon />
                  <div className="users-posts-overlay-number-of-comments">
                    0
                  </div>
                </div>
              </div>
            </div>

            {/* <video
              className="create-new-post-added-image"
              controls={false}
              autoPlay
              loop
            >
              <source src={post} type="video/mp4" />
            </video> */}
          </>
        ))
      ) : (
        <div className="users-posts-empty-list-container">
          <img style={{ cursor: "pointer" }} src={UploadPostImage} alt="post" />
          <div className="users-posts-text-title">Share Photos</div>
          <div className="users-posts-text-description">
            When you share photos, they will appear on your profile.
          </div>
          <div className="users-posts-share-photo-button">
            Share your first photo
          </div>
        </div>
      )}
    </>
  );
};

export default UsersPostsCard;
