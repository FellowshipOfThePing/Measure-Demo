import React, { useRef } from "react";

import useOutsideAlerter from "../../../Hooks/useOutsideAlerter";
import { UpdateButton } from "..";
import "./Modals.css";

const RemoveMemberModal = ({
  onClickRemove,
  setModalOpen,
  loading,
  memberName,
  memberId,
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
        Are you sure you want to remove {memberName} from this workspace?
      </span>
      <div>
        <UpdateButton
          width="200px"
          height="35px"
          backgroundColor="#FF0000"
          borderColor="#FF0000"
          onClick={() => onClickRemove(memberId)}
          loading={loading}
        >
          Confirm Remove Teammate
        </UpdateButton>
        <UpdateButton
          width="200px"
          height="35px"
          borderColor="3c3f44"
          onClick={() => setModalOpen(false)}
        >
          Nevermind
        </UpdateButton>
      </div>
    </div>
  );
};

export default RemoveMemberModal;
