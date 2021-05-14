import React from "react";

import { CommitButton, SettingsInputField } from "..";
import "../../CSS/syntax.css";
import "../../CSS/layout.css";
import "../../CSS/theme.css";
import "./SettingsInput.css";

const SettingsInputSection = ({
  label,
  name,
  onChange,
  value,
  changeLabel,
  changed,
  onClickCommit,
  labelWidth = "80px",
  labelMinWidth = "80px",
  frozen = false,
  loading,
  error
}) => {
  const onEnterPressed = (e) => {
    if (e.key === "Enter") {
      onClickCommit();
    }
  };

  return (
    <div className="settings-input-section">
      <div className="label-container" style={{ width: labelWidth, minWidth: labelMinWidth }}>
        <small
          className="txt-1 text-bold-700 pr-1"
          style={{ whiteSpace: "nowrap" }}
        >
          {label}
        </small>
      </div>
      <SettingsInputField
        name={name}
        onChange={onChange}
        value={value}
        readonly={frozen}
        error={error}
        onKeyDown={onEnterPressed}
      />
      {!frozen && (
        <div className="h-100 d-flex align-items-center pl-75">
          <CommitButton
            label={changeLabel}
            active={changed}
            onClick={changed ? onClickCommit : null}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default SettingsInputSection;
