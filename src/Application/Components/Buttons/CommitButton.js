import React from "react";
import Lottie from "react-lottie";

import loadingAnimation from "../../../Assets/Animations/squaresLoading.json";
import "./Buttons.css";
import "../../CSS/syntax.css";
import "../../CSS/layout.css";
import "../../CSS/theme.css";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const CommitButton = ({
  active = true,
  label,
  onClick,
  activeColor = "#0094FF",
  loading = false,
}) => {
  return (
    <>
      {!loading && (
        <small
          onClick={onClick}
          className="commit-button text-bold-500"
          style={{
            color: active ? activeColor : "#838383",
            cursor: active ? "pointer" : null,
          }}
        >
          {label}
        </small>
      )}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
            width: "100%",
          }}
        >
          <Lottie options={defaultOptions} height={100} width={50} />
        </div>
      )}
    </>
  );
};

export default CommitButton;
