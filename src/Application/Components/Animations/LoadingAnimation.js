import React from "react";
import Lottie from "react-lottie";

import loadingBars0 from "../../../Assets/Animations/loadingBars0.json";
import loadingBars1 from "../../../Assets/Animations/loadingBars1.json";
import loadingBars2 from "../../../Assets/Animations/loadingBars2.json";
import loadingBars3 from "../../../Assets/Animations/loadingBars3.json";
import loadingBars4 from "../../../Assets/Animations/loadingBars4.json";
import loadingBars5 from "../../../Assets/Animations/loadingBars5.json";
import loadingBars6 from "../../../Assets/Animations/loadingBars6.json";
import loadingBars7 from "../../../Assets/Animations/loadingBars7.json";

const animations = {
  black: loadingBars0,
  purple: loadingBars0,
  "#98DAFF": loadingBars1,
  "#9CB8FF": loadingBars2,
  "#C2AAF3": loadingBars3,
  "#FF98BD": loadingBars4,
  "#FFC998": loadingBars5,
  "#FFF59C": loadingBars6,
  "#F3D6AA": loadingBars7,
};

const LoadingAnimation = ({
  color = "black",
  width = "100%",
  height = "100vh",
  iconHeight = 500,
  iconWidth = 500,
  style,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animations[color],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height,
        width,
        ...style,
      }}
    >
      <Lottie options={defaultOptions} height={iconHeight} width={iconWidth} />
    </div>
  );
};

export default LoadingAnimation;
