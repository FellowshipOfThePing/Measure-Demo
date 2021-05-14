import React from "react";
import { IoSearch } from "react-icons/io5";

import "./Buttons.css";

const SearchButton = ({ size = 20 }) => {
  return (
    <div
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      className="search-button"
    >
      <IoSearch color="#5D6168" size={size} />
    </div>
  );
};

export default SearchButton;
