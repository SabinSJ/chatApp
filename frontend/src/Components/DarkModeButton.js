import React from "react";

import Brightness3Icon from "@mui/icons-material/Brightness3";

import "../Assets/Styles/DarkModeButton.scss";

const DarkModeButton = () => {
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  if (localStorage.getItem("theme")) theme = localStorage.getItem("theme");

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
    }
  };

  return (
    <div
      className={theme === "dark" ? clickedClass : ""}
      id="darkMode"
      onClick={(e) => switchTheme(e)}
    >
      Dark Mode <Brightness3Icon />
    </div>
  );
};

export default DarkModeButton;
