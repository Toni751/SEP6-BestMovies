import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData, axis }) => {
  return (
    <Bar
      data={chartData}
      options={{
        indexAxis: axis,
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
