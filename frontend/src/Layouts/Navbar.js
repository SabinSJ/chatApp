import React from "react";

import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import defaultUserLogo from "../Assets/Pictures/default-user-logo.png";

import "../Assets/Styles/Navbar.scss";

const Navbar = () => {
  return (
    <div className={"navbar-container"}>
      <div className={"navbar-content"}>
        <div className={"navbar-logo-text"}>SnapTalk</div>
        <FormControl>
          <InputBase
            type="text"
            rows={1}
            multiline={false}
            placeholder="Search"
          />
        </FormControl>
        <div className={"navbar-buttons-group"}>
          <HomeIcon />
          <ChatIcon />
          <FavoriteBorderIcon />

          <img className={"navbar-user-logo"} src={defaultUserLogo} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
