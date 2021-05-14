import React, { useRef } from "react";

import "./SettingsInput.css";
import "../../CSS/syntax.css";
import "../../CSS/layout.css";
import "../../CSS/theme.css";

const SettingsInputField = ({
  name,
  onChange,
  value,
  type = "text",
  readonly = false,
  error = "",
  onKeyDown,
  onBlur,
  width = "350px",
}) => {
  let inputRef = useRef(null);
  const blurOnEnter = (e) => {
    if (e.key === "Enter") {
      inputRef.current.blur();
    }
  };

  return (
    <div style={{ position: "relative", width }}>
      <div className="settings-input-field-container pl-75">
        <input
          ref={inputRef}
          className="settings-input-field"
          type={type}
          placeholder={name}
          name={name}
          onChange={onChange}
          value={value}
          readOnly={readonly}
          onKeyDown={(e) => {
            blurOnEnter(e);
            if (onKeyDown) {
              onKeyDown(e);
            }
          }}
          onBlur={onBlur}
        />
      </div>
      <span className="settings-input-field-error">{error}</span>
    </div>
  );
};

export default SettingsInputField;
