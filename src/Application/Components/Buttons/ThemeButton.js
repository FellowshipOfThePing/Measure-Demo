import React from "react";
import { BiSun, BiMoon } from "react-icons/bi";

import "../../CSS/syntax.css";
import "../../CSS/layout.css";
import "../../CSS/theme.css";
import "./Buttons.css";

const ThemeButton = ({ onClick, theme, mode }) => {
  return (
    <>
      {mode === "light" && (
        <div
          onClick={onClick}
          className="theme-button"
          style={{
            backgroundColor: theme === "light" ? "#DDDDDD" : "transparent",
          }}
        >
          <BiSun size="20px" className="txt-1" />
        </div>
      )}
      {mode === "dark" && (
        <div
          onClick={onClick}
          className="theme-button"
          style={{
            border:
              theme === "dark" ? "1px solid #ffffff" : "1px solid transparent",
          }}
        >
          <BiMoon size="20px" className="txt-1" />
        </div>
      )}
    </>
  );
};

export default ThemeButton;
