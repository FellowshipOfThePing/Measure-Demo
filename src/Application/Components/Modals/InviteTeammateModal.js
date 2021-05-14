import React, { useRef, useState } from "react";

import "./Modals.css";
import { UpdateButton } from "..";
import useOutsideAlerter from "../../../Hooks/useOutsideAlerter";
import SettingsInputField from "../SettingsInput/SettingsInputField";


const InviteTeammateModal = ({
  onClickInvite,
  setInviteModalOpen,
  inviteLoading,
}) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    setInviteModalOpen(false);
  });

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickInvite(inviteEmail);
    } else if (e.key === "Escape") {
      setInviteModalOpen(false);
    }
  };

  return (
    <div ref={modalRef} className="invite-modal-body">
      <span className="txt-1 font-medium-2 my-2">Invite Team Member</span>

      <SettingsInputField
        name="name@example.com"
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
        type="email"
        onKeyDown={onKeyDown}
      />
      <div className="mt-2">
        <UpdateButton
          width="200px"
          height="35px"
          borderColor="3c3f44"
          onClick={() => onClickInvite(inviteEmail)}
          loading={inviteLoading}
        >
          Invite Team Member
        </UpdateButton>
      </div>
    </div>
  );
};

export default InviteTeammateModal;
