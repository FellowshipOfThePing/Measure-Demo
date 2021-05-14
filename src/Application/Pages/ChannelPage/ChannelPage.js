import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { BiGridAlt, BiPlus } from "react-icons/bi";
import { useHistory, useParams } from "react-router";

import "./ChannelPage.css";
import Routes from "../../../Routes";
import { useWindowSize } from "../../../Hooks";
import { GlobalFunctionsContext, GlobalStateContext } from "../../../Context";
import { DashboardCard, GlobalModal, PageHeader } from "../../Components";
import { handleCaughtError } from "../../../utils";

const cardWidth = 115;
const cardMargin = 10;
const trashIconWidth = 22;
const headerHeight = 75;
const headerMarginBottom = 5;
const addCard = {
  icon: <BiPlus color="#A6A6A6" />,
  title: "New Dashboard",
  color: "#F8F8F8",
  channelId: null,
  addButton: true,
};

const ChannelPage = () => {
  const { channels, dashboards } = useContext(GlobalStateContext);
  const {
    getChannelIndex,
    editChannel,
    deleteChannel,
    createDashboard,
    editDashboardInfo,
    deleteDashboard,
  } = useContext(GlobalFunctionsContext);

  // Current Channel/Dashboard Values
  const [currentChannelId, setCurrentChannelId] = useState(null);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(null);
  const [channelDashboards, setChannelDashboards] = useState([]);
  const [channelEmoji, setChannelEmoji] = useState("");
  const [channelTitle, setChannelTitle] = useState("");
  const [channelDescription, setChannelDescription] = useState("");

  // Modals Open/Closed Controllers
  const [deleteChannelModalOpen, setDeleteChannelModalOpen] = useState(false);
  const [editDashboardModalOpen, setEditDashboardModalOpen] = useState(false);
  const [createDashboardModalOpen, setCreateDashboardModalOpen] = useState(false);
  const [createDashboardLoading, setCreateDashboardLoading] = useState(false);
  const [deleteDashboardModalOpen, setDeleteDashboardModalOpen] = useState(false);

  const [currentDashboardId, setCurrentDashboardId] = useState(null);
  const [currentDashboardIndex, setCurrentDashboardIndex] = useState(null);

  // Other Page Values
  const [pageHeaderReadOnly, setPageHeaderReadOnly] = useState(null);
  const [pageHeaderDescriptionVisible, setPageHeaderDescriptionVisible] = useState(null);

  // Card Grid Controls
  const [cardsPerRow, setCardsPerRow] = useState(null);
  const [numRows, setNumRows] = useState(null);
  const [rows, setRows] = useState(null);
  let windowSize = useWindowSize();

  // Ref/Param Values
  let pageRef = useRef(null);
  let history = useHistory();
  let { channelId } = useParams();

  useEffect(() => {
    let filteredDashboards = JSON.parse(JSON.stringify(dashboards));
    if (channelId.toLowerCase() === "all") {
      setPageHeaderDescriptionVisible(false);
      setPageHeaderReadOnly(true);
      setCurrentChannelIndex(0);
      setCurrentChannelId("0");
      filteredDashboards.push(addCard);
      setChannelDashboards(filteredDashboards);
      setChannelTitle("All Dashboards");
      setChannelEmoji(null);
      setChannelDescription(null);
    } else {
      setPageHeaderDescriptionVisible(true);
      setPageHeaderReadOnly(false);
      setCurrentChannelId(channelId);
      let channelIndex = getChannelIndex(channelId);
      if (!channelIndex) {
        if (channels.length === 0) {
          history.push(Routes.ALL_DASHBOARDS_PAGE);
          return;
        } else {
          channelIndex = 0;
          setCurrentChannelIndex(0);
        }
      }
      setCurrentChannelIndex(channelIndex);
      filteredDashboards = filteredDashboards.filter(
        (dash) => dash.channelId === channels[channelIndex].channelId
      );
      filteredDashboards.push(addCard);
      setChannelDashboards(filteredDashboards);
      setChannelTitle(channels[channelIndex].title);
      setChannelEmoji(channels[channelIndex].icon);
      setChannelDescription(channels[channelIndex].description);
    }
  }, [channelId, dashboards, channels]);

  useEffect(() => {
    setCardsPerRow(
      Math.floor(pageRef.current.offsetWidth / (cardWidth + cardMargin * 2))
    );
  }, [windowSize, channelId, channelDashboards]);

  useEffect(() => {
    if (cardsPerRow && channelDashboards.length > 0) {
      setNumRows(Math.ceil(channelDashboards.length / cardsPerRow));
    }
  }, [cardsPerRow]);

  useEffect(() => {
    if (numRows) {
      setRows(new Array(numRows).fill(""));
    }
  }, [numRows]);

  const onClickCard = (addButton, dashboardId) => {
    if (addButton) {
      setCreateDashboardModalOpen(true);
    } else {
      history.push(`${Routes.DASHBOARD_PAGE}/${dashboardId}`);
    }
  };

  const onClickEditCard = (index, dashboardId) => {
    setCurrentDashboardIndex(index);
    setCurrentDashboardId(dashboardId);
    setEditDashboardModalOpen(true);
  };

  const onClickDeleteCard = (index, dashboardId) => {
    setCurrentDashboardIndex(index);
    setCurrentDashboardId(dashboardId);
    setDeleteDashboardModalOpen(true);
  };

  const onClickEmoji = (emoji) => {
    let prevEmoji = channelEmoji;
    setChannelEmoji(emoji.native);
    try {
      editChannel("icon", {
        icon: emoji.native,
        channelId: channelId,
      });
    } catch (err) {
      handleCaughtError(err);
      setChannelEmoji(prevEmoji);
    }
  };

  const onTitleEnter = () => {
    try {
      editChannel("title", {
        title: channelTitle,
        channelId: channelId,
      });
    } catch (err) {
      handleCaughtError(err);
    }
  };

  const onDescriptionEnter = () => {
    try {
      editChannel("description", {
        description: channelDescription,
        channelId: channelId,
      });
    } catch (err) {
      handleCaughtError(err);
    }
  };

  const onClickDeleteChannel = () => {
    let newChannelId;
    let oldChannelId = currentChannelId;
    let channelIndex = getChannelIndex(channelId);

    if (channels.length === 1) {
      newChannelId = "all";
    } else if (channelIndex === 0) {
      newChannelId = channels[1].channelId;
    } else if (channelIndex === channels.length - 1) {
      newChannelId = channels[channels.length - 2].channelId;
    } else {
      newChannelId = channels[channelIndex + 1].channelId;
    }

    setCurrentChannelId(newChannelId);
    history.push(`${Routes.CHANNEL_PAGE}/${newChannelId}`);

    try {
      deleteChannel(oldChannelId);
    } catch (err) {
      handleCaughtError(err);
    }
  };

  const onClickCreateDashboard = ({
    emoji,
    name,
    color,
    dropdownSelection,
  }) => {
    let newDasboardId = createDashboard({
      channelId: dropdownSelection.channelId,
      title: name,
      icon: emoji,
      color: color,
    });
    setCreateDashboardLoading(false);
    setCreateDashboardModalOpen(false);
    onClickCard(false, newDasboardId);
  };

  const onClickEditDashboard = ({ emoji, name, color, dropdownSelection }) => {
    editDashboardInfo({
      icon: emoji,
      title: name,
      color: color,
      channelId: dropdownSelection.channelId,
      dashboardId: currentDashboardId,
    });
  };

  const onClickDeleteDashboard = () => {
    try {
      deleteDashboard(currentDashboardId);
    } catch (err) {
      handleCaughtError(err);
    }
  };

  return (
    <div className="channel-page-container">
      <PageHeader
        height={headerHeight}
        marginBottom={headerMarginBottom}
        emoji={channelEmoji}
        onClickEmoji={onClickEmoji}
        title={channelTitle}
        setTitle={setChannelTitle}
        onTitleEnter={onTitleEnter}
        description={channelDescription}
        setDescription={setChannelDescription}
        onDescriptionEnter={onDescriptionEnter}
        descriptionVisible={pageHeaderDescriptionVisible}
        readOnly={pageHeaderReadOnly}
        substituteIcon={channelId === "all" ? <BiGridAlt size={20} /> : null}
        rightChildren={
          <>
            {channelId !== "all" && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setDeleteChannelModalOpen(true)}
              >
                <IoMdTrash color="#27282B" size={trashIconWidth} />
              </span>
            )}
          </>
        }
      />
      <div
        ref={pageRef}
        className="channel-page-body"
        style={{ height: `calc(100% - ${headerHeight + headerMarginBottom})` }}
      >
        {rows &&
          rows.map((_, rowIndex) => (
            <div className="dashboard-card-row" key={rowIndex}>
              {channelDashboards &&
                channelDashboards
                  .slice(
                    rowIndex * cardsPerRow,
                    rowIndex * cardsPerRow + cardsPerRow
                  )
                  .map((props, index) => (
                    <div
                      key={index}
                      style={{ marginRight: `${cardMargin * 2}px` }}
                    >
                      <DashboardCard
                        {...props}
                        onClick={() =>
                          onClickCard(props.addButton, props.dashboardId)
                        }
                        onClickEdit={() =>
                          onClickEditCard(
                            rowIndex * cardsPerRow + index,
                            props.dashboardId
                          )
                        }
                        onClickDelete={() =>
                          onClickDeleteCard(
                            rowIndex * cardsPerRow + index,
                            props.dashboardId
                          )
                        }
                      />
                    </div>
                  ))}
            </div>
          ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {deleteChannelModalOpen && (
          <GlobalModal
            setModalOpen={setDeleteChannelModalOpen}
            modalTitle="Are you sure you want to delete this channel?"
            modalSubtitle="Any dashboards saved here will still be available in the 'All Dashboards' Tab"
            submitColor="#ff4062"
            submitText="Delete"
            onSubmit={onClickDeleteChannel}
          />
        )}
        {createDashboardModalOpen && (
          <GlobalModal
            setModalOpen={setCreateDashboardModalOpen}
            modalTitle="New Dashboard"
            emojiPickerVisible
            nameFieldVisible
            nameFieldPlaceholder="Enter a name (Ex: Customer Dashboard)"
            colorPickerVisible
            dropdownVisible
            dropdownOptions={channels}
            currentDropdownIndex={currentChannelIndex ?? -1}
            submitText="Create"
            onSubmit={onClickCreateDashboard}
            loading={createDashboardLoading}
            keepModalOpen
          />
        )}
        {editDashboardModalOpen && (
          <GlobalModal
            setModalOpen={setEditDashboardModalOpen}
            modalTitle="Edit Dashboard"
            emojiPickerVisible
            currentEmoji={channelDashboards[currentDashboardIndex].icon}
            nameFieldVisible
            nameFieldPlaceholder="Enter a name (Ex: Customer Dashboard)"
            currentName={channelDashboards[currentDashboardIndex].title}
            colorPickerVisible
            currentColor={channelDashboards[currentDashboardIndex].color}
            dropdownVisible
            dropdownOptions={channels}
            currentDropdownIndex={channels
              .map((channel) => {
                return channel.channelId;
              })
              .indexOf(channelDashboards[currentDashboardIndex].channelId)}
            submitText="Save"
            onSubmit={onClickEditDashboard}
          />
        )}
        {deleteDashboardModalOpen && (
          <GlobalModal
            setModalOpen={setDeleteDashboardModalOpen}
            modalTitle="Are you sure you want to delete this dashboard?"
            submitColor="#ff4062"
            submitText="Delete"
            onSubmit={onClickDeleteDashboard}
          />
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
