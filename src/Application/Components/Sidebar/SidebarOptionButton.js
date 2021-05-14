import { BiSearch } from "react-icons/bi";

const contentHeight = 40;
const captionHeight = 25;
const containerHeight = contentHeight + captionHeight;
const borderSize = 1;

const SidebarOptionButton = ({
  caption,
  title,
  onClick,
  contentIcon = false,
  locked,
  highlighted,
}) => {
  return (
    <div
      className="option-button-container"
      style={{ height: `${containerHeight}px` }}
    >
      <div
        className="caption-container"
        style={{ height: `${captionHeight}px` }}
      >
        <span className="caption">{caption}</span>
      </div>
      <div
        onClick={locked ? null : onClick}
        className="content-container"
        style={{
          height: `${contentHeight}px`,
          borderWidth: `${borderSize}px`,
          borderColor: highlighted ? "#FF98BD" : null,
          cursor: locked ? "default" : "pointer",
        }}
      >
        {contentIcon && (
          <span
            className="content-icon-container"
            style={{
              height: `${contentHeight - borderSize * 2}px`,
              width: `${contentHeight}px`,
            }}
          >
            <span className="content-icon">{contentIcon}</span>
          </span>
        )}
        <span
          className="content-title-container"
          style={{
            width: contentIcon
              ? `calc(100% - ${contentHeight * 2}px)`
              : `calc(100% - ${contentHeight}px)`,
          }}
        >
          <span
            className="content-title"
            style={{
              paddingLeft: contentIcon ? null : "10px",
              color: title && !locked ? "#27282b" : "#90959d",
            }}
          >
            {title ? title : `Select ${caption}`}
          </span>
        </span>
        <span
          className="search-icon-container"
          style={{
            height: `calc(${contentHeight}px - ${borderSize * 2}px)`,
            width: `${contentHeight}px`,
          }}
        >
          <span className="search-icon" style={{ height: "20px" }}>
            <BiSearch color="#D3D3D3" size={20} />
          </span>
        </span>
      </div>
    </div>
  );
};

export default SidebarOptionButton;
