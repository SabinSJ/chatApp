import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";

import SettingsIcon from "@mui/icons-material/Settings";

import { GET_USER, GET_USER_POSTS } from "../Services/Queries/user";

import UsersPostsCard from "../Components/UsersPostsCard";
import OpenPostModal from "../Components/Modals/OpenPostModal";

import defaultUserLogo from "../Assets/Pictures/default-user-logo.png";

import "../Assets/Styles/UserPage.scss";

const UserPage = () => {
  const params = useParams();

  // const getUser = useQuery(GET_USER, {
  //   variables: { username: params.username },
  //   fetchPolicy: "no-cache",
  // });

  const getUserPosts = useQuery(GET_USER_POSTS, {
    variables: { username: params.username },
    fetchPolicy: "no-cache",
  });

  const [username, setUsername] = useState(params.username);
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [nrOfPosts, setNrOfPosts] = useState(0);

  const [openPostModal, setOpenPostModal] = useState(false);
  const [postModalData, setPostModalData] = useState("");

  useEffect(() => {
    if (!getUserPosts.loading && getUserPosts.data) {
      for (let i = getUserPosts.data.getUserPosts.length - 1; i >= 0; i--) {
        setUserPosts((oldArray) => [
          ...oldArray,
          JSON.parse(getUserPosts.data.getUserPosts[i].content).blob,
        ]);
      }

      setNrOfPosts(getUserPosts.data.getUserPosts.length);
    }
  }, [getUserPosts.data, getUserPosts.loading]);

  // useEffect(() => {
  //   if (!getUser.loading && getUser.data) {
  //     setProfileImage(JSON.parse(getUser.data.getUser.profileImage).blob);
  //     setBio(getUser.data.getUser.bio);
  //   }
  // }, [getUser.data, getUser.loading]);

  return (
    <>
      {openPostModal ? (
        <OpenPostModal
          openModal={openPostModal}
          setOpenPostModal={setOpenPostModal}
          postModalData={postModalData}
        />
      ) : (
        <div className="user-page-section">
          <div className="user-page-container">
            <div className="user-page-top-section">
              {profileImage ? (
                <img className="user-page-default-image" src={profileImage} />
              ) : (
                <img
                  className="user-page-default-image"
                  src={defaultUserLogo}
                />
              )}
              <div className="user-page-buttons-section">
                <div className="user-page-username-and-settings-buttons">
                  <p className="user-page-username">{username}</p>
                  <button className="user-page-profile-settings-button">
                    Edit profile
                  </button>
                  <button className="user-page-settings-button">
                    <SettingsIcon />
                  </button>
                </div>

                <div className="user-page-posts-and-followers">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className="user-page-number-of-posts">{nrOfPosts}</p>
                    &nbsp;
                    <p className="user-page-number-of-posts-text">posts</p>
                  </div>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      width: "auto",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <p className="user-page-followers-button">238 </p>
                    &nbsp;
                    <p className="user-page-followers-text">followers</p>
                  </button>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      width: "auto",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <p className="user-page-following-button">375</p>&nbsp;
                    <p className="user-page-following-text">following</p>
                  </button>
                </div>

                <div className="user-page-description">{bio}</div>
              </div>
            </div>
            <div className="user-page-divider" />

            <div className="user-page-content-section">
              <UsersPostsCard
                userPosts={userPosts}
                setOpenPostModal={setOpenPostModal}
                setPostModalData={setPostModalData}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
