import React, { useRef } from "react";

import "./Modals.css";
import { useOutsideAlerter } from "../../../Hooks";
import { UpdateButton } from "..";

const DeleteWorkspaceModal = ({
  onClickDelete,
  setModalOpen,
  lastWorkspace = true,
}) => {
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    setModalOpen(false);
  });

  return (
    <div ref={modalRef} className="leave-modal-body">
      <span
        className="txt-1 font-medium-2 mb-2"
        style={{ textAlign: "center", lineHeight: "1.6", width: "300px" }}
      >
        {lastWorkspace
          ? "You must have at least 1 workspace at all times during the private alpha."
          : "Are you sure you want to delete this workspace?"}
      </span>
      {!lastWorkspace && (
        <div>
          <UpdateButton
            width="200px"
            height="35px"
            backgroundColor="#FF0000"
            borderColor="#FF0000"
            onClick={() => {
              onClickDelete();
              setModalOpen(false);
            }}
          >
            Confirm Leave Workspace
          </UpdateButton>
        </div>
      )}
    </div>
  );
};

export default DeleteWorkspaceModal;
