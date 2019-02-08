
// Our labels along the x-axis
var weeks = ["January", "February", "March", "April"];
// For drawing the lines
var User1 = [2, 10, 30, 48];
var User2 = [2, 17, 29, 30];
var User3 = [3, 5, 10, 15];
var User4 = [10, 20, 25, 35];
var User5 = [5, 10, 15, 39];

var ctx = document.getElementById("myChart");
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
      yAxes:[{
        scaleLabel:{
          ticks: {
            display: true,
            labelString: "Tasks Completed"
          }
        },
        min: 0,
        max: 50
      }],
      xAxes: [{
        scaleLabel:{
          display: true,
          labelString:"Weeks"
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