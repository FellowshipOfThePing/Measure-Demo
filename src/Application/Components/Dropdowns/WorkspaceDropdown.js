import React, { useContext, useRef } from "react";
import { BiCheck } from "react-icons/bi";
import { useHistory } from "react-router";

import "./Dropdowns.css";
import Routes from "../../../Routes";
import { MenuHeader } from "..";
import { useOutsideAlerter } from "../../../Hooks";
import { GlobalFunctionsContext, GlobalStateContext } from "../../../Context";

const menuWidth = 215;
const CheckIcon = () => <BiCheck color="#5C80FF" size={25} />;
const JoinIcon = () => (
  <span
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontFamily: "Inter",
      fontWeight: "700",
      fontStyle: "normal",
      fontSize: "9px",
      color: "#5C80FF",
    }}
  >
    JOIN
  </span>
);

const WorkspaceDropdown = ({
  setDropdownOpen,
  onClickCreateWorkspace,
  onClickInviteTeammate,
}) => {
  const { userEmail, currentWorkspaceId, workspaceIds, canInvite } =
    useContext(GlobalStateContext);
  const { switchWorkspaces, changeJoinedInWorkspaces } = useContext(
    GlobalFunctionsContext
  );

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setDropdownOpen(false);
  });
  let history = useHistory();

  const onSwitchWorkspaces = (id, joined) => {
    if (id.toString() !== currentWorkspaceId.toString()) {
      switchWorkspaces(id);
      if (joined === 0) {
        changeJoinedInWorkspaces(id);
      }
      setDropdownOpen(false);
    }
  };

  const onClickWorkspaceSettings = () => {
    setDropdownOpen(false);
    history.push(Routes.WORKSPACE_SETTINGS_PAGE);
  };

  const onClickLogOut = () => {
    setDropdownOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className="workspace-dropdown-container"
      style={{ width: `${menuWidth}px` }}
    >
      <div className="dropdown-email-container">
        <p className="dropdown-email">{userEmail}</p>
      </div>
      <div className="workspace-buttons-container">
        {workspaceIds.map(({ workspace_id, workspace_name, joined }, index) => (
          <MenuHeader
            key={index}
            title={workspace_name}
            onClick={() => onSwitchWorkspaces(workspace_id, joined)}
            width={menuWidth * 0.9}
            switchIcon={
              workspace_id.toString() === currentWorkspaceId.toString() ? (
                <CheckIcon />
              ) : joined === 0 ? (
                <JoinIcon />
              ) : null
            }
          />
        ))}
      </div>
      <div className="dropdown-options-container">
        {canInvite && (
          <div
            className="dropdown-option"
            onClick={() => {
              onClickInviteTeammate();
              setDropdownOpen(false);
            }}
          >
            <span className="dropdown-option-text">Invite Team Member</span>
          </div>
        )}
        <div className="dropdown-option" onClick={onClickWorkspaceSettings}>
          <span className="dropdown-option-text">Workspace Settings</span>
        </div>
        <div
          className="dropdown-option"
          onClick={() => {
            onClickCreateWorkspace();
            setDropdownOpen(false);
          }}
        >
          <span className="dropdown-option-text">Create a Workspace</span>
        </div>
        <div className="dropdown-option" onClick={onClickLogOut}>
          <span className="dropdown-option-text">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDropdown;
