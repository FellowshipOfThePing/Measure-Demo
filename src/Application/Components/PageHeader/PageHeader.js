import React, { useRef, useState } from "react";

import { EmojiPicker } from "..";
import "./PageHeader.css";

const trashIconWidth = 22;

const PageHeader = ({
  height,
  marginBottom,
  emoji,
  onClickEmoji,
  title,
  setTitle,
  onTitleEnter,
  description,
  setDescription,
  onDescriptionEnter,
  leftChildren,
  rightChildren,
  descriptionVisible,
  substituteIcon = false,
  readOnly,
}) => {
  const [titleEmojiPickerOpen, setTitleEmojiPickerOpen] = useState(false);
  let titleRef = useRef(null);
  let descriptionRef = useRef(null);

  const titleKeyDown = (e) => {
    if (e.key === "Enter") {
      titleRef.current.blur();
      onTitleEnter();
    }
  };

  const descriptionKeyDown = (e) => {
    if (e.key === "Enter") {
      descriptionRef.current.blur();
      onDescriptionEnter();
    }
  };

  return (
    <div className="page-header" style={{ marginBottom: `${marginBottom}px` }}>
      <div
        className="header-title-section"
        style={{ height: `${height / 2}px` }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: `calc(100% - ${trashIconWidth}px`,
          }}
        >
          {substituteIcon ? (
            substituteIcon
          ) : (
            <EmojiPicker
              open={titleEmojiPickerOpen}
              setOpen={setTitleEmojiPickerOpen}
              chosenEmoji={emoji}
              onClick={onClickEmoji}
              pickerStyle={{
                position: "absolute",
                zIndex: "1000",
                top: "50px",
              }}
            />
          )}
          {readOnly && <div className="header-title">{title}</div>}
          {!readOnly && (
            <input
              ref={titleRef}
              type="text"
              className="header-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", minWidth: "50px" }}
              onKeyDown={(e) => titleKeyDown(e)}
            />
          )}
          {leftChildren}
        </div>
        {rightChildren}
      </div>
      {descriptionVisible && (
        <div
          className="header-description-section"
          style={{ height: `${height / 2}px` }}
        >
          <input
            ref={descriptionRef}
            type="text"
            className="header-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", minWidth: "50px" }}
            onKeyDown={(e) => descriptionKeyDown(e)}
            readOnly={readOnly}
          />
        </div>
      )}
    </div>
  );
};

export default PageHeader;
