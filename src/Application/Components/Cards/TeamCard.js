import React from "react";

import "../../CSS/syntax.css";
import "../../CSS/layout.css";
import "../../CSS/theme.css";
import "./Cards.css";
import { ProfilePic } from "..";

const TeamCard = ({
  profile_image,
  full_name,
  email,
  job_title,
  owner_status,
}) => {
  return (
    <div className="team-card">
      <div className="picture-container">
        <ProfilePic
          size={40}
          defaultLetter={full_name[0]}
          image={profile_image}
        />
      </div>
      <div className="info-container">
        <div className="info-section">
          <div className="name-text">{full_name}</div>
        </div>
        <div className="email-section">
          <div className="info-text">{email}</div>
        </div>
        <div className="info-section">
          <div className="info-text">{job_title}</div>
        </div>
        <div className="info-section">
          <div className="info-text">
            {owner_status ? "Workspace Owner" : "Workspace Member"}
          </div>
        </div>
        <span className="info-fade" />
      </div>
    </div>
  );
};

export default TeamCard;
