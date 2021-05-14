import React, { useEffect, useMemo, useRef, useState } from "react";
import { LegendItem, LegendLabel, LegendOrdinal } from "@visx/legend";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { withTooltip, useTooltipInPortal } from "@visx/tooltip";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { timeParse, timeFormat } from "d3-time-format";
import styled from "styled-components";

import { formatTooltipNumber } from "../../../utils";
import EmptyWidget from "../Dashboard/EmptyWidget";

const tickColor = "#666666";
const gridColor = "#e1e1e1";
const background = "#ffffff";
const defaultMargin = { top: 10, left: 40, right: 30, bottom: 50 };
const legendGlyphSize = 10;
let tooltipTimeout;

const parseDate = timeParse("%Y-%m-%d");

const dateFormats = {
  D: {
    tooltip: "%b %d, %Y",
    xAxis: "%b %d",
  },
  W: {
    tooltip: "%b %d",
    xAxis: "%b '%y",
  },
  M: {
    tooltip: "%B %Y",
    xAxis: "%b '%y",
  },
  Q: {
    tooltip: "%b '%y",
    xAxis: "%B",
  },
  Y: {
    tooltip: "%Y",
    xAxis: "%Y",
  },
};

const getWeeklyTooltipDate = (date) => {
  let weeklyFormat = timeFormat(dateFormats["W"].tooltip);
  let weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - 6);
  weekStart = convertDateFormat(weekStart);
  let weekEnd = new Date(date);
  weekEnd.setDate(weekEnd.getDate() + 1);
  weekEnd = convertDateFormat(weekEnd);
  return `${weeklyFormat(parseDate(weekStart))} - ${weeklyFormat(
    parseDate(weekEnd)
  )}`;
};

const getQuarterlyTooltipDate = (date) => {
  let quarterlyFormat = timeFormat(dateFormats["Q"].tooltip);
  let qStart = new Date(date);
  qStart.setMonth(qStart.getMonth() - 2);
  qStart = convertDateFormat(qStart);
  let qEnd = new Date(date);
  qEnd.setMonth(qEnd.getMonth());
  qEnd = convertDateFormat(qEnd);
  return `${quarterlyFormat(parseDate(qStart))} - ${quarterlyFormat(
    parseDate(qEnd)
  )}`;
};

const convertDateFormat = (date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

// accessors
const xAccessor = (d) => d.x;
const yAccessor = (d) => Number(d.y);

export default withTooltip(
  ({
    data,
    metricName,
    units,
    sample = "D",
    width = 600,
    height = 250,
    margin = defaultMargin,
    color = "#000000",
    dragging,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  }) => {
    const [numXTicks, setNumXTicks] = useState(0);
    const [numYTicks, setNumYTicks] = useState(0);
    const highlightRef = useRef(null);

    const { containerRef, TooltipInPortal } = useTooltipInPortal({
      detectBounds: true,
      scroll: true,
    });

    useEffect(() => {
      setNumXTicks(Math.floor(width / 100));
    }, [width]);

    useEffect(() => {
      setNumYTicks(Math.floor(height / 35));
    }, [height]);

    const tooltipFormat = timeFormat(dateFormats[sample].tooltip);
    const xAxisFormat = timeFormat(dateFormats[sample].xAxis);
    const formatTooltipDate = (date) => tooltipFormat(parseDate(date));
    const formatXAxisDate = (date) => xAxisFormat(parseDate(date));

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const maxYValue = Math.max(...data.map(yAccessor));
    let yDomainMax;
    if (maxYValue < 10) {
      yDomainMax = maxYValue + 1;
    } else {
      yDomainMax = Math.ceil(maxYValue / 10) * 10 + 10;
    }

    // scales, memoize for performance
    const xScale = useMemo(
      () =>
        scaleBand({
          range: [0, xMax],
          domain: data.map(xAccessor),
          padding: 0.4,
        }),
      [xMax, data]
    );

    const yScale = useMemo(
      () =>
        scaleLinear({
          range: [yMax, 0],
          round: true,
          domain: [0, yDomainMax],
        }),
      [yMax, data]
    );

    const colorScale = scaleOrdinal({
      domain: [metricName],
      range: [color],
    });

    if (data.length < 1) return <EmptyWidget />;

    return width < 10 ? null : (
      <div style={{ position: "relative", width, overflow: "hidden" }}>
        <svg width={width} height={height} ref={containerRef}>
          <rect
            width={width}
            height={height}
            fill={background}
            rx={14}
            onMouseLeave={() => {
              highlightRef.current = null;
              hideTooltip();
            }}
          />
          <GridRows
            top={margin.top}
            left={margin.left}
            scale={yScale}
            width={xMax}
            height={yMax}
            stroke={gridColor}
            fill={gridColor}
            numTicks={numYTicks}
          />
          <Group top={margin.top} left={margin.left}>
            {data.map((d, index) => {
              const date = xAccessor(d);
              const barWidth = xScale.bandwidth();
              const barHeight = yMax - (yScale(yAccessor(d)) ?? 0);
              const barX = xScale(date);
              const barY = yMax - barHeight;
              return (
                <Bar
                  key={`bar-${date}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  onMouseLeave={() => {
                    tooltipTimeout = window.setTimeout(() => {
                      hideTooltip();
                      highlightRef.current = null;
                    }, 1000);
                  }}
                  onMouseMove={() => {
                    highlightRef.current = index;
                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                    const top = 0;
                    const left = barX;
                    showTooltip({
                      tooltipData: d,
                      tooltipTop: top,
                      tooltipLeft: left,
                    });
                  }}
                />
              );
            })}
            <AxisLeft
              hideTicks
              hideAxisLine
              hideZero
              scale={yScale}
              stroke={tickColor}
              tickStroke={tickColor}
              numTicks={numYTicks}
              tickLabelProps={() => ({
                fill: tickColor,
                fontSize: 11,
                textAnchor: "end",
                dy: "0.33em",
              })}
            />
            <AxisBottom
              hideTicks
              numTicks={numXTicks}
              top={yMax}
              scale={xScale}
              stroke={gridColor}
              tickStroke={gridColor}
              tickFormat={formatXAxisDate}
              tickLabelProps={() => ({
                fill: tickColor,
                fontSize: 11,
                textAnchor: "middle",
              })}
            />
          </Group>
        </svg>
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          <LegendOrdinal scale={colorScale} labelFormat={(label) => label}>
            {(labels) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                {labels.map((label, i) => (
                  <LegendItem key={`legend-ordinal-${i}`} margin="0 5px">
                    <svg width={legendGlyphSize} height={legendGlyphSize}>
                      <rect
                        fill={label.value}
                        width={legendGlyphSize}
                        height={legendGlyphSize}
                        rx={legendGlyphSize / 2}
                        ry={legendGlyphSize / 2}
                      />
                    </svg>
                    <LegendLabel
                      style={{
                        textAlign: "left",
                        margin: "0 0 0 4px",
                        fontSize: "13px",
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        minWidth: "0",
                      }}
                    >
                      {label.text}
                    </LegendLabel>
                  </LegendItem>
                ))}
              </div>
            )}
          </LegendOrdinal>
        </div>
        {tooltipOpen && tooltipData && !dragging && (
          <TooltipInPortal top={tooltipTop} left={tooltipLeft}>
            <TooltipContainer>
              <div className="column" key={tooltipData.x}>
                <div className="date">
                  {sample === "W"
                    ? getWeeklyTooltipDate(tooltipData.x)
                    : sample === "Q"
                    ? getQuarterlyTooltipDate(tooltipData.x)
                    : formatTooltipDate(tooltipData.x)}
                </div>
                <div className="value">
                  <ColoredSquare color={color} />
                  {units &&
                    (units === "$"
                      ? `${metricName} - $${formatTooltipNumber(tooltipData.y)}`
                      : units === "%"
                      ? `${metricName} - ${formatTooltipNumber(tooltipData.y)}%`
                      : `${metricName} - ${formatTooltipNumber(
                          tooltipData.y
                        )} ${units}`)}
                  {!units &&
                    `${formatTooltipNumber(tooltipData.y)} ${metricName}`}
                </div>
              </div>
            </TooltipContainer>
          </TooltipInPortal>
        )}
      </div>
    );
  }
);

const ColoredSquare = styled.div`
  display: inline-block;
  width: 11px;
  min-width: 11px;
  height: 11px;
  min-height: 11px;
  margin-right: 8px;
  background: ${({ color }) => color};
  border-radius: 4px;
`;

const TooltipContainer = styled.div`
  padding: 8px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #222222;
  display: flex;
  flex-direction: column;

  .date {
    font-size: 12px;
    margin-bottom: 8px;
    color: #222222;
    font-weight: 600;
  }
  .value {
    display: flex;
    align-items: center;
    font-weight: 400;
    color: #000000;
  }
`;
