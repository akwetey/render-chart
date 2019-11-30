import axios from "axios";
import Chart from "chart.js";
const randomColor = require("randomcolor");

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
    const bg = [];

    res.forEach(el => {
      console.log(el.population.toLocaleString());
      data.push(el.population);
      label.push(el.name);
      bg.push(
        randomColor({
          luminosity: "bright",
          format: "rgba",
          alpha: 0.5
        })
      );
    });

    const graphData = {
      labels: label,
      datasets: [
        {
          label: "Population",
          backgroundColor: bg,
          data: data
        }
      ]
    };
    const graphData1 = {
      labels: label,
      datasets: [
        {
          label: "Population",
          backgroundColor: bg,
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
