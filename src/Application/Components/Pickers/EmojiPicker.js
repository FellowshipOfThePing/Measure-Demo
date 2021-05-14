import { useRef } from "react";
import data from "emoji-mart/data/apple.json";
import { NimblePicker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import "./Pickers.css";
import { useOutsideAlerter } from "../../../Hooks";

const defaultPickerStyle = {
  position: "absolute",
  top: "35px",
  right: "0px",
  zIndex: "1000",
};

const EmojiPicker = ({
  open,
  setOpen,
  onClick,
  chosenEmoji,
  style,
  buttonSize = 16,
  pickerStyle = defaultPickerStyle,
}) => {
  const pickerRef = useRef(null);
  useOutsideAlerter(pickerRef, () => {
    setOpen(false);
  });

  return (
    <span ref={pickerRef} style={style}>
      {open && (
        <NimblePicker
          data={data}
          onSelect={(emoji) => {
            onClick(emoji);
            setOpen(false);
          }}
          style={pickerStyle}
          emoji="bar_chart"
          emojiSize={22}
          perLine={7}
          showPreview={false}
          showSkinTones={false}
          title=""
        />
      )}
      <span
        className="emoji-picker-button"
        style={{ fontSize: `${buttonSize}px` }}
        onClick={() => setOpen(true)}
      >
        {chosenEmoji}
      </span>
    </span>
  );
};

export default EmojiPicker;
