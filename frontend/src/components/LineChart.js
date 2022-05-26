import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineChart = ({ chartData }) => {
  return (
    <Line
      data={chartData}
      options={{
        maintainAspectRatio: false,
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
    ></Line>
  );
};

export default LineChart;
