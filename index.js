import axios from "axios";
import Chart from "chart.js";
import jsPDF from "jspdf";
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

const pdfFunction = () => {
  const pdf = new jsPDF("landscape");
  const myChartNode = document.querySelectorAll(".chart");
  for (let i = 0; i < myChartNode.length; i++) {
    const chart = myChartNode[i];
    const img = chart.toDataURL("image/png", 1.0);
    if (i > 0) {
      pdf.addPage();
    }
    pdf.addImage(img, "PNG", 10, 10, 280, 150);
  }

  pdf.save("report.pdf");
};

document.addEventListener("DOMContentLoaded", function() {
  renderGraph();

  const button = document.querySelector("#pdf-button");
  button.addEventListener("click", pdfFunction);
});
