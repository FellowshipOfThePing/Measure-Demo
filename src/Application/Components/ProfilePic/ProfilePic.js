import React from "react";

import "./ProfilePic.css";

const ProfilePic = ({
  image,
  defaultLetter,
  onClick,
  size = 45,
  workspace = false,
  inputId = null,
}) => {
  return (
    <div
      className="profile-pic"
      onClick={onClick}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        minWidth: `${size}px`,
        borderRadius: workspace ? "20%" : "50%",
      }}
    >
      <label
        htmlFor={inputId}
        style={{
          height: `${size + 1}px`,
          width: `${size}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {image && (
          <img
            src={image}
            alt=""
            height={size}
            width={size}
            style={{ objectFit: "cover", pointerEvents: "none" }}
          />
        )}
        {!image && (
          <div
            style={{
              height: `${size + 1}px`,
              width: `${size + 1}px`,
              backgroundColor: "#597BF2",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <small
              className="text-bold-500"
              style={{ fontSize: size * 0.55, color: "white" }}
            >
              {defaultLetter.toUpperCase()}
            </small>
          </div>
        )}
      </label>
    </div>
  );
};

export default ProfilePic;
