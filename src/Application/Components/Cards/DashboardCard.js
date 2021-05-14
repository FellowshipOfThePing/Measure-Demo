import React, { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { HiPencil } from "react-icons/hi";

import "./Cards.css";

const buttonPadding = 8;
const iconSize = 20;

const DashboardCard = ({
  icon,
  title,
  color,
  onClick,
  onClickDelete,
  onClickEdit,
  addButton = false,
}) => {
  const [buttonsShowing, setButtonsShowing] = useState(false);

  const onMouseover = (e) => {
    setButtonsShowing(true);
  };

  const onMouseout = (e) => {
    setButtonsShowing(false);
  };

  return (
    <div
      className="dashboard-card-container"
      onMouseEnter={onMouseover}
      onMouseLeave={onMouseout}
    >
      {!addButton && buttonsShowing && (
        <>
          <span
            onClick={onClickDelete}
            style={{
              position: "absolute",
              top: `${buttonPadding}px`,
              left: `${buttonPadding}px`,
              cursor: "pointer",
            }}
          >
            <IoMdTrash color="#27282B" size={iconSize} />
          </span>
          <span
            onClick={onClickEdit}
            style={{
              position: "absolute",
              top: `${buttonPadding}px`,
              right: `${buttonPadding}px`,
              cursor: "pointer",
            }}
          >
            <HiPencil color="#27282B" size={iconSize} />
          </span>
        </>
      )}
      <div
        className="dashboard-card-body"
        style={{ backgroundColor: color }}
        onClick={onClick}
      >
        <span className="dashboard-card-icon">{icon}</span>
      </div>
      <div className="dashboard-card-footer">
        <span className="dashboard-card-title">{title}</span>
      </div>
    </div>
  );
};

export default DashboardCard;
