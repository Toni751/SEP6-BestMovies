import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData }) => {
  return (
    <Pie
      data={chartData}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
      }}
    ></Pie>
  );
};

export default PieChart;
