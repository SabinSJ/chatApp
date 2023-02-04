import React, { useState } from "react";

import SettingsNavbar from "../Layouts/SettingsNavbar";
import ProfileSettings from "../Components/SettingsSteps/ProfileSettings";

import "../Assets/Styles/SettingsPage.scss";

const SettingsPage = () => {
  const [state, setStepState] = useState(1);

  const SettingsStepPage = (step) => {
    switch (step) {
      case 1:
        return <ProfileSettings />;
      case 2:
        return <p>empty 2</p>;
      case 3:
        return <p>empty 3</p>;
      case 4:
        return <p>empty 4</p>;
      case 5:
        return <p>empty 5</p>;
      default:
        return <p>unknown step</p>;
    }
  };

  return (
    <div className="settings-page-right-section">
      <div className="settings-page-container">
        <SettingsNavbar setStepState={(val) => setStepState(val)} />
        <>{SettingsStepPage(state)}</>
      </div>
    </div>
  );
};

export default SettingsPage;
