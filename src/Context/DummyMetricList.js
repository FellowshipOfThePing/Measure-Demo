let metrics = {
  MRR: {
    metricName: "MRR",
    dashboardReady: true,
    sourceName: "stripe",
    sumStrategy: "recent",
    units: "$",
    title: "MRR",
  },
  "Net Volume": {
    metricName: "Net Volume",
    dashboardReady: true,
    sourceName: "stripe",
    sumStrategy: "total",
    units: "$",
    title: "Net Volume",
  },
  "New Subscribers": {
    metricName: "New Subscribers",
    dashboardReady: true,
    sourceName: "stripe",
    sumStrategy: "total",
    title: "New Subscribers",
  },
  Bouncerate: {
    metricName: "Bouncerate",
    dashboardReady: true,
    sourceName: "google analytics",
    sumStrategy: "average",
    units: "%",
    title: "Bounce Rate",
  },
  Sessionsperuser: {
    metricName: "Sessionsperuser",
    dashboardReady: true,
    sourceName: "google analytics",
    sumStrategy: "average",
    title: "Sessions Per User",
  },
  Users: {
    metricName: "Users",
    dashboardReady: true,
    sourceName: "google analytics",
    sumStrategy: "total",
    title: "Users",
  },
};

export default metrics;
