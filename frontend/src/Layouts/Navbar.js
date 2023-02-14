import React, { useEffect, useState, useRef, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import jwt_decode from "jwt-decode";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import AnnouncementIcon from "@mui/icons-material/Announcement";

import DarkModeButton from "../Components/DarkModeButton";
import CreateNewPostModal from "../Components/Modals/CreateNewPostModal";

import { GET_PROFILE_PICTURE } from "../Services/Queries/user";

import defaultUserLogo from "../Assets/Pictures/default-user-logo.png";

import "../Assets/Styles/Navbar.scss";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (e) => {
      if (!domNode.current.contains(e.target)) handler();
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Navbar = () => {
  const [userImage, { loading, data }] = useLazyQuery(GET_PROFILE_PICTURE, {
    fetchPolicy: "no-cache",
  });

  const [profileImage, setProfileImage] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  let user_token = window.localStorage.getItem("token");

  const navigate = useNavigate();

  const handleImageUpdate = (e) => {
    if (e.type === "getProfilePicture" && !loading) {
      fetchUserProfileImage();
    }
  };

  document.addEventListener("getProfilePicture", handleImageUpdate, false);

  const fetchUserProfileImage = useCallback(async () => {
    if (user_token) {
      await userImage({
        variables: {
          id: jwt_decode(window.localStorage.getItem("token")).id,
        },
      });
    }
  }, [userImage]);

  useEffect(() => {
    if (data && data.getProfilePicture) {
      if (data.getProfilePicture.profileImage.slice(0, 3) === '{"b') {
        let image = JSON.parse(data.getProfilePicture.profileImage).blob;

        setProfileImage(image);
      } else {
        setProfileImage(data.getProfilePicture.profileImage);
      }
    }
  }, [data]);

  useEffect(() => {
    fetchUserProfileImage();
  }, [fetchUserProfileImage]);

  const handleOpenDropdown = () => {
    setOpenDropdown(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  let domNode = useClickOutside(() => {
    setOpenDropdown(false);
  });

  const navigateTo = (link) => {
    navigate(link);
  };

  return (
    <>
      <div className={"navbar-container"}>
        <div className={"navbar-sticky"}>
          <div className={"navbar-content"}>
            <div className={"navbar-logo-text"} onClick={() => navigate("/")}>
              SnapTalk
            </div>
            <div className={"navbar-buttons-group"}>
              <div className={"navbar-button"} onClick={() => navigate("/")}>
                <HomeIcon sx={{ fontSize: "35px" }} />
                <div className="navbar-button-text">Home</div>
              </div>

              <div className={"navbar-button"}>
                <SearchIcon sx={{ fontSize: "25px" }} />
                <div className="navbar-button-text">Search</div>
              </div>

              <div className={"navbar-button"}>
                <ChatIcon sx={{ fontSize: "25px" }} />
                <div className="navbar-button-text">Messages</div>
              </div>

              <div className={"navbar-button"}>
                <FavoriteBorderIcon sx={{ fontSize: "25px" }} />
                <div className="navbar-button-text">Notifications</div>
              </div>

              <div className={"navbar-button"}>
                <AddCircleOutlineIcon sx={{ fontSize: "25px" }} />
                <div
                  className="navbar-button-text"
                  onClick={() => setOpenModal(true)}
                >
                  Create
                </div>
              </div>

              <div className={"navbar-button"}>
                {profileImage.length !== 0 ? (
                  <img
                    className={"navbar-user-logo"}
                    src={profileImage}
                    alt={"user"}
                  />
                ) : (
                  <img
                    className={"navbar-user-logo"}
                    src={defaultUserLogo}
                    alt={"default"}
                  />
                )}
                <div
                  className="navbar-button-text"
                  onClick={() =>
                    navigate(
                      `/${
                        jwt_decode(window.localStorage.getItem("token"))
                          .username
                      }`
                    )
                  }
                >
                  Profile
                </div>
              </div>
            </div>
          </div>

          <div className="navbar-hamburger-container">
            <div
              className="navbar-hamburger-button"
              onClick={handleOpenDropdown}
            >
              <MenuIcon sx={{ fontSize: "35px" }} />
              <div className="navbar-button-text">More</div>
            </div>

            <div
              id="dropdown"
              ref={domNode}
              className={
                openDropdown ? "dropdown-content-show" : "dropdown-content"
              }
            >
              <div
                className="navbar-dropdown-button"
                onClick={() => navigateTo("/settings")}
              >
                Settings <SettingsIcon />
              </div>

              <DarkModeButton />

              <div className="navbar-dropdown-button">
                Report an issue <AnnouncementIcon />
              </div>
              <div className="navbar-dropdown-button" onClick={handleLogout}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateNewPostModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Navbar;
