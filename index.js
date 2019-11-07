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
      data.push(el.population);
      label.push(el.name);
      console.table(el);
    });

    const graphData = {
      labels: label,
      datasets: [
        {
          label: "Population of African Countries",
          backgroundColor: "#49e2ff",
          borderColor: "#46d5f1",
          hoverBackgroundColor: "#CCCCCC",
          hoverBorderColor: "#666666",
          data: data
        }
      ]
    };

    const ctx = document.getElementById("myChart").getContext("2d");

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
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  renderGraph();
});
