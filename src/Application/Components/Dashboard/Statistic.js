import React from "react";

import "./Widget.css";

const Statistic = ({ title, subTitle, height, width }) => {
  return (
    <div className="statistic-container">
      <span className="statistic-title">{title}</span>
      {((height >= 110 && width > 210) || (height > 190 && width > 130)) && (
        <span className="statistic-subtitle">{subTitle}</span>
      )}
    </div>
  );
};

export default Statistic;
