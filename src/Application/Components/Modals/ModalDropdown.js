import { useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

import { useOutsideAlerter } from "../../../Hooks";

const DropdownOption = ({ icon, title, onClick }) => {
  return (
    <div onClick={onClick} className="dropdown-option">
      <span className="dropdown-option-icon">{icon}</span>
      <span className="dropdown-option-text">{title}</span>
    </div>
  );
};

const ModalDropdown = ({
  expanded,
  options,
  selectedIndex,
  onClick,
  onSelect,
  setOpen,
}) => {
  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, () => {
    setOpen(false);
  });

  return (
    <div ref={dropdownRef} className="modal-dropdown-container">
      <span className="dropdown-caption">Channel</span>
      <span onClick={onClick} className="dropdown-selection-container">
        <span style={{ paddingBottom: "2.8px" }}>
          <span className="selection-icon">{options[selectedIndex]?.icon}</span>
          <span className="selection-title">
            {options[selectedIndex]?.title || "Select a Channel"}
          </span>
        </span>
        <span
          style={{ paddingTop: "1px", height: "16px", lineHeight: "normal" }}
        >
          <FiChevronDown />
        </span>
      </span>
      {expanded && options.length > 0 && (
        <div className="dropdown-options-container">
          {options.map(({ icon, title }, index) => (
            <DropdownOption
              key={index}
              icon={icon}
              title={title}
              onClick={() => {
                onSelect(index);
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModalDropdown;
