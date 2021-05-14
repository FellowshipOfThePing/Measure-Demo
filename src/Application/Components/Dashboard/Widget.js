import { useContext, useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { HiPencil } from "react-icons/hi";
import { ParentSizeModern } from "@visx/responsive";
import { IoIosLock, IoIosUnlock } from "react-icons/io"

import "./Widget.css";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";
import Statistic from "./Statistic";
import { parsePeriod, formatStatistic } from "../../../utils";
import { GlobalFunctionsContext, GlobalStateContext } from "../../../Context";

const iconSize = 22;

const Widget = ({
  widget,
  locked,
  onClickEdit,
  onClickLock,
  onClickDelete,
  selected,
  dragging
}) => {
  const { widgetData, metricNamesObject } = useContext(GlobalStateContext);
  const { getDataFromMetricName } = useContext(GlobalFunctionsContext);
  const [buttonsShowing, setButtonsShowing] = useState(false);
  const [data, setData] = useState(null);
  const [units, setUnits] = useState(null);
  const [color, setColor] = useState(null);
  const [metricName, setMetricName] = useState(null);
  const [statisticText, setStatisticText] = useState(null);
  const [sample, setSample] = useState(false);

  useEffect(() => {
    if (widget) {
      let metricName = widget.metrics[0].metricName;
      let sampleFormat = widget.metrics[0].sample;
      let metricPeriod = widget.metrics[0].timePeriod;
      let sumStrategy = metricNamesObject[metricName].sumStrategy;
      let metricUnits = metricNamesObject[metricName].units;
      let metricTitle = metricNamesObject[metricName].title;
      setMetricName(metricTitle);
      setUnits(metricUnits);
      setSample(sampleFormat);
      if (widgetData[metricName]) {
        let sampledData;
        if (widget?.type.toLowerCase() !== "chart") {
          sampleFormat = "D";
        }
        sampledData = widgetData[metricName][sampleFormat];
        let zippedData;
        if (metricPeriod) {
          let periodFilteredData = parsePeriod(
            sampledData,
            metricPeriod,
            sampleFormat
          );
          if (widget?.type.toLowerCase() !== "chart") {
            setStatisticText(
              formatStatistic(
                periodFilteredData,
                metricUnits,
                metricTitle,
                sumStrategy,
                metricPeriod
              )
            );
          }
          zippedData = periodFilteredData.xAxis.map((xPoint, index) => ({
            x: xPoint,
            y: periodFilteredData.yAxis[index],
          }));
        } else {
          if (widget?.type.toLowerCase() !== "chart") {
            setStatisticText(
              formatStatistic(
                sampledData,
                metricUnits,
                metricTitle,
                sumStrategy,
                metricPeriod
              )
            );
          }
          zippedData = sampledData.xAxis.map((xPoint, index) => ({
            x: xPoint,
            y: sampledData.yAxis[index],
          }));
        }
        setColor(widget.metrics[0].style.color);
        setData(zippedData);
      } else {
        getDataFromMetricName(metricName);
      }
    }
  }, [widget, widgetData]);

  const onMouseEnter = (e) => {
    setButtonsShowing(true);
  };

  const onMouseLeave = (e) => {
    setButtonsShowing(false);
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseEnter}
      className="widget-container"
      style={{ border: selected ? `1px solid ${color}` : "1px solid #d3d3d3" }}
    >
      <div className="widget-header-section">
        <span
          className="title-section"
          style={{
            width: buttonsShowing
              ? locked
                ? `calc(100% - ${iconSize * 2}px)`
                : `calc(100% - ${iconSize * 3}px)`
              : `calc(100% - ${iconSize}px)`,
          }}
        >
          <span className="widget-icon">{widget?.icon.value}</span>
          <span className="widget-title">{widget?.title}</span>
        </span>
        <span
          className="widget-button-section"
          style={{
            width: buttonsShowing
              ? locked
                ? `${iconSize * 2}px`
                : `${iconSize * 3}px`
              : `${iconSize}px`,
          }}
        >
          {buttonsShowing && (
            <>
              {!locked && (
                <IoMdTrash
                  className="widget-button"
                  size={iconSize}
                  onClick={onClickDelete}
                  title="Delete this widget"
                />
              )}
              <HiPencil
                className="widget-button"
                size={iconSize}
                onClick={onClickEdit}
                title="Edit this widget"
              />
            </>
          )}
          {locked && (
            <IoIosLock
              className="widget-button"
              size={iconSize}
              onClick={onClickLock}
              style={{ color: locked ? "#27282b" : "#d9d9d9" }}
              title="Unlock this widget"
            />
          )}
          {buttonsShowing && !locked && (
            <IoIosUnlock
              className="widget-button"
              size={iconSize}
              onClick={onClickLock}
              title="Lock this widget"
            />
          )}
        </span>
      </div>
      <div className="widget-content-section">
        {data && (
          <>
            {widget?.type.toLowerCase() === "chart" && widget?.subType && (
              <>
                {widget.subType.toLowerCase().includes("line") && (
                  <ParentSizeModern>
                    {(parent) => (
                      <LineChart
                        data={data}
                        height={parent.height}
                        width={parent.width}
                        color={color}
                        units={units}
                        metricName={metricName}
                        sample={sample}
                        dragging={dragging}
                      />
                    )}
                  </ParentSizeModern>
                )}
                {widget.subType.toLowerCase().includes("bar") && (
                  <ParentSizeModern>
                    {(parent) => (
                      <BarChart
                        data={data}
                        height={parent.height}
                        width={parent.width}
                        color={color}
                        units={units}
                        metricName={metricName}
                        sample={sample}
                        dragging={dragging}
                      />
                    )}
                  </ParentSizeModern>
                )}
              </>
            )}
            {widget?.type.toLowerCase() !== "chart" && statisticText && (
              <ParentSizeModern>
                {(parent) => (
                  <Statistic
                    title={statisticText.title}
                    subTitle={statisticText.subTitle}
                    width={parent.width}
                    height={parent.height}
                  />
                )}
              </ParentSizeModern>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Widget;
