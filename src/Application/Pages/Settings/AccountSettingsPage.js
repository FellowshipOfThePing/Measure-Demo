import React, { useContext, useState } from "react";

import "./Settings.css";
import {
  CommitButton,
  ProfilePic,
  SettingsChangeSection,
  SettingsInputField,
  SettingsInputSection,
} from "../../Components";
import { GlobalFunctionsContext, GlobalStateContext } from "../../../Context";

const AccountSettingsPage = () => {
  const { profileImage, userName, userEmail } = useContext(GlobalStateContext);
  const { logOut, updateUserName } = useContext(GlobalFunctionsContext);

  const [newFullName, setNewFullName] = useState(userName);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("Email update disabled for demo");
  const [emailFieldsOpen, setEmailFieldsOpen] = useState(false);

  const [emailCode, setEmailCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeErrorMessage, setCodeErrorMessage] = useState("Email update disabled for demo");

  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("Password update disabled for demo");
  const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] = useState("");

  const [passwordFieldsOpen, setPasswordFieldsOpen] = useState(false);

  const onUpdateName = () => {
    if (newFullName !== userName) {
      setNameErrorMessage("");
      updateUserName(newFullName);
    }
  };

  const onClickEmailUpdate = () => {
    if (!codeSent) {
      if (newEmail === "") {
        setEmailErrorMessage("Please enter valid email");
        return;
      }
      sendEmailCode();
    } else {
      verifyEmail();
    }
  };

  const sendEmailCode = () => {
    setEmailErrorMessage("Email update disabled for demo");
    setCodeSent(true);
  };

  const verifyEmail = () => {
    setCodeErrorMessage("");
    setCodeSent(false);
    setEmailFieldsOpen(false);
    setNewEmail("");
    setEmailCode("");
  };

  const changePassword = () => {
    setPasswordErrorMessage("");
    setCurrentPasswordErrorMessage("");
    if (newPassword === "" || currentPassword === "") {
      return;
    }
    setPasswordFieldsOpen(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="account-settings-page">
      <div className="personal-info-section pt-2 pb-3">
        <div className="profile-picture-section pb-2">
          <small className="txt-1 text-bold-700 pr-2">Profile Picture</small>
          <ProfilePic
            defaultLetter={userName[0]}
            image={profileImage}
            inputId="profile"
            changeable
          />
        </div>
        <div className="pt-50">
          <SettingsInputSection
            label="Full Name"
            changeLabel="UPDATE"
            name="Full Name"
            onChange={(e) => setNewFullName(e.target.value)}
            value={newFullName}
            changed={newFullName !== userName}
            onClickCommit={onUpdateName}
            error={nameErrorMessage}
          />
        </div>
      </div>
      <div className="account-info-section pt-2 pb-3">
        <div className="pb-2">
          <SettingsChangeSection
            label="Email"
            buttonLabel={codeSent ? "Verify Email" : "Send Code"}
            currentValue={userEmail}
            onClickUpdate={onClickEmailUpdate}
            openState={emailFieldsOpen}
            onClickCommit={() => {
              setEmailFieldsOpen((arg) => !arg);
              setEmailErrorMessage("");
              setCodeErrorMessage("");
            }}
          >
            <div className="pr-1">
              <SettingsInputField
                name="New email address"
                type="email"
                onChange={(e) => setNewEmail(e.target.value)}
                value={newEmail}
                error={emailErrorMessage}
              />
            </div>
            {codeSent && (
              <SettingsInputField
                name="Verify email code"
                onChange={(e) => setEmailCode(e.target.value)}
                value={emailCode}
                error={codeErrorMessage}
              />
            )}
          </SettingsChangeSection>
        </div>
        <div className="pt-50">
          <SettingsChangeSection
            label="Password"
            buttonLabel="Update Password"
            currentValue={"•••••••••••••"}
            onClickUpdate={changePassword}
            openState={passwordFieldsOpen}
            onClickCommit={() => {
              setPasswordFieldsOpen((arg) => !arg);
              setPasswordErrorMessage("");
              setCurrentPasswordErrorMessage("");
            }}
          >
            <div className="pr-1">
              <SettingsInputField
                name="New password"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                error={passwordErrorMessage}
              />
            </div>
            <SettingsInputField
              name="Current password"
              type="password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              value={currentPassword}
              error={currentPasswordErrorMessage}
            />
          </SettingsChangeSection>
        </div>
      </div>
      <div
        className="py-1 d-flex justify-content-between"
        style={{ flexDirection: "row" }}
      >
        <CommitButton label="LOG OUT" activeColor="#FF0000" onClick={logOut} />
      </div>
    </div>
  );
};

export default AccountSettingsPage;
