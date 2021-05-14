import React from "react";

import "../../CSS/syntax.css";
import "../../CSS/layout.css";
import "../../CSS/theme.css";
import "./SettingsInput.css";
import { CommitButton, UpdateButton } from "..";

const SettingsChangeSection = ({
  label,
  buttonLabel,
  currentValue,
  children,
  onClickUpdate,
  openState,
  onClickCommit,
  loading,
}) => {
  return (
    <div>
      <div className="settings-input-section">
        <div className="label-container" style={{ minWidth: "80px" }}>
          <small className="txt-1 text-bold-700">{label}</small>
        </div>
        <div className="h-100 pr-50 d-flex align-items-center">
          <span className="txt-1 font-small-1">{currentValue}</span>
        </div>
        <div
          style={{ width: "56px" }}
          className="d-flex justify-content-center align-items-center pl-75"
        >
          <CommitButton
            label={openState ? "HIDE" : "CHANGE"}
            onClick={onClickCommit}
            loading={loading}
          />
        </div>
      </div>
      {openState && (
        <div className="open-section">
          <div className="settings-input-section my-75">{children}</div>
          <div className="pt-75">
            <UpdateButton borderColor="#3c3f44" onClick={onClickUpdate}>
              {buttonLabel}
            </UpdateButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsChangeSection;
