import React, { useRef, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { useOutsideAlerter } from "../../../Hooks";
import "./Dropdowns.css";

const DataDropdown = ({
  options,
  selected = "Select",
  setSelected,
  selectedTitle,
  setSelectedTitle,
}) => {
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, () => {
    setExpanded(false);
  });

  return (
    <div
      ref={dropdownRef}
      style={{
        height: "37px",
        width: "100%",
        overflow: "visible",
        zIndex: expanded ? "9999" : "1000",
      }}
    >
      <div className="data-dropdown-container">
        <div
          className="data-dropdown-cell"
          onClick={() => setExpanded((arg) => !arg)}
        >
          <span className="pl-1 txt-2 font-small-2">{selectedTitle}</span>
          {!expanded && <BiChevronDown className="txt-2 mr-50" />}
          {expanded && <BiChevronUp className="txt-2 mr-50" />}
        </div>
        {expanded && options.length > 1 && (
          <>
            {options
              .filter(
                (option) => option[1] !== selected && option[1] !== "Select"
              )
              .map((option, index) => (
                <div
                  key={index}
                  className="data-dropdown-cell"
                  onClick={() => {
                    setSelected(option[0]);
                    setSelectedTitle(option[1]);
                    setExpanded(false);
                  }}
                >
                  <span className="pl-1 txt-2 font-small-2">{option[1]}</span>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default DataDropdown;
