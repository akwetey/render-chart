import axios from "axios";
import Chart from "chart.js";

async function fetchUsers(url) {
  try {
    const response = await axios.get(url);
    return await response.data;
  } catch {
    err => console.error(err);
  }
}

function chartUsers() {
  fetchUsers("https://jsonplaceholder.typicode.com/users").then(res => {
    const data = [];
    const label = [];

    res.forEach(el => {
      data.push(el.id);
      label.push(el.name);
    });

    const graphData = {
      labels: label,
      datasets: [
        {
          label: "Users in the system",
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
      data: graphData
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  chartUsers();
});
