$(document).ready(function () {
  //If the user is not authenticated then redirect to the login page
  if (!isAuthenticated()) {
    window.location.href = "/";
    return;
  }

  //BAR CHART-TOP 5 IN PROGRESS
  // Our labels along the x-axis
  var weeks = ["January", "February", "March", "April"];
  // For drawing the lines
  var User1 = [2, 10, 30, 48];
  var User2 = [2, 17, 29, 30];
  var User3 = [3, 5, 10, 15];
  var User4 = [10, 20, 25, 35];
  var User5 = [5, 10, 15, 39];

  var ctx = document.getElementById("my-chart-bar");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: weeks,
      datasets: [
        {
          data: User1,
          label: "S.Rodriguez",
          borderColor: "#3e95cd",
          fill: false
        },
        {
          data: User2,
          label: "J.Flahive",
          borderColor: "#DC143C",
          fill: false
        },
        {
          data: User3,
          label: "M.Hertz",
          borderColor: "#FF8C00",
          fill: false
        },
        {
          data: User4,
          label: "B.Khan",
          borderColor: "#FF00FF",
          fill: false
        },
        {
          data: User5,
          label: "J.Hamed",
          borderColor: "#9ACD32",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Top 5 Developers In Progress!",
        position: "top",
        fontSize: 20
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            ticks: {
              display: true,
              labelString: "Tasks Completed"
            }
          },
          min: 0,
          max: 50
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Weeks"
          },
          ticks: {
            min: 0,
            max: 30,
            stepSize: 1
          }
        }]
      }
    }
  });

  //PIE CHARTS-SUCCESS PER CATEGORY
  const pie1 = new Chart(document.getElementById("my-chart-pie1"), {
    type: 'pie',
    data: {
      labels: ["Completed", "Incomplete"],
      datasets: [{
        label: "Networking",
        backgroundColor: ["#3e95cd", "#8e5ea2"],
        data: [21, 67]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Networking'
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
            var total = meta.total;
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat((currentValue / total * 100).toFixed(1));
            return currentValue + " (" + percentage + "%)";
          },
          title: function (tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          }
        }
      }
    }
  });

  // document.getElementById("#legend").innerHTML = pie1.generateLegend();
  new Chart(document.getElementById("my-chart-pie2"), {
    type: 'pie',
    data: {
      labels: ["Completed", "Incomplete"],
      datasets: [{
        label: "Coding Exercises",
        backgroundColor: ["#3e95cd", "#8e5ea2"],
        data: [23, 55]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Coding Exercises'
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
            var total = meta.total;
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat((currentValue / total * 100).toFixed(1));
            return currentValue + " (" + percentage + "%)";
          },
          title: function (tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          }
        }
      }
    }
  });
  new Chart(document.getElementById("my-chart-pie3"), {
    type: 'pie',
    data: {
      labels: ["Completed", "Incomplete"],
      datasets: [{
        label: "Articles",
        backgroundColor: ["#3e95cd", "#8e5ea2"],
        data: [13, 48]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Articles'
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
            var total = meta.total;
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat((currentValue / total * 100).toFixed(1));
            return currentValue + " (" + percentage + "%)";
          },
          title: function (tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          }
        }
      }
    },

  });
  new Chart(document.getElementById("my-chart-pie4"), {
    type: 'pie',
    data: {
      labels: ["Completed", "Incomplete"],
      datasets: [{
        label: "Videos",
        backgroundColor: ["#3e95cd", "#8e5ea2"],
        data: [39, 75]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Videos'
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
            var total = meta.total;
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat((currentValue / total * 100).toFixed(1));
            return currentValue + " (" + percentage + "%)";
          },
          title: function (tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          }
        }
      }
    },

  });
});