import { useContext, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import { IoIosLock, IoIosUnlock } from "react-icons/io";

import "./Sidebar.css";
import SidebarOptionButton from "./SidebarOptionButton";
import { EmojiPicker, CommandLine, BrandIcons20 } from "..";
import { GlobalFunctionsContext, GlobalStateContext } from "../../../Context";
import { handleCaughtError, toTitleCase } from "../../../utils";
import { GlobalButton } from "../Buttons";

const iconSize = 16;

const typeOptions = [
  {
    icon: null,
    title: "Chart",
    type: null,
  },
  {
    icon: null,
    title: "Statistic",
    type: null,
  },
];

const chartTypeOptions = [
  // {
  //   icon: null,
  //   title: "Donut Chart",
  //   type: null,
  // },
  {
    icon: null,
    title: "Line Chart",
    type: null,
  },
  {
    icon: null,
    title: "Bar Chart",
    type: null,
  },
  // {
  //   icon: null,
  //   title: "Pie Chart",
  //   type: null,
  // },
];

const periodOptions = [
  { title: "Last 7 days" },
  { title: "Last 30 days" },
  { title: "Last 3 months" },
  { title: "Last 6 months" },
  { title: "Last 1 year" },
  { title: "All Data" },
  // { title: "Custom Period..." },
];

const sampleOptions = [
  { title: "Daily", key: "D" },
  { title: "Weekly", key: "W" },
  { title: "Monthly", key: "M" },
  // { title: "Quarterly", key: "Q" },
  { title: "Yearly", key: "Y" },
];

const sampleKeys = {
  D: "Daily",
  W: "Weekly",
  M: "Monthly",
  Q: "Quarterly",
  Y: "Yearly",
};

const Sidebar = ({
  setOpen,
  selectedWidgetId,
  setSelectedWidgetId,
  widget,
  locked,
  onClickLock,
  onClickDelete,
  onChangeWidgetTitle,
  onChangeWidgetIcon,
  onClickCreateWidget,
  setDragging,
}) => {
  const { getDataFromMetricName, editWidget } = useContext(
    GlobalFunctionsContext
  );
  const {
    sourcesList,
    metricNamesList,
    metricNamesObject,
    widgetData,
    dashboardWidgets,
  } = useContext(GlobalStateContext);

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(
    widget ? widget.icon.value : "📊"
  );
  const [widgetTitle, setWidgetTitle] = useState(widget ? widget.title : "");
  const [source, setSource] = useState(null);
  const [metric, setMetric] = useState(null);
  const [type, setType] = useState(null);
  const [chartType, setChartType] = useState(null);
  const [period, setPeriod] = useState(null);
  const [sample, setSample] = useState(null);

  const [sourceCommandOpen, setSourceCommandOpen] = useState(false);
  const [metricCommandOpen, setMetricCommandOpen] = useState(false);
  const [typeCommandOpen, setTypeCommandOpen] = useState(false);
  const [chartTypeCommandOpen, setChartTypeCommandOpen] = useState(false);
  const [periodCommandOpen, setPeriodCommandOpen] = useState(false);
  const [sampleCommandOpen, setSampleCommandOpen] = useState(false);

  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [createButtonLoading, setCreateButtonLoading] = useState(false);

  let titleRef = useRef(null);

  useEffect(() => {
    setChosenEmoji(widget ? widget.icon.value : "📊");
    setWidgetTitle(widget ? widget.title : "");
    setType(widget ? { title: toTitleCase(widget.type) } : "");
    setChartType(
      widget && widget.subType ? { title: toTitleCase(widget.subType) } : ""
    );

    let metricName = widget ? widget.metrics[0].metricName : null;
    let widgetSourceTitle = widget
      ? metricNamesObject[metricName].sourceName
      : null;
    let widgetSource;
    if (widgetSourceTitle) {
      widgetSource = {
        title: toTitleCase(widgetSourceTitle),
        type: "Application",
        icon: BrandIcons20[widgetSourceTitle.toLowerCase()],
      };
    }
    setSource(widgetSource ? widgetSource : "");

    let metricTitle = metricName ? metricNamesObject[metricName].title : null;
    let widgetMetric;
    if (metricTitle) {
      widgetMetric = {
        icon: null,
        source: toTitleCase(widgetSourceTitle),
        title: metricTitle,
        metricName,
        type: null,
      };
    }
    setMetric(widgetMetric ? widgetMetric : "");

    let metricPeriod = metricName ? widget.metrics[0].timePeriod : null;
    let widgetPeriod;
    if (metricPeriod) {
      widgetPeriod = {
        title: metricPeriod,
      };
    }
    setPeriod(widgetPeriod ? widgetPeriod : "");

    let metricSample = metricName ? widget.metrics[0].sample : null;
    let widgetSample;
    if (metricSample) {
      widgetSample = {
        key: metricSample,
        title: sampleKeys[metricSample],
      };
    }
    setSample(widgetSample ? widgetSample : "");
  }, [widget]);

  useEffect(() => {
    if (sourceCommandOpen) {
      setHighlightedIndex(0);
      setDragging(true);
    } else if (metricCommandOpen) {
      setHighlightedIndex(1);
      setDragging(true);
    } else if (typeCommandOpen) {
      setHighlightedIndex(2);
      setDragging(true);
    } else if (chartTypeCommandOpen) {
      setHighlightedIndex(3);
      setDragging(true);
    } else if (periodCommandOpen) {
      setHighlightedIndex(4);
      setDragging(true);
    } else if (
      !(
        sourceCommandOpen &&
        metricCommandOpen &&
        typeCommandOpen &&
        chartTypeCommandOpen &&
        periodCommandOpen
      )
    ) {
      setHighlightedIndex(null);
      setDragging(false);
    }
  }, [
    sourceCommandOpen,
    metricCommandOpen,
    typeCommandOpen,
    chartTypeCommandOpen,
    periodCommandOpen,
  ]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      titleRef.current.blur();
      if (!widget && !source) {
        setSourceCommandOpen(true);
      }
    } else if (e.key === "Tab") {
      titleRef.current.blur();
      setSourceCommandOpen(true);
    }
  };

  const getSourceIndex = (sourceName) => {
    for (let i = 0; i < sourcesList.length; i++) {
      if (sourcesList[i].sourceName === sourceName) {
        return i;
      }
    }
  };

  const onSelectEmoji = (emoji) => {
    setChosenEmoji(emoji.native);
    if (widget) {
      onChangeWidgetIcon(selectedWidgetId, emoji.native);
    }
  };

  const onChangeWidget = (widgetId, newWidget) => {
    editWidget(widgetId, newWidget);
  };

  const onSelectWidgetMetric = (selection) => {
    let previousMetric;
    if (metric) {
      previousMetric = JSON.parse(JSON.stringify(metric));
    }
    setMetric(selection);

    if (!source) {
      let sourceIndex = getSourceIndex(selection.sourceName);
      setSource(sourcesList[sourceIndex]);
    }

    if (widget) {
      if (selection.metricName === previousMetric?.metricName) {
        return;
      }

      let widgetId = widget.widgetId;

      let oldMetric = JSON.parse(
        JSON.stringify(dashboardWidgets[widgetId].metrics[0])
      );
      let mergedMetric = { ...oldMetric, ...selection };
      let newWidget = JSON.parse(JSON.stringify(dashboardWidgets[widgetId]));
      newWidget.metrics[0] = mergedMetric;

      try {
        if (!(selection.metricName in widgetData)) {
          getDataFromMetricName(selection.metricName);
        }
        onChangeWidget(widgetId, newWidget, true);
      } catch (err) {
        handleCaughtError(err);
        setMetric(previousMetric);
      }
    } else {
      setTypeCommandOpen(true);
    }
  };

  const onSelectWidgetType = (selection) => {
    let previousType;
    if (type) {
      previousType = JSON.parse(JSON.stringify(type));
    }
    setType(selection);

    if (widget) {
      if (selection.title === previousType?.title) {
        return;
      }

      let widgetId = widget.widgetId;
      let newWidget = JSON.parse(JSON.stringify(dashboardWidgets[widgetId]));
      newWidget.type = selection.title;
      if (selection.title === "Chart" && !chartType) {
        newWidget.subType = "Line Chart";
        setChartType({ icon: null, title: "Line Chart", type: null });
      }

      try {
        onChangeWidget(widgetId, newWidget);
      } catch (err) {
        handleCaughtError(err);
        setType(previousType);
      }
    } else if (selection.title.toLowerCase() === "chart") {
      setChartTypeCommandOpen(true);
    }
  };

  const onSelectWidgetChartType = (selection) => {
    let previousChartType;
    if (chartType) {
      previousChartType = JSON.parse(JSON.stringify(chartType));
    }
    setChartType(selection);

    if (widget) {
      if (selection.title === previousChartType?.title) {
        return;
      }

      let widgetId = widget.widgetId;
      let newWidget = JSON.parse(JSON.stringify(dashboardWidgets[widgetId]));
      newWidget.subType = selection.title;

      try {
        onChangeWidget(widgetId, newWidget);
      } catch (err) {
        handleCaughtError(err);
        setChartType(previousChartType);
      }
    }
  };

  const onSelectWidgetPeriod = (selection) => {
    let previousPeriod;
    if (period) {
      previousPeriod = JSON.parse(JSON.stringify(period));
    }
    if (selection.title === "All Data") {
      setPeriod(null);
    } else {
      setPeriod(selection);
    }

    if (widget) {
      if (selection.title === previousPeriod?.title) {
        return;
      }

      let widgetId = widget.widgetId;
      let newWidget = JSON.parse(JSON.stringify(dashboardWidgets[widgetId]));
      if (selection.title === "All Data") {
        newWidget.metrics[0].timePeriod = null;
      } else {
        newWidget.metrics[0].timePeriod = [selection.title];
      }

      try {
        onChangeWidget(widgetId, newWidget);
      } catch (err) {
        handleCaughtError(err);
        setPeriod(previousPeriod);
      }
    }
  };

  const onSelectWidgetSample = (selection) => {
    let previousSample;
    if (sample) {
      previousSample = JSON.parse(JSON.stringify(sample));
    }
    setSample(selection);

    if (widget) {
      if (selection.title === previousSample?.title) {
        return;
      }

      let widgetId = widget.widgetId;
      let newWidget = JSON.parse(JSON.stringify(dashboardWidgets[widgetId]));
      newWidget.metrics[0].sample = selection.key;

      try {
        onChangeWidget(widgetId, newWidget);
      } catch (err) {
        handleCaughtError(err);
        setSample(previousSample);
      }
    }
  };

  const onClickCreate = () => {
    setCreateButtonLoading(true);
    onClickCreateWidget(
      widgetTitle,
      chosenEmoji,
      metric.metricName,
      type,
      chartType,
      period,
      sample
    );
    setCreateButtonLoading(false);
  };

  return (
    <div className="sidebar-body">
      <div className="editor-section" style={{ paddingTop: "0px" }}>
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="widget-editor-title">
            {widget ? "Widget Editor" : "Widget Creator"}
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: "20px",
            }}
          >
            {!locked && widget && (
              <IoMdTrash
                className="widget-button"
                size={iconSize + 4}
                onClick={onClickDelete}
              />
            )}
            {locked && widget && (
              <IoIosLock
                color="#27282b"
                className="widget-button"
                size={iconSize + 4}
                onClick={onClickLock}
                style={{ paddingBottom: "1px" }}
              />
            )}
            {!locked && widget && (
              <IoIosUnlock
                className="widget-button"
                size={iconSize + 4}
                onClick={onClickLock}
                style={{ paddingBottom: "1px" }}
              />
            )}
            <IoClose
              className="widget-button"
              size={iconSize + 4}
              onClick={() => {
                setOpen(false);
                setSelectedWidgetId(null);
              }}
            />
          </span>
        </span>
      </div>
      <div className="editor-section">
        <div className="header-section">
          <div className="icon-button-section">
            <EmojiPicker
              open={emojiPickerOpen}
              setOpen={locked ? () => {} : setEmojiPickerOpen}
              chosenEmoji={chosenEmoji}
              onClick={onSelectEmoji}
              pickerStyle={{
                position: "absolute",
                top: "50px",
                left: "-210px",
                zIndex: "1000",
              }}
            />
          </div>
          <div className="title-field-section">
            <input
              className="title-field"
              style={{ color: locked ? "#90959d" : "#27282b" }}
              value={widgetTitle}
              onChange={(e) => setWidgetTitle(e.target.value)}
              onBlur={() => onChangeWidgetTitle(selectedWidgetId, widgetTitle)}
              type="text"
              readOnly={locked}
              ref={titleRef}
              onKeyDown={onKeyDown}
            />
          </div>
        </div>
      </div>
      <div className="editor-section">
        <SidebarOptionButton
          caption="Data Source"
          title={source?.title}
          contentIcon={source?.icon}
          onClick={() => {
            setSourceCommandOpen(true);
          }}
          locked={locked}
          highlighted={highlightedIndex === 0}
        />
      </div>
      <div className="editor-section">
        <SidebarOptionButton
          caption="Metric"
          title={metric?.title}
          onClick={() => {
            setMetricCommandOpen(true);
          }}
          locked={locked}
          highlighted={highlightedIndex === 1}
        />
      </div>
      <div className="editor-section">
        <SidebarOptionButton
          caption="Widget Type"
          title={type?.title}
          onClick={() => {
            setTypeCommandOpen(true);
          }}
          locked={locked}
          highlighted={highlightedIndex === 2}
        />
      </div>
      {type?.title?.toLowerCase() === "chart" && (
        <div className="editor-section">
          <SidebarOptionButton
            caption="Chart Type"
            title={chartType?.title}
            onClick={() => {
              setChartTypeCommandOpen(true);
            }}
            locked={locked}
            highlighted={highlightedIndex === 3}
          />
        </div>
      )}
      {type?.title?.toLowerCase() !== "statistic" && (
        <div className="editor-section">
          <SidebarOptionButton
            caption="Sample"
            title={sample?.title}
            onClick={() => {
              setSampleCommandOpen(true);
            }}
            locked={locked}
            highlighted={highlightedIndex === 5}
          />
        </div>
      )}
      <div className="editor-section">
        <SidebarOptionButton
          caption="Period"
          title={period?.title}
          onClick={() => {
            setPeriodCommandOpen(true);
          }}
          locked={locked}
          highlighted={highlightedIndex === 4}
        />
      </div>
      {!widget && (
        <div
          className="editor-section"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GlobalButton
            onClick={onClickCreate}
            loading={createButtonLoading}
            active={
              widgetTitle &&
              source &&
              metric &&
              type &&
              (chartType || type.title.toLowerCase() !== "chart")
            }
          >
            Create
          </GlobalButton>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: "translate(-50%, -30px)",
        }}
      >
        {sourceCommandOpen && (
          <CommandLine
            prompt="Search your data sources"
            options={sourcesList}
            onSelect={(selection) => {
              setSource(selection);
              setMetricCommandOpen(true);
            }}
            setOpen={setSourceCommandOpen}
            onNext={() => {
              setSourceCommandOpen(false);
              setMetricCommandOpen(true);
            }}
          />
        )}
        {metricCommandOpen && (
          <CommandLine
            prompt="Search your metrics"
            options={metricNamesList.filter((metric) => {
              if (source) {
                return (
                  metric.sourceName.toLowerCase() === source.title.toLowerCase()
                );
              } else {
                return metric;
              }
            })}
            onSelect={(selection) => onSelectWidgetMetric(selection)}
            setOpen={setMetricCommandOpen}
            onNext={() => {
              setMetricCommandOpen(false);
              setTypeCommandOpen(true);
            }}
          />
        )}
        {typeCommandOpen && (
          <CommandLine
            prompt="Choose a widget type"
            options={typeOptions}
            onSelect={(selection) => onSelectWidgetType(selection)}
            setOpen={setTypeCommandOpen}
            onNext={() => {
              setTypeCommandOpen(false);
              if (type && type.title !== "Statistic") {
                setChartTypeCommandOpen(true);
              } else {
                setPeriodCommandOpen(true);
              }
            }}
          />
        )}
        {chartTypeCommandOpen && (
          <CommandLine
            prompt="Choose a chart type"
            options={chartTypeOptions}
            onSelect={(selection) => onSelectWidgetChartType(selection)}
            setOpen={setChartTypeCommandOpen}
            onNext={() => {
              setChartTypeCommandOpen(false);
              setSampleCommandOpen(true);
            }}
          />
        )}
        {sampleCommandOpen && (
          <CommandLine
            period
            prompt="Pick a sample"
            options={sampleOptions}
            onSelect={(selection) => onSelectWidgetSample(selection)}
            setOpen={setSampleCommandOpen}
            onNext={() => {
              setSampleCommandOpen(false);
              setPeriodCommandOpen(true);
            }}
          />
        )}
        {periodCommandOpen && (
          <CommandLine
            period
            prompt="Pick a period"
            options={periodOptions}
            onSelect={(selection) => onSelectWidgetPeriod(selection)}
            setOpen={setPeriodCommandOpen}
            onNext={() => {
              setPeriodCommandOpen(false);
              setHighlightedIndex(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
