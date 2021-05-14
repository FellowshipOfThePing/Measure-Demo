import React from "react";
import { HiDownload } from "react-icons/hi";

import "./Buttons.css";

const DownloadButton = ({ size = 20, onClick }) => {
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
      <HiDownload className="txt-5" size={size} />
    </div>
  );
};

export default DownloadButton;
