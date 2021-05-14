import { LoadingAnimation } from "..";
import "./Buttons.css";

const GlobalButton = ({
  children,
  onClick,
  color = "#615efb",
  active = true,
  loading = false,
}) => {
  return (
    <>
      {loading && (
        <div className="button-animation-container">
          <LoadingAnimation
            height="35px"
            color="black"
            iconHeight={100}
            iconWidth={200}
          />
        </div>
      )}
      {!loading && (
        <div
          className="global-button-container"
          style={{ backgroundColor: color, opacity: active ? "1" : "0.5" }}
          onClick={active ? onClick : null}
        >
          <span className="global-button-text">{children}</span>
        </div>
      )}
    </>
  );
};

export default GlobalButton;
