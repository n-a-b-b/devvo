
// var pieData = [
//   {
//       value: 20,
//       color:"#878BB6"
//   },
//   {
//       value : 40,
//       color : "#4ACAB4"
//   },
//   {
//       value : 10,
//       color : "#FF8153"
//   },
//   {
//       value : 30,
//       color : "#FFEA88"
//   }
// ];
// // Get the context of the canvas element we want to select
// var countries= document.getElementById("countries").getContext("2d");
// new Chart(countries).Pie(pieData);

// Our labels along the x-axis
var activitiesCompleted = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
// For drawing the lines
var User1 = [2, 5, 7, 10, 13, 17, 22, 30, 35, 39, 43, 48, 50];
var User2 = [2, 6, 7, 10, 16, 17, 29, 30];
var User3 = [3, 5, 10, 15, 17, 19, 20, 25];
var User4 = [5, 8, 10, 15, 20, 25, 35];
var User5 = [5, 10, 15];

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: activitiesCompleted,
    datasets: [
      { 
        data: User1,
        label: "User1",
        borderColor: "#3e95cd",
        fill: false
      },
      { 
        data: User2,
        label: "User2",
        borderColor: "#DC143C",
        fill: false
      },
      { 
        data: User3,
        label: "User3",
        borderColor: "#FF8C00",
        fill: false
      },
      { 
        data: User4,
        label: "User4",
        borderColor: "#FF00FF",
        fill: false
      },
      { 
        data: User5,
        label: "User5",
        borderColor: "#9ACD32",
        fill: false
      }
    ]
  }
});