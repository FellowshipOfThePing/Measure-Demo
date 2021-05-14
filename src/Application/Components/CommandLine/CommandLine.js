import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RiCalendarLine } from "react-icons/ri";

import { useOutsideAlerter } from "../../../Hooks";
import "./CommandLine.css";

const CommandLineOption = ({
  icon,
  title,
  type,
  active = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="cli-option-container"
    >
      <div className={active ? "option-body active" : "option-body"}>
        <span className="option-left">
          {icon && <span className="option-icon">{icon}</span>}
          <span className="option-title">{title}</span>
        </span>
        {type && <span className="option-type">{type}</span>}
      </div>
    </div>
  );
};

const CommandLine = ({
  prompt,
  options,
  onSelect,
  setOpen,
  onNext,
  period = false,
}) => {
  const [searched, setSearched] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  let commandLineRef = useRef(null);
  let inputRef = useRef(null);

  useOutsideAlerter(commandLineRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(null);
  }, [searched]);

  const titleSearch = (title) => {
    let searchedLength = searched.length;
    if (
      searched
        .toLowerCase()
        .localeCompare(title.toLowerCase().slice(0, searchedLength)) === 0
    ) {
      return true;
    }
    let words = title.split(" ");
    for (var i = 0; i < words.length; i++) {
      if (words[i].toLowerCase().startsWith(searched.toLowerCase())) {
        return true;
      }
    }
  };

  const onDownArrow = () => {
    if (selectedIndex === null) {
      setSelectedIndex(0);
    } else {
      let newIndex = selectedIndex + 1;
      setSelectedIndex(
        newIndex % options.filter((option) => titleSearch(option.title)).length
      );
    }
  };

  const onUpArrow = () => {
    if (selectedIndex === null || selectedIndex === 0) {
      setSelectedIndex(
        options.filter((option) => titleSearch(option.title)).length - 1
      );
    } else {
      setSelectedIndex((idx) => idx - 1);
    }
  };

  const onEnter = () => {
    onSelect(
      options.filter((option) => titleSearch(option.title))[selectedIndex]
    );
    setOpen(false);
  };

  const onTab = () => {
    onNext();
  }

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      onDownArrow();
    } else if (e.key === "ArrowUp") {
      onUpArrow();
    } else if (e.key === "Enter" && selectedIndex !== null) {
      onEnter();
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Tab") {
      onTab();
    }
  };

  const onMouseEnter = (index) => {
    setSelectedIndex(index);
  };

  const onMouseLeave = () => {
    setSelectedIndex(null);
  };

  return (
    <div ref={commandLineRef} className="command-line-container">
      <div className="command-line-body">
        <div className="search-section">
          <div className="search-icon-container">
            {period && (
              <div style={{ height: "20px" }}>
                <RiCalendarLine color="#D3D3D3" size={20} />
              </div>
            )}
            {!period && (
              <div style={{ transform: "rotate(90deg)", height: "20px" }}>
                <BiSearch color="#D3D3D3" size={20} />
              </div>
            )}
          </div>
          <div className="search-field-container">
            <input
              ref={inputRef}
              className="search-field"
              value={searched}
              onChange={(e) => setSearched(e.target.value)}
              placeholder={prompt}
              onKeyDown={onKeyDown}
            />
          </div>
        </div>
        {options.filter((option) => titleSearch(option.title)).length > 0 && (
          <div className="results-section">
            {options
              .filter((option) => titleSearch(option.title))
              .map(({ icon, title, type }, index) => (
                <CommandLineOption
                  key={index}
                  icon={icon}
                  title={title}
                  type={type}
                  active={index === selectedIndex}
                  onMouseEnter={() => onMouseEnter(index)}
                  onMouseLeave={() => onMouseLeave(index)}
                  onClick={onEnter}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandLine;
