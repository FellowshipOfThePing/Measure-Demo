import React from "react";
import { BiPlus } from "react-icons/bi";

import "./Menu.css";

const buttonSize = 16;

const ChannelSectionHeader = ({ title, onClickAddChannel }) => {
  return (
    <div className="channel-category-title-container">
      <span className="channel-category-title">WORKSPACE CHANNELS</span>
      <span
        className="add-channel-button"
        style={{ height: `${buttonSize}px`, width: `${buttonSize}px` }}
        onClick={onClickAddChannel}
      >
        <BiPlus color="#9b9b9b" size={buttonSize} />
      </span>
    </div>
  );
};

export default ChannelSectionHeader;
