import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";

const BarChart = ({ chartData }) => {
  return (
    <Bar
      data={chartData}
      options={{
        indexAxis: "y",
        color: "white",
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            ticks: {
              color: "white",
            },
          },
          x: {
            ticks: {
              color: "white",
            },
          },
        },
      }}
    ></Bar>
  );
};

export default BarChart;
