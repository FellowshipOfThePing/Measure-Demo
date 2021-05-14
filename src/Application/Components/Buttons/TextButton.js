import React from "react";

import "../../CSS/syntax.css";
import "../../CSS/layout.css";
import "../../CSS/theme.css";
import "./Buttons.css";

const TextButton = ({ onClick, children, icon = null, color }) => {
  return (
    <p onClick={onClick} className="text-button">
      <span
        className="button-label text-bold-400 font-small-3"
        style={{ color }}
      >
        {children}
      </span>
      {icon && <span className="ml-25 d-flex align-items-center">{icon}</span>}
    </p>
  );
};

export default TextButton;
