const periodSampleCombos = {
  "last 7 days": {
    D: 7,
    W: 1,
    M: null,
    Q: null,
    Y: null,
  },
  "last 14 days": {
    D: 14,
    W: 2,
    M: null,
    Q: null,
    Y: null,
  },
  "last 30 days": {
    D: 30,
    W: 4,
    M: 1,
    Q: null,
    Y: null,
  },
  "last 3 months": {
    D: 90,
    W: 12,
    M: 3,
    Q: 1,
    Y: null,
  },
  "last 6 months": {
    D: 182,
    W: 26,
    M: 6,
    Q: 2,
    Y: null,
  },
  "last 1 year": {
    D: 365,
    W: 52,
    M: 12,
    Q: 4,
    Y: 1,
  },
};

const handleCaughtError = (
  err,
  messagePrefix = "Handled Error:",
  sentry = true
) => {
  if (sentry && process.env.REACT_APP_FRONTEND !== "local") {
    // Sentry.captureException(err);
  }
  console.error(`${messagePrefix} ${err.message}`);
};

const ConsoleHelper = (...messages) => {
  // if (process.env.REACT_APP_DEV === "false") return;
  console.log(...messages);
};

const parsePeriod = (dataObject, timePeriod, sample = "D") => {
  let derivedData = JSON.parse(JSON.stringify(dataObject));

  if (timePeriod) {
    if (timePeriod.length === 2) {
      // Parse date strings into JS dates
      let startDate = new Date(parseInt(timePeriod[0]));
      let endDate = new Date(parseInt(timePeriod[1]));

      // Filter Data by start/end dates
      derivedData = filterByPeriod(derivedData, startDate, endDate);
    } else if (timePeriod.length === 1) {
      // If timePeriod uses default setting

      let dataLength = derivedData.xAxis.length;
      let sliceLength = periodSampleCombos[timePeriod[0].toLowerCase()][sample];
      let sliceIndex = dataLength - sliceLength;
      if (sliceIndex >= 0) {
        derivedData.xAxis = derivedData.xAxis.slice(sliceIndex);
        derivedData.yAxis = derivedData.yAxis.slice(sliceIndex);
      }
    }
  }
  return derivedData;
};

// Filter function to get filtered arrays based on start & end date
const filterByPeriod = (dataObject, startDate, endDate) => {
  let startDateIndex;
  for (
    startDateIndex = dataObject.xAxis.length - 1;
    startDateIndex >= 0;
    startDateIndex--
  ) {
    let tempDate = new Date(dataObject.xAxis[startDateIndex]);
    if (tempDate.getTime() < startDate.getTime()) {
      break;
    }
  }
  dataObject.xAxis = dataObject.xAxis.slice(startDateIndex);
  dataObject.yAxis = dataObject.yAxis.slice(startDateIndex);
  return dataObject;
};

const toTitleCase = (input) => {
  let result = [];
  let words = input.split(" ");
  for (var i = 0; i < words.length; i++) {
    result.push(
      words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()
    );
  }
  return result.join(" ");
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatTooltipNumber = (num) => {
  let figure = (Math.round((num + Number.EPSILON) * 100) / 100);
  return numberWithCommas(figure);
};

const formatStatistic = (
  data,
  units,
  metricName,
  sumStrategy,
  period = null
) => {
  let title;
  let subTitle;
  let figure;
  switch (sumStrategy) {
    case "recent": {
      figure = data.yAxis[data.yAxis.length - 1];
      break;
    }
    case "total": {
      figure = data.yAxis.reduce((a, b) => a + b, 0);
      break;
    }
    case "average": {
      figure = data.yAxis.reduce((a, b) => a + b, 0);
      figure = figure / data.yAxis.length;
      break;
    }
    default: {
      break;
    }
  }
  figure = (Math.round((figure + Number.EPSILON) * 100) / 100).toFixed(2);
  if (figure % 1 === 0) {
    figure = Math.floor(figure)
  }
  figure = numberWithCommas(figure);
  if (!units) {
    title = figure;
  } else {
    if (units === "$") {
      title = `$${figure}`;
    } else if (units === "%") {
      title = `${figure}%`;
    } else {
      title = `${figure} ${units}`;
    }
  }

  if (period) {
    subTitle = `${metricName} in the ${period}`;
  } else {
    subTitle = `Total ${metricName}`;
  }
  return { title, subTitle };
};

export {
  handleCaughtError,
  ConsoleHelper,
  parsePeriod,
  toTitleCase,
  numberWithCommas,
  formatStatistic,
  formatTooltipNumber,
};
