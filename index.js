import axios from "axios";
import Chart from "chart.js";

async function fetchCountries(url) {
  try {
    const response = await axios.get(url);
    return await response.data;
  } catch {
    err => console.error(err);
  }
}

function renderGraph() {
  fetchCountries("https://restcountries.eu/rest/v2/region/africa").then(res => {
    const data = [];
    const label = [];

    res.forEach(el => {
      console.log(el.population.toLocaleString());
      data.push(el.population);
      label.push(el.name);
    });

    const graphData = {
      labels: label,
      datasets: [
        {
          label: "Population",
          backgroundColor: "#49e2ff",
          borderColor: "#46d5f1",
          hoverBackgroundColor: "#CCCCCC",
          hoverBorderColor: "#666666",
          data: data
        }
      ]
    };
    const graphData1 = {
      labels: label,
      datasets: [
        {
          label: "Population",
          backgroundColor: "rgb(244, 100, 95)",
          borderColor: "rgb(244, 100, 95)",
          hoverBackgroundColor: "rgb(8, 8, 8)",
          hoverBorderColor: "rgb(8, 8, 8)",
          data: data
        }
      ]
    };

    const ctx = document.getElementById("myChart").getContext("2d");
    const ctx1 = document.getElementById("myChart1").getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",
      data: graphData,
      //
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                autoSkip: false
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.yLabel.toLocaleString();
            }
          }
        }
      }
    });
    const pie = new Chart(ctx1, {
      type: "line",
      data: graphData1,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                autoSkip: false
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.yLabel.toLocaleString();
            }
          }
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  renderGraph();
});
