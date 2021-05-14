import React, { useRef } from "react";
import { useOutsideAlerter } from "../../../Hooks";
import "./Dropdowns.css";

const AdminDropdown = ({ children, setDropdownOpen }) => {
  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, () => {
    setDropdownOpen(false);
  });
  return (
    <div ref={dropdownRef} className="admin-dropdown-body">
      {children}
    </div>
  );
};

export default AdminDropdown;
