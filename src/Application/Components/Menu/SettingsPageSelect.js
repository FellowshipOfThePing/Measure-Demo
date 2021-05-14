import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import "./Menu.css";
import Routes from "../../../Routes";

const filterOptions = ["Account", "Workspace"];

const SettingsPageSelect = ({ settingsPageIndex, setSettingsPageIndex }) => {
  let history = useHistory();
  let location = useLocation();

  const onClickPageSelect = (index) => {
    setSettingsPageIndex(index);
    if (index === 0) {
      history.push(Routes.ACCOUNT_SETTINGS_PAGE);
    } else {
      history.push(Routes.WORKSPACE_SETTINGS_PAGE);
    }
  };

  useEffect(() => {
    let currentPath = location.pathname.split("/");
    if (currentPath.length > 2 && currentPath[3] === "account") {
      setSettingsPageIndex(0);
    } else if (currentPath.length > 2 && currentPath[3] === "workspace") {
      setSettingsPageIndex(1);
    }
  }, [location]);

  return (
    <div className="dashboard-filter-menu pl-1">
      {filterOptions.map((option, index) => (
        <small
          key={index}
          onClick={() => onClickPageSelect(index)}
          className={
            "px-50 " + (settingsPageIndex === index ? "txt-1" : "txt-3")
          }
          style={{
            cursor: "pointer",
            textDecoration: settingsPageIndex === index ? "underline" : null,
          }}
        >
          {option}
        </small>
      ))}
    </div>
  );
};

export default SettingsPageSelect;
