import React, { useMemo, useCallback, useState, useEffect } from "react";
import { LegendItem, LegendLabel, LegendOrdinal } from "@visx/legend";
import { scaleTime, scaleLinear, scaleOrdinal } from "@visx/scale";
import { withTooltip, useTooltipInPortal } from "@visx/tooltip";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Line, Bar, LinePath } from "@visx/shape";
import { curveLinear } from "@visx/curve";
import { localPoint } from "@visx/event";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import styled from "styled-components";
import { extent, bisector } from "d3-array";
import { timeFormat, timeParse } from "d3-time-format";

import { formatTooltipNumber } from "../../../utils";
import EmptyWidget from "../Dashboard/EmptyWidget";

const tickColor = "#666666";
const gridColor = "#e1e1e1";
const background = "#ffffff";
const defaultMargin = { top: 10, left: 40, right: 30, bottom: 50 };
const legendGlyphSize = 10;

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
  qStart.setMonth(qStart.getMonth() - 1);
  qStart = convertDateFormat(qStart);
  let qEnd = new Date(date);
  qEnd.setMonth(qEnd.getMonth());
  qEnd = convertDateFormat(qEnd);
  return `${quarterlyFormat(parseDate(qStart))} - ${quarterlyFormat(
    parseDate(qEnd)
  )}`;
};

const convertMonthlyDateFormat = (date) =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

const convertDateFormat = (date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

// accessors
const bisectDate = bisector((d) => new Date(d.x)).left;
const xAccessor = (d) => new Date(d.x);
const yAccessor = (d) => d.y;

export default withTooltip(
  ({
    data = [],
    metricName,
    units,
    sample = "D",
    width,
    height,
    margin = defaultMargin,
    color = "#000000",
    dragging,
    tooltipLeft = 0,
    tooltipTop = 0,
    tooltipData,
    showTooltip,
    hideTooltip,
  }) => {
    const [numXTicks, setNumXTicks] = useState(0);
    const [numYTicks, setNumYTicks] = useState(0);

    const { containerRef, TooltipInPortal } = useTooltipInPortal({
      detectBounds: true,
      scroll: true,
    });

    useEffect(() => {
      if (data.length < 5) {
        setNumXTicks(data.length);
      } else {
        setNumXTicks(Math.floor(width / 100));
      }
    }, [width]);

    useEffect(() => {
      setNumYTicks(Math.floor(height / 35));
    }, [height]);

    const tooltipFormat = timeFormat(dateFormats[sample].tooltip);
    const xAxisFormat = timeFormat(dateFormats[sample].xAxis);
    const formatTooltipDate = (date) => tooltipFormat(parseDate(date));
    const formatXAxisDate = (date) =>
      xAxisFormat(
        parseDate(
          sample === "M" || sample === "Y"
            ? convertMonthlyDateFormat(date)
            : convertDateFormat(date)
        )
      );

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const maxYValue = Math.max(...data.map(yAccessor));
    let yDomainMax;
    if (maxYValue < 10) {
      yDomainMax = maxYValue + 1;
    } else {
      yDomainMax = Math.ceil(maxYValue / 10) * 10 + 10;
    }

    // scales
    const xScale = useMemo(
      () =>
        scaleTime({
          range: [0, xMax],
          domain: extent(data, xAccessor),
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
      [yMax, yDomainMax]
    );

    const colorScale = scaleOrdinal({
      domain: [metricName],
      range: [color],
    });

    // tooltip handler
    const handleTooltip = useCallback(
      (event) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = xScale.invert(x - margin.left);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && xAccessor(d1)) {
          d =
            x0.valueOf() - xAccessor(d0).valueOf() >
            xAccessor(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: xScale(xAccessor(d)),
          tooltipTop: yScale(yAccessor(d)),
        });
      },
      [showTooltip, yScale, xScale]
    );

    if (data.length <= 1) return <EmptyWidget />;

    return width < 10 ? null : (
      <div style={{ position: "relative", width, overflow: "visible" }}>
        <svg ref={containerRef} width={width} height={height}>
          <rect width={width} height={height} fill={background} rx={14} />
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
            <LinePath
              data={data}
              x={(d) => xScale(xAccessor(d)) ?? 0}
              y={(d) => yScale(yAccessor(d)) ?? 0}
              strokeWidth={2}
              stroke={color}
              curve={curveLinear}
            />
            <Bar
              y={margin.top}
              width={xMax}
              height={yMax}
              fill="transparent"
              rx={14}
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              onMouseLeave={() => hideTooltip()}
            />
            {tooltipData && !dragging && (
              <g>
                <Line
                  from={{ x: tooltipLeft, y: 0 }}
                  to={{ x: tooltipLeft, y: yMax }}
                  stroke={color}
                  strokeWidth={1}
                  pointerEvents="none"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop + 1}
                  r={4}
                  fill="black"
                  fillOpacity={0.1}
                  stroke="black"
                  strokeOpacity={0.1}
                  strokeWidth={2}
                  pointerEvents="none"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={4}
                  fill={color}
                  stroke="white"
                  strokeWidth={2}
                  pointerEvents="none"
                />
              </g>
            )}
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
              <div style={{ display: "flex", flexDirection: "row" }}>
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
        {tooltipData && !dragging && (
          <div>
            <TooltipInPortal
              key={Math.random()}
              top={
                tooltipTop - (yScale(yAccessor(tooltipData)) === yMax ? 80 : 30)
              }
              left={tooltipLeft + 40}
            >
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
                        ? `${metricName} - $${formatTooltipNumber(
                            tooltipData.y
                          )}`
                        : units === "%"
                        ? `${metricName} - ${formatTooltipNumber(
                            tooltipData.y
                          )}%`
                        : `${metricName} - ${formatTooltipNumber(
                            tooltipData.y
                          )} ${units}`)}
                    {!units &&
                      `${formatTooltipNumber(tooltipData.y)} ${metricName}`}
                  </div>
                </div>
              </TooltipContainer>
            </TooltipInPortal>
          </div>
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
  max-width: 200px;

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
