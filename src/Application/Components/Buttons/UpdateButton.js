import React from "react";

import "../../CSS/syntax.css";
import "../../CSS/layout.css";
import "../../CSS/theme.css";
import "./Buttons.css";
import { LoadingAnimation } from "..";

const UpdateButton = ({
  onClick,
  width = "150px",
  height = "35px",
  children,
  backgroundColor = "#1f2023",
  borderColor = "#1f2023",
  loading = false,
  icon = null,
  style,
}) => {
  return (
    <>
      {!loading && (
        <div
          onClick={onClick}
          className="update-button"
          style={{
            ...style,
            width,
            height,
            backgroundColor,
            borderColor: borderColor,
          }}
        >
          {icon && (
            <span className="mr-25 d-flex align-items-center">{icon}</span>
          )}
          <p className="button-label">{children}</p>
        </div>
      )}
      {loading && (
        <LoadingAnimation
          height="37px"
          color="black"
          iconHeight={50}
          iconWidth={100}
        />
      )}
    </>
  );
};

export default UpdateButton;
