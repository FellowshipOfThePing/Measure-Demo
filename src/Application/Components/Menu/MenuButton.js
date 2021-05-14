import React from "react";

const MenuButton = ({ icon, title, onClick, active = false }) => {
  return (
    <div
      onClick={onClick}
      className="menu-button"
      style={{ backgroundColor: active ? "#F3F3F3" : null }}
    >
      <div className="menu-button-icon-section">
        <span className="menu-button-icon">{icon}</span>
      </div>
      <div className="menu-button-text-section">
        <span className="menu-button-text">{title}</span>
      </div>
    </div>
  );
};

export default MenuButton;
