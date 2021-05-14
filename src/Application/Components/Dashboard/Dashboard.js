import { useContext, useEffect, useMemo, useState } from "react";
import GridLayout from "react-grid-layout";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import "../../../../node_modules/react-resizable/css/styles.css";

import "./Dashboard.css";
import "../../CSS/gridLayout.css";
import { GlobalStateContext } from "../../../Context";
import CustomWidthProvider from "./CustomWidthProvider";
import Widget from "./Widget";

const cols = 12;

const Layout = CustomWidthProvider(GridLayout);

const Dashboard = ({
  width,
  layout,
  onLayoutChange,
  onClickEditWidget,
  onClickLockWidget,
  onClickDeleteWidget,
  openSidebar,
  selectedWidgetId,
  compactType,
  dragging,
  setDragging,
}) => {
  const { dashboardWidgets, widgetData } = useContext(GlobalStateContext);

  const [rowHeight, setRowHeight] = useState(width ? width * (1 / cols) : 30);

  useEffect(() => {
    let newRowHeight = width * (1 / cols) - 10;
    setRowHeight(newRowHeight);
  }, [width]);

  const children = useMemo(() => {
    return layout.map((widget, index) => (
      <span key={widget.i}>
        <Widget
          widget={widget ? dashboardWidgets[widget.i] : null}
          locked={widget.static}
          onClickEdit={() => onClickEditWidget(widget.i)}
          onClickLock={() => onClickLockWidget(widget.i, !widget.static)}
          onClickDelete={() => onClickDeleteWidget(widget.i)}
          selected={selectedWidgetId && selectedWidgetId === widget.i}
          dragging={dragging}
        />
      </span>
    ));
  }, [layout, dashboardWidgets, widgetData, selectedWidgetId, dragging]);

  if (children.length === 0) {
    return (
      <div className="empty-dashboard-container" onClick={openSidebar}>
        <span className="empty-dashboard-title">
          It looks like this dashboard is empty.
        </span>
        <span className="empty-dashboard-title">
          Click here, or on the "+" button in the toolbar above to create your
          first widget!
        </span>
      </div>
    );
  }

  return (
    <Layout
      measureBeforeMount
      draggableCancel=".widget-button-section"
      className="layout"
      style={{ height: "100%" }}
      compactType={compactType}
      gridWidth={width}
      cols={cols}
      rowHeight={rowHeight}
      layout={layout}
      preventCollision
      onLayoutChange={(layout) => onLayoutChange(layout)}
      containerPadding={[10, 0]}
      onDragStart={() => setDragging(true)}
      onDragStop={() => setDragging(false)}
    >
      {children}
    </Layout>
  );
};

export default Dashboard;
