import { useRef } from "react";
import { useOutsideAlerter } from "../../../Hooks";

import "../Modals/Modals.css";

const ColorPicker = ({
  style,
  open,
  setOpen,
  chosenColor,
  onClick,
  options,
}) => {
  const pickerRef = useRef(null);
  useOutsideAlerter(pickerRef, () => {
    setOpen(false);
  });
  return (
    <div ref={pickerRef} style={style}>
      <span
        className="color-picker-button"
        style={{ backgroundColor: chosenColor }}
        onClick={() => setOpen(true)}
      ></span>
      {open && (
        <span className="color-picker-strip">
          {options.map((color, index) => (
            <span
              key={index}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => {
                onClick(color);
                setOpen(false);
              }}
            ></span>
          ))}
        </span>
      )}
    </div>
  );
};

export default ColorPicker;
