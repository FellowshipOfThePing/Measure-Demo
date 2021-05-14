import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

import { useOutsideAlerter } from "../../../Hooks";
import { GlobalButton } from "../Buttons";
import ColorPicker from "../Pickers/ColorPicker";
import EmojiPicker from "../Pickers/EmojiPicker";
import ModalDropdown from "./ModalDropdown";
import ModalInputField from "./ModalInputField";
import "./Modals.css";

const colorOptions = [
  "#FFCDD9",
  "#FFEBCD",
  "#FFF7CD",
  "#CDFFD5",
  "#CDEDFF",
  "#D4CDFF",
  "#FFCDFD",
];

const GlobalModal = ({
  setModalOpen,
  modalTitle = "",
  modalSubtitle = "",
  subtitleVisible = false,
  emojiPickerVisible = false,
  currentEmoji = "📊",
  nameFieldVisible = false,
  currentName = "",
  nameFieldPlaceholder = "",
  colorPickerVisible = false,
  currentColor = "#FFCDD9",
  descriptionFieldVisible = false,
  currentDescription = "",
  descriptionFieldPlaceholder = "",
  dropdownVisible = false,
  currentDropdownIndex = 0,
  dropdownOptions = [],
  submitColor = "#615efb",
  submitText = "Save",
  keepModalOpen = false,
  onSubmit = () => {},
  loading = false,
  footnote = null,
  directActiveToggle = true,
}) => {
  const [chosenName, setChosenName] = useState(currentName);
  const [chosenDescription, setChosenDescription] = useState(
    currentDescription
  );
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(currentEmoji);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [chosenColor, setChosenColor] = useState(currentColor);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedChannelIndex, setSelectedChannelIndex] = useState(
    currentDropdownIndex
  );

  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    setModalOpen(false);
  });

  const onClickSubmit = () => {
    let args = {};
    if (emojiPickerVisible) {
      args.emoji = chosenEmoji;
    }
    if (nameFieldVisible) {
      args.name = chosenName;
      if (chosenName === "") {
        return;
      }
    }
    if (colorPickerVisible) {
      args.color = chosenColor;
    }
    if (descriptionFieldVisible) {
      args.description = chosenDescription;
    }
    if (dropdownVisible) {
      args.dropdownSelection = dropdownOptions[selectedChannelIndex];
      if (args.dropdownSelection === undefined) {
        args.dropdownSelection = { channelId: "" };
      }
    }
    if (!keepModalOpen) {
      setModalOpen(false);
    }
    onSubmit(args);
  };

  return (
    <div ref={modalRef} className="global-modal-container">
      <span className="modal-exit-button" onClick={() => setModalOpen(false)}>
        <IoClose color="#BCBCBC" size={18} />
      </span>
      <span className="modal-title">{modalTitle}</span>
      {subtitleVisible && (
        <span className="modal-subtitle">{modalSubtitle}</span>
      )}
      {(emojiPickerVisible || nameFieldVisible || colorPickerVisible) && (
        <div className="modal-input-section">
          {emojiPickerVisible && (
            <EmojiPicker
              open={emojiPickerOpen}
              setOpen={setEmojiPickerOpen}
              onClick={(emoji) => setChosenEmoji(emoji.native)}
              chosenEmoji={chosenEmoji}
              style={{ position: "absolute", left: "-30px", top: "4px" }}
            />
          )}
          {nameFieldVisible && (
            <ModalInputField
              value={chosenName}
              onChange={(e) => setChosenName(e.target.value)}
              name={nameFieldPlaceholder}
            />
          )}
          {colorPickerVisible && (
            <ColorPicker
              style={{ position: "absolute", right: "-10px", top: "6px" }}
              open={colorPickerOpen}
              setOpen={setColorPickerOpen}
              chosenColor={chosenColor}
              onClick={(color) => setChosenColor(color)}
              options={colorOptions}
            />
          )}
        </div>
      )}
      {(dropdownVisible || descriptionFieldVisible) && (
        <div className="modal-input-section">
          {dropdownVisible && (
            <ModalDropdown
              options={dropdownOptions}
              expanded={dropdownOpen}
              selectedIndex={selectedChannelIndex}
              onSelect={setSelectedChannelIndex}
              onClick={() => setDropdownOpen(true)}
              setOpen={setDropdownOpen}
            />
          )}
          {descriptionFieldVisible && (
            <ModalInputField
              value={chosenDescription}
              onChange={(e) => setChosenDescription(e.target.value)}
              name={descriptionFieldPlaceholder}
            />
          )}
        </div>
      )}
      <GlobalButton
        color={submitColor}
        onClick={onClickSubmit}
        active={(chosenName || !nameFieldVisible) && directActiveToggle}
        loading={loading}
      >
        {submitText}
      </GlobalButton>
      {footnote && <span className="modal-footnote">{footnote}</span>}
    </div>
  );
};

export default GlobalModal;
