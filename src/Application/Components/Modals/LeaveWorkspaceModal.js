import React, { useRef } from "react";

import useOutsideAlerter from "../../../Hooks/useOutsideAlerter";
import { UpdateButton } from "..";
import "./Modals.css";

const LeaveWorkspaceModal = ({
  onClickLeave,
  setModalOpen,
  loading,
  workspaceName,
}) => {
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    setModalOpen(false);
  });

  return (
    <div ref={modalRef} className="leave-modal-body">
      <span
        className="txt-1 font-medium-2 mb-2"
        style={{ textAlign: "center", lineHeight: "1.6" }}
      >
        Are you sure you want to leave the {workspaceName} workspace?
      </span>
      <div>
        <UpdateButton
          width="200px"
          height="35px"
          backgroundColor="#FF0000"
          borderColor="#FF0000"
          onClick={onClickLeave}
          loading={loading}
        >
          Confirm Leave Workspace
        </UpdateButton>
      </div>
    </div>
  );
};

export default LeaveWorkspaceModal;
