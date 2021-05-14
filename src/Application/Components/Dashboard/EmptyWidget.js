import "./Widget.css";

const EmptyWidget = () => {
  return (
    <div className="empty-widget-container">
      <span className="empty-widget-text">
        No data available for this metric/period
      </span>
    </div>
  );
};

export default EmptyWidget;
