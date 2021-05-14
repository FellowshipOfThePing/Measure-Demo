import React from "react";

import "./SearchBar.css";
import { SearchButton } from "..";

const SearchBar = ({ name, onChange, value }) => {
  return (
    <div className="search-bar">
      <div className="search-button-container">
        <SearchButton size={20} />
      </div>
      <input
        className="search-field"
        type="text"
        placeholder={name}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchBar;
