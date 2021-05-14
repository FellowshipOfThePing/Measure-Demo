import React from "react";
import { FiChevronDown } from "react-icons/fi";

import "./Menu.css";

const MenuHeader = ({
  title,
  onClick,
  iconColor = "#597BF2",
  switchIcon = <FiChevronDown size={15} />,
  active = false,
}) => {
  return (
    <div
      onClick={onClick}
      className="menu-header"
      style={{
        backgroundColor: active ? "#F3F3F3" : null,
      }}
    >
      <div className="menu-header-icon-section">
        <span
          className="menu-header-icon"
          style={{ backgroundColor: iconColor }}
        >
          <span className="menu-header-icon-text">{title ? title[0] : "U"}</span>
        </span>
      </div>
      <div className="menu-header-text-section">
        <span className="menu-header-text">{title ? title : "My First Workspace"}</span>
      </div>
      <div className="menu-header-switch-icon-section">{switchIcon}</div>
    </div>
  );
};

export default MenuHeader;
