import React from "react";

import "../../CSS/syntax.css";
import "../../CSS/layout.css";
import "../../CSS/theme.css";
import "./Cards.css";
import DownloadButton from "../Buttons/DownloadButton";

const InvoiceCard = ({ price, date, plan }) => {
  return (
    <div className="invoice-card">
      <div className="price-section">
        <div className="info-text">${price}</div>
      </div>
      <div className="date-section">
        <div className="info-text">{date}</div>
      </div>
      <div className="plan-section">
        <div className="plan-text">{plan} Plan</div>
      </div>
      <div className="download-button-container">
        <DownloadButton />
      </div>
    </div>
  );
};

export default InvoiceCard;
