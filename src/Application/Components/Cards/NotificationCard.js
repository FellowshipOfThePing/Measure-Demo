import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

import "./Cards.css";
import { BrandIcons20 } from "../Icons/BrandIcons";

const NotificationCard = ({ brand, status, setOpen }) => {
  const [closeShowing, setCloseShowing] = useState(false);

  const onMouseEnter = (e) => {
    setCloseShowing(true);
  };

  const onMouseLeave = (e) => {
    setCloseShowing(false);
  };

  return (
    <div
      className="notif-card-container"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="notif-icon-container">
        {BrandIcons20[brand.toLowerCase()]}
      </span>
      <span className="notif-title-container">
        {brand} is {status}
      </span>
      <span
        className="notif-icon-container"
        style={{ justifySelf: "flex-end" }}
      >
        {closeShowing && (
          <IoClose
            color="#BCBCBC"
            size={22}
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
          />
        )}
      </span>
    </div>
  );
};

export default NotificationCard;
