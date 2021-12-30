import React from "react";
import Switch from "react-switch";
import "./styles.scss";

const ModeSwitch = ({ theme }) => (
  <label className="switch-toggle" htmlFor="icon-switch">
    <Switch
      uncheckedIcon={
        <div className="icon uncheckedIcon">
          <span role="img" aria-label="dark-mode__moon">
            🌙
          </span>
        </div>
      }
      onChange={() =>
        theme.updateTheme(theme.name === "dark" ? "light" : "dark")
      }
      checked={theme.name === "light"}
      offColor={"#000000"}
      offHandleColor={"#292e2e"}
      onColor={"#4fa6a1"}
      // onHandleColor={"#282c35"}
      // disabled
    />
  </label>
);
export default ModeSwitch;
