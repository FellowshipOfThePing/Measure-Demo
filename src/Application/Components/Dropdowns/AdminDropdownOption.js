import React from "react";

import "./Dropdowns.css";

const DropdownOption = ({ icon, label, onClick }) => {
  return (
    <div onClick={onClick} className="admin-dropdown-option">
      {icon && <div className="admin-option-icon-container">{icon}</div>}
      <span className="admin-option-text">{label}</span>
    </div>
  );
};

export default DropdownOption;
