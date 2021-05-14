import React from "react";
import { BiCheck, BiPlus, BiSync } from "react-icons/bi";
import {
  AiOutlineExclamationCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";

import "./Cards.css";

const LinkedDataSourceCard = ({
  title,
  subtitle,
  cardIcon,
  status,
  link = "#",
  onClickWaiting,
}) => {
  return (
    <>
      {(status === "CONNECTED" || status === "SYNCING") && (
        <DataSourceCard
          title={title}
          subtitle={subtitle}
          cardIcon={cardIcon}
          status={status}
          link={link}
          cssTitle={
            status === "CONNECTED"
              ? `${title} has been successfully integrated`
              : `${title} is syncing`
          }
        />
      )}
      {(status === "FAILED" || status === "ADDABLE") && (
        <a href={link}>
          <DataSourceCard
            title={title}
            subtitle={subtitle}
            cardIcon={cardIcon}
            status={status}
            link={link}
            cssTitle={
              status === "FAILED"
                ? `An error occurred during ${title} integration. Click to try again.`
                : `Click to integrate ${title}`
            }
          />
        </a>
      )}
      {status === "WAITING" && (
        <div onClick={onClickWaiting}>
          <DataSourceCard
            title={title}
            subtitle={subtitle}
            cardIcon={cardIcon}
            status={status}
            link={link}
            onClick={onClickWaiting}
            cssTitle={`Click to finish integrating ${title}`}
          />
        </div>
      )}
    </>
  );
};

const DataSourceCard = ({ title, subtitle, cardIcon, status, cssTitle }) => {
  return (
    <div
      className="source-card"
      style={{ border: "0.5px solid #e4e4e4" }}
      title={cssTitle}
    >
      <div className="status-container">
        {status === "CONNECTED" && <BiCheck color="#2596FF" size={24} />}
        {status === "SYNCING" && <BiSync color="#7000FF" size={24} />}
        {status === "FAILED" && (
          <span style={{ cursor: "pointer", height: "20px" }}>
            <AiOutlineExclamationCircle color="#FF0000" size={20} />
          </span>
        )}
        {status === "WAITING" && (
          <span
            
            style={{ cursor: "pointer", height: "20px" }}
          >
            <AiOutlineQuestionCircle color="#2596FF" size={20} />
          </span>
        )}
        {status === "ADDABLE" && (
          <span style={{ cursor: "pointer", height: "20px" }}>
            <BiPlus color="#C2C2C2" size={20} />
          </span>
        )}
        {status === null && <span className="status-text">COMING SOON</span>}
      </div>
      <div className="icon-container">{cardIcon}</div>
      <div className="title-container">{title}</div>
      <div className="subtitle-container">{subtitle}</div>
    </div>
  );
};

export default LinkedDataSourceCard;
