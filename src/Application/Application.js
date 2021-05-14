import React, { useState, useContext } from "react";
import { useHistory } from "react-router";

import "./CSS/application.css";
import Routes from "../Routes";
import ApplicationRoutes from "./ApplicationRoutes";
import { LoadingAnimation, Menu, GlobalModal } from "./Components";
import { GlobalFunctionsContext, GlobalStateContext } from "../Context";

const menuWidth = 200;

const Application = () => {
  const {
    workspaceName,
    screenLoading,
    remainingInvites,
    setRemainingInvites,
  } = useContext(GlobalStateContext);

  const { 
    createChannel, 
    createWorkspace, 
    switchWorkspaces, 
    inviteUser 
  } = useContext(GlobalFunctionsContext);

  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);
  const [createWorkspaceModalOpen, setCreateWorkspaceModalOpen] = useState(false);
  const [inviteTeammateModalOpen, setInviteTeammateModalOpen] = useState(false);
  const [confirmInviteModalOpen, setConfirmInviteModalOpen] = useState(false);
  const [nameFirstWorkspaceModalOpen, setNameFirstWorkspaceModalOpen] = useState(false);

  let history = useHistory();

  const onCreateChannel = ({ emoji, name, description }) => {
    let newChannelId = createChannel({
      icon: emoji,
      title: name,
      description: description,
    });
    setCreateChannelModalOpen(false);
    history.push(`${Routes.CHANNEL_PAGE}/${newChannelId}`);
  };

  const onCreateWorkspace = ({ name }) => {
    let newWorkspaceId = createWorkspace(name);
    switchWorkspaces(newWorkspaceId.toString());
    setCreateWorkspaceModalOpen(false);
  };

  const onInviteTeammate = ({ name }) => {
    inviteUser(name); // name is email here
    setInviteTeammateModalOpen(false);
    setRemainingInvites((arg) => arg - 1);
    setConfirmInviteModalOpen(true);
  };

  if (screenLoading) return <LoadingAnimation />;

  return (
    <div className="light-theme application-container">
      <Menu
        width={menuWidth}
        title={workspaceName}
        onClickAddChannel={() => setCreateChannelModalOpen(true)}
        onClickCreateWorkspace={() => setCreateWorkspaceModalOpen(true)}
        onClickInviteTeammate={() => setInviteTeammateModalOpen(true)}
      />
      <div
        className="main-view-container"
        style={{ width: `calc(100% - ${menuWidth}px)` }}
      >
        <ApplicationRoutes />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {createChannelModalOpen && (
          <GlobalModal
            setModalOpen={setCreateChannelModalOpen}
            modalTitle="Create a Channel"
            emojiPickerVisible
            nameFieldVisible
            nameFieldPlaceholder="Enter a name (Ex: Product)"
            descriptionFieldVisible
            descriptionFieldPlaceholder="Add a description (optional)"
            onSubmit={onCreateChannel}
            submitText="Create"
          />
        )}
        {createWorkspaceModalOpen && (
          <GlobalModal
            setModalOpen={setCreateWorkspaceModalOpen}
            modalTitle="Name your new workspace"
            nameFieldVisible
            nameFieldPlaceholder="Enter a name (Ex: Product Team)"
            footnote={`Note: New Workspace Creation is disabled in the demo`}
            directActiveToggle={false}
            onSubmit={onCreateWorkspace}
            submitText="Create"
          />
        )}
        {inviteTeammateModalOpen && (
          <GlobalModal
            setModalOpen={setInviteTeammateModalOpen}
            modalTitle="Invite a new teammate"
            nameFieldVisible
            nameFieldPlaceholder="buddy@pal.com"
            footnote={`Note: You have ${remainingInvites} remaining invites`}
            directActiveToggle={remainingInvites > 0}
            onSubmit={onInviteTeammate}
            submitText="Invite"
          />
        )}
        {confirmInviteModalOpen && (
          <GlobalModal
            setModalOpen={setConfirmInviteModalOpen}
            modalTitle="Your invite has been sent!"
            onSubmit={() => setConfirmInviteModalOpen(false)}
            submitText="Ok"
          />
        )}
        {nameFirstWorkspaceModalOpen && (
          <GlobalModal
            setModalOpen={setNameFirstWorkspaceModalOpen}
            modalTitle="Name your first workspace"
            nameFieldVisible
            nameFieldPlaceholder="Enter a name (Ex: My Team)"
            onSubmit={onCreateChannel}
            submitText="Create"
          />
        )}
      </div>
    </div>
  );
};
export default Application;
