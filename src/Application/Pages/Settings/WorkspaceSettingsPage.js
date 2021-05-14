import React, { useContext, useState } from "react";

import "./Settings.css";
import "../../CSS/syntax.css";
import "../../CSS/layout.css";
import "../../CSS/theme.css";
import { GlobalFunctionsContext, GlobalStateContext } from "../../../Context";
import { ProfilePic, TeamCard, SettingsInputSection } from "../../Components";

const WorkspaceSettingsPage = () => {
  const { userId, ownerStatus, workspaceName, team, workspaceImage, jobTitle } = useContext(GlobalStateContext);
  const { updateWorkspaceName, updateJobTitle } = useContext(GlobalFunctionsContext);

  const [newWorkspaceName, setNewWorkspaceName] = useState(workspaceName);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [newJobTitle, setNewJobTitle] = useState(jobTitle);
  const [jobTitleErrorMessage, setJobTitleErrorMessage] = useState("");

  const onChangeWorkspaceName = () => {
    setNameErrorMessage("");
    setJobTitleErrorMessage("");
    if (newWorkspaceName === workspaceName || newWorkspaceName === "") {
      return;
    }
    updateWorkspaceName(newWorkspaceName);
  };

  const onChangeJobTitle = () => {
    setNameErrorMessage("");
    setJobTitleErrorMessage("");
    if (newJobTitle === jobTitle || newJobTitle === "") {
      return;
    }
    updateJobTitle(newJobTitle);
  };

  return (
    <div className="workspace-settings-page h-100">
      <div className="personal-info-section pt-2 pb-3">
        <div className="profile-picture-section pb-2">
          <small className="txt-1 text-bold-700 pr-2">Workspace Picture</small>
          <ProfilePic
            defaultLetter={workspaceName[0]}
            image={workspaceImage}
            inputId="workspace"
            workspace
            changeable
          />
        </div>
        <div className="mb-2 pt-50">
          <SettingsInputSection
            label="Workspace Name"
            labelWidth="128px"
            labelMinWidth="128px"
            changeLabel="UPDATE"
            name="Workspace Name"
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            value={newWorkspaceName}
            changed={newWorkspaceName !== workspaceName}
            onClickCommit={onChangeWorkspaceName}
            frozen={!ownerStatus}
            error={nameErrorMessage}
          />
        </div>
        <div className="mt-50">
          <SettingsInputSection
            label="My Role"
            labelWidth="128px"
            labelMinWidth="128px"
            changeLabel="UPDATE"
            name="Role"
            onChange={(e) => setNewJobTitle(e.target.value)}
            value={newJobTitle}
            changed={newJobTitle !== jobTitle}
            onClickCommit={onChangeJobTitle}
            error={jobTitleErrorMessage}
          />
        </div>
      </div>
      <div className="members-section settings-bottom-border pt-2 pb-3">
        <div className="members-section-title pb-1 pt-50">
          <small className="txt-1 text-bold-700">Workspace Members</small>
        </div>
        {team?.map((props, index) => (
          <div key={index} className="py-75">
            <TeamCard
              {...props}
              displayButton={ownerStatus === 1 && props.user_id !== userId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceSettingsPage;
