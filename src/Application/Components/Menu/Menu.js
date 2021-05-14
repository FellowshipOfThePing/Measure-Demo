import React, { useContext, useEffect, useState } from "react";
import { BiGridAlt } from "react-icons/bi";
import { FiDatabase, FiSettings } from "react-icons/fi";
import { useHistory, useLocation } from "react-router";

import "./Menu.css";
import {
  MenuButton,
  ChannelSectionHeader,
  MenuHeader,
  WorkspaceDropdown,
} from "..";
import { GlobalFunctionsContext, GlobalStateContext } from "../../../Context";
import Routes from "../../../Routes";

const Menu = ({
  title,
  width,
  onClickAddChannel,
  onClickCreateWorkspace,
  onClickInviteTeammate,
}) => {
  const { channels, dashboards } = useContext(GlobalStateContext);
  const { getChannelIndex, getDashboardIndex } = useContext(
    GlobalFunctionsContext
  );
  let history = useHistory();
  let location = useLocation();

  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onClickChannelButton = (channelId, index) => {
    setActiveButtonIndex(index);
    history.push(`${Routes.CHANNEL_PAGE}/${channelId}`);
  };

  const onClickSourcesButton = () => {
    setActiveButtonIndex(0);
    history.push(Routes.SOURCES_PAGE);
  };

  const onClickSettingsButton = () => {
    setActiveButtonIndex(channels.length + 4);
    history.push(Routes.ACCOUNT_SETTINGS_PAGE);
  };

  useEffect(() => {
    let currentPath = location.pathname.split("/");
    if (currentPath.length > 3) {
      let category = currentPath[2];
      let id = currentPath[3];

      if (category === "channel") {
        if (id === "all") {
          setActiveButtonIndex(1);
        } else {
          let channelIndex = getChannelIndex(id);
          setActiveButtonIndex(parseInt(channelIndex) + 2);
        }
      } else if (category === "dashboard") {
        try {
          let dashboardIndex = getDashboardIndex(id);
          let channelId = dashboards[dashboardIndex].channelId;
          let channelIndex = getChannelIndex(channelId);
          setActiveButtonIndex(parseInt(channelIndex) + 2);
        } catch (err) {
          history.push(Routes.ALL_DASHBOARDS_PAGE);
        }
      } else if (category === "settings") {
        setActiveButtonIndex(channels.length + 4);
      }
    }
  }, [location, channels, dashboards]);

  return (
    <div className="menu-container" style={{ width: `${width}px` }}>
      <div className="menu-scroll-section">
        <div className="menu-header-section">
          <MenuHeader title={title} onClick={() => setDropdownOpen(true)} />
        </div>
        {dropdownOpen && (
          <WorkspaceDropdown
            setDropdownOpen={setDropdownOpen}
            onClickCreateWorkspace={onClickCreateWorkspace}
            onClickInviteTeammate={onClickInviteTeammate}
          />
        )}
        <div className="menu-directory-section">
          <MenuButton
            onClick={onClickSourcesButton}
            icon={<FiDatabase size={15} />}
            title="Data Sources"
            active={0 === activeButtonIndex}
          />
          <MenuButton
            onClick={() => onClickChannelButton("all", 1)}
            icon={<BiGridAlt size={18} />}
            title="All Dashboards"
            active={1 === activeButtonIndex}
          />
        </div>
        <div className="menu-channels-section">
          <ChannelSectionHeader
            title={`${title.toUpperCase()} CHANNELS`}
            onClickAddChannel={onClickAddChannel}
          />
          {channels.map((props, index) => (
            <MenuButton
              {...props}
              active={index + 2 === activeButtonIndex}
              onClick={() => onClickChannelButton(props.channelId, index + 2)}
              key={index + props.title + props.channelId}
            />
          ))}
        </div>
        <span className="info-fade" />
      </div>
      <div className="menu-bottom-section">
        <MenuButton
          icon={<FiSettings size={15} />}
          title="Settings"
          active={channels.length + 4 === activeButtonIndex}
          onClick={onClickSettingsButton}
        />
      </div>
    </div>
  );
};

export default Menu;
