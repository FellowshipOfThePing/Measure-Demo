import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { SizeMe } from "react-sizeme";
import isEqual from "lodash.isequal";
import { BiPlus } from "react-icons/bi";
import { CgArrowUpR } from "react-icons/cg";
import { IoIosLock, IoIosUnlock } from "react-icons/io";

import "./DashboardPage.css";
import { GlobalFunctionsContext, GlobalStateContext } from "../../../Context";
import {
  Dashboard,
  LoadingAnimation,
  PageHeader,
  Sidebar,
} from "../../Components";
import { ConsoleHelper } from "../../../utils";
import Routes from "../../../Routes";

const headerHeight = 75;
const headerMarginBottom = 5;
const sidebarWidth = 300;

const DashboardPage = () => {
  const {
    dashboards,
    dashboardLayouts,
    dashboardWidgets,
    channels,
  } = useContext(GlobalStateContext);
  const {
    editDashboardInfo,
    getDashboardIndex,
    syncDashboardData,
    updateDashboardLayout,
    editWidget,
    createWidget,
    getNewWidgetYCoordinate,
  } = useContext(GlobalFunctionsContext);

  let { dashboardId } = useParams();
  let history = useHistory();

  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardEmoji, setDashboardEmoji] = useState("");
  const [dashboardTitle, setDashboardTitle] = useState("");
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);
  const [localLayout, setLocalLayout] = useState([]);
  const [layoutWidgetIndex, setLayoutWidgetIndex] = useState(null);
  const [firstRenderPassed, setFirstRenderPassed] = useState(false);
  const [incomingRender, setIncomingRender] = useState(false);
  const [compactType, setCompactType] = useState("none");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setDashboardLoading(true);
    syncDashboardData(dashboardId);
    setDashboardLoading(false);
  }, []);

  useEffect(() => {
    let dashboardIndex = getDashboardIndex(dashboardId);
    if (dashboardIndex === undefined) {
      history.push(Routes.ALL_DASHBOARDS_PAGE);
      return;
    }
    setDashboardTitle(dashboards[dashboardIndex].title);
    setDashboardEmoji(dashboards[dashboardIndex].icon);
  }, [channels, dashboards, dashboardId, dashboardLayouts[dashboardId]]);

  useEffect(() => {
    if (!isEqual(dashboardLayouts[dashboardId], localLayout)) {
      if (firstRenderPassed) {
        setIncomingRender(true);
      }
      if (dashboardLayouts[dashboardId]) {
        let layoutCopy = JSON.parse(
          JSON.stringify(dashboardLayouts[dashboardId])
        );
        setLocalLayout(layoutCopy);
      }
    }
  }, [dashboardLayouts[dashboardId]]);

  useEffect(() => {
    if (selectedWidgetId) {
      let widgetIndex = getLayoutWidgetIndex(selectedWidgetId);
      setLayoutWidgetIndex(widgetIndex);
    }
  }, [selectedWidgetId]);

  const getLayoutWidgetIndex = (widgetId) => {
    if (!widgetId) return;
    let layoutCopy = JSON.parse(JSON.stringify(localLayout));
    for (let i = 0; i < layoutCopy.length; i++) {
      if (layoutCopy[i].i === widgetId) {
        return i;
      }
    }
  };

  const onClickEmoji = (emoji) => {
    setDashboardEmoji(emoji.native);
    let dashboardIndex = getDashboardIndex(dashboardId);
    editDashboardInfo({
      icon: emoji.native,
      title: dashboardTitle,
      color: dashboards[dashboardIndex].color,
      channelId: dashboards[dashboardIndex].channelId,
      dashboardId: dashboardId,
    });
  };

  const onTitleEnter = () => {
    let dashboardIndex = getDashboardIndex(dashboardId);
    editDashboardInfo({
      icon: dashboardEmoji,
      title: dashboardTitle,
      color: dashboards[dashboardIndex].color,
      channelId: dashboards[dashboardIndex].channelId,
      dashboardId: dashboardId,
    });
  };

  const onClickStartNewWidget = () => {
    setSidebarOpen(true);
    setSelectedWidgetId(null);
    setLayoutWidgetIndex(null);
  };

  const onClickBringToTop = () => {
    setCompactType("vertical");
    setTimeout(() => {
      setCompactType("none");
    }, 1000);
  };

  const onClickLockAllWidgets = (locked) => {
    let layoutCopy = JSON.parse(JSON.stringify(localLayout));
    for (let i = 0; i < layoutCopy.length; i++) {
      layoutCopy[i].static = locked;
    }
    onLayoutChange(layoutCopy);
  };

  const onClickCreateWidget = (
    widgetTitle,
    emoji,
    metricName,
    type,
    chartType,
    period,
    sample
  ) => {
    let newWidgetId = createWidget(
      dashboardId,
      widgetTitle,
      emoji,
      metricName,
      type.title,
      chartType?.title,
      period?.title,
      sample?.key
    );
    addWidgetToLayout(newWidgetId);
  };

  const addWidgetToLayout = (widgetId) => {
    let layoutCopy = JSON.parse(JSON.stringify(localLayout));
    let newYCoord = getNewWidgetYCoordinate(layoutCopy);
    let newWidget = {
      i: widgetId,
      w: 4,
      h: 4,
      x: 0,
      y: newYCoord,
      maxW: 12,
      maxH: 12,
      minW: 2,
      minH: 2,
      static: false,
    };
    layoutCopy.push(newWidget);
    if (isEqual(localLayout, [])) {
      updateDashboardLayout(dashboardId, layoutCopy);
    }
    setLocalLayout(layoutCopy);
    setSelectedWidgetId(widgetId);
  };

  const onClickEditWidget = (widgetId) => {
    setSelectedWidgetId(widgetId);
    let widgetIndex = getLayoutWidgetIndex(widgetId);
    setLayoutWidgetIndex(widgetIndex);
    setSidebarOpen(true);
  };

  const onClickLockWidget = (widgetId, locked) => {
    let widgetIndex = getLayoutWidgetIndex(widgetId);
    let layoutCopy = JSON.parse(JSON.stringify(localLayout));
    layoutCopy[widgetIndex].static = locked;
    setLocalLayout(layoutCopy);
  };

  const onClickDeleteWidget = (widgetId) => {
    setSelectedWidgetId(null);
    setLayoutWidgetIndex(null);
    let widgetIndex = getLayoutWidgetIndex(widgetId);
    let layoutCopy = JSON.parse(JSON.stringify(localLayout));
    layoutCopy.splice(widgetIndex, 1);
    if (widgetId === selectedWidgetId) {
      setSelectedWidgetId(null);
    }
    onLayoutChange(layoutCopy);
  };

  const onLayoutChange = (layout) => {
    if (!firstRenderPassed) {
      setFirstRenderPassed(true);
    } else if (incomingRender) {
      setIncomingRender(false);
      ConsoleHelper("Incoming Layout Render");
    } else if (!isEqual(layout, localLayout)) {
      ConsoleHelper("Outgoing Layout Update");
      setLocalLayout(layout);
      updateDashboardLayout(dashboardId, layout);
    }
  };

  const onChangeWidgetTitle = (widgetId, newTitle) => {
    if (!widgetId) return;
    let widgetCopy = JSON.parse(JSON.stringify(dashboardWidgets[widgetId]));
    widgetCopy.title = newTitle;
    editWidget(widgetId, widgetCopy);
  };

  const onChangeWidgetIcon = (widgetId, newIcon) => {
    if (!widgetId) return;
    let widgetCopy = JSON.parse(JSON.stringify(dashboardWidgets[widgetId]));
    widgetCopy.icon.value = newIcon;
    editWidget(widgetId, widgetCopy);
  };

  if (dashboardLoading) return <LoadingAnimation />;

  return (
    <div className="dashboard-page-container">
      <PageHeader
        height={headerHeight}
        marginBottom={headerMarginBottom}
        emoji={dashboardEmoji}
        onClickEmoji={onClickEmoji}
        title={dashboardTitle}
        setTitle={setDashboardTitle}
        onTitleEnter={onTitleEnter}
        descriptionVisible={false}
        rightChildren={
          <>
            <span
              style={{
                cursor: "pointer",
                height: "24px",
                paddingRight: "10px",
              }}
              onClick={onClickStartNewWidget}
              title="Add a new widget"
            >
              <BiPlus color="#90959d" size={24} className="widget-button" />
            </span>
            <span
              style={{
                cursor: "pointer",
                height: "24px",
                paddingRight: "12px",
              }}
              onClick={() => onClickLockAllWidgets(true)}
              title="Lock all widgets"
            >
              <IoIosLock className="widget-button" size={24} color="#27282b" />
            </span>
            <span
              style={{
                cursor: "pointer",
                height: "24px",
                paddingRight: "12px",
              }}
              onClick={() => onClickLockAllWidgets(false)}
              title="Unlock all widgets"
            >
              <IoIosUnlock
                className="widget-button"
                size={24}
                color="#90959d"
              />
            </span>
            <span
              style={{
                cursor: "pointer",
                height: "24px",
                paddingRight: "10px",
              }}
              onClick={onClickBringToTop}
              title="Bring all widgets to top"
            >
              <CgArrowUpR className="widget-button" size={24} color="#90959d" />
            </span>
          </>
        }
      />
      <div
        className="dashboard-page-body"
        style={{
          height: `calc(100% - ${headerHeight / 2 + headerMarginBottom}px)`,
        }}
      >
        <div
          className="dashboard-container"
          style={{
            width: sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : "100%",
          }}
        >
          <SizeMe>
            {({ size }) => (
              <Dashboard
                width={size.width}
                layout={localLayout}
                onLayoutChange={onLayoutChange}
                onClickEditWidget={onClickEditWidget}
                onClickLockWidget={onClickLockWidget}
                onClickDeleteWidget={onClickDeleteWidget}
                openSidebar={() => setSidebarOpen(true)}
                selectedWidgetId={selectedWidgetId}
                compactType={compactType}
                dragging={dragging}
                setDragging={setDragging}
              />
            )}
          </SizeMe>
        </div>
        {sidebarOpen && (
          <div
            className="sidebar-container"
            style={{
              width: `${sidebarWidth}px`,
              minWidth: `${sidebarWidth}px`,
            }}
          >
            <Sidebar
              setOpen={setSidebarOpen}
              selectedWidgetId={selectedWidgetId}
              setSelectedWidgetId={setSelectedWidgetId}
              widget={dashboardWidgets[selectedWidgetId]}
              locked={localLayout[layoutWidgetIndex]?.static}
              onClickLock={() =>
                onClickLockWidget(
                  selectedWidgetId,
                  !localLayout[layoutWidgetIndex]?.static
                )
              }
              onClickDelete={() => onClickDeleteWidget(selectedWidgetId)}
              onChangeWidgetTitle={onChangeWidgetTitle}
              onChangeWidgetIcon={onChangeWidgetIcon}
              onClickCreateWidget={onClickCreateWidget}
              setDragging={setDragging}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
