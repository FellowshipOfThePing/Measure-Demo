import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

import "./Buttons.css";

const EllipsisButton = ({ size = 20, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: `${size / 2}px`,
      }}
      className="button-hover"
    >
      <IoEllipsisHorizontal className="txt-5" size={size} />
    </div>
  );
};

export default EllipsisButton;
