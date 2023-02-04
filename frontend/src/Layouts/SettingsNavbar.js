import React from "react";

import "../Assets/Styles/SettingsNavbar.scss";

const SettingsNavbar = (props) => {
  const { setStepState } = props;

  const handleState = (step) => {
    setStepState(step);
  };

  return (
    <div className={"settings-navbar-container"}>
      <div className={"settings-navbar-content"}>
        <div className={"settings-navbar-buttons-group"}>
          <div
            className={"settings-navbar-button"}
            onClick={() => handleState(1)}
            tabIndex={1}
          >
            <div className="settings-navbar-button-text">Edit profile</div>
          </div>

          <div
            className={"settings-navbar-button"}
            onClick={() => handleState(2)}
            tabIndex={2}
          >
            <div className="settings-navbar-button-text">Change password</div>
          </div>

          <div
            className={"settings-navbar-button"}
            onClick={() => handleState(3)}
            tabIndex={3}
          >
            <div className="settings-navbar-button-text">Notifications</div>
          </div>

          <div
            className={"settings-navbar-button"}
            onClick={() => handleState(4)}
            tabIndex={4}
          >
            <div className="settings-navbar-button-text">Create</div>
          </div>

          <div
            className={"settings-navbar-button"}
            onClick={() => handleState(5)}
            tabIndex={5}
          >
            <div className="settings-navbar-button-text">Profile</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsNavbar;
