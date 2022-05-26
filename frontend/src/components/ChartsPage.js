import React, { useEffect, useState } from "react";
import nerd from "../images/nerd.png";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import peopleservice from "../services/peopleservice";
import movieservice from "../services/movieservice";
import "../styles/ChartsPage.css";

const ChartsPage = () => {
  const [actorsChartData, setActorsChartData] = useState({});
  const [directorsChartData, setDirectorsChartData] = useState({});
  const [yearsChartData, setYearsChartData] = useState({});

  useEffect(() => {
    fetchAndSetBarChartData();
    fetchAndSetLineChartData();
  }, []);

  const fetchAndSetLineChartData = () => {
    movieservice
      .getMoviesYearAverage()
      .then((response) => {
        console.log("years console log", response.data);
        setYearsChart(response.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchAndSetBarChartData = () => {
    peopleservice
      .getHighestRatedPeople()
      .then((response) => {
        setActorsChart(response.data.actors);
        setDirectorsChart(response.data.directors);
      })
      .catch((err) => console.log(err));
  };

  const setActorsChart = (data) => {
    setActorsChartData({
      labels: data.map((obj) => obj.name),

      datasets: [
        {
          label: "Actors",
          data: data.map((obj) => obj.average),
          backgroundColor: ["#f4cb92", "#e8931c", "#b97516"],
        },
      ],
    });
  };
  const setDirectorsChart = (data) => {
    setDirectorsChartData({
      labels: data.map((obj) => obj.name),

      datasets: [
        {
          label: "Directors",
          data: data.map((obj) => obj.average),
          backgroundColor: ["#f4cb92", "#e8931c", "#b97516"],
        },
      ],
    });
  };

  const setYearsChart = (data) => {
    setYearsChartData({
      labels: data.map((obj) => obj._id),

      datasets: [
        {
          label: "Year's average",
          data: data.map((obj) => obj.average),
          backgroundColor: ["#f4cb92", "#e8931c", "#b97516"],
          borderColor: "white",
        },
      ],
    });
  };

  return (
    <div className="discover_div">
      <div className="header_w_icon_div">
        <p className="subheader inter_bold">Statistics </p>
        <img src={nerd} alt="Nerd Icon" width="30px" height="30px"></img>
      </div>
      {Object.keys(actorsChartData).length !== 0 &&
        Object.keys(directorsChartData).length !== 0 &&
        Object.keys(actorsChartData).length !== 0 && (
          <div className="charts_page_div">
            <div className="charts_div">
              <div className="single_chart_div">
                <p className="sub_subheader inter_bold">Highest rated actors</p>
                <BarChart
                  chartData={actorsChartData}
                  className="charts fav_bar_chart"
                ></BarChart>
              </div>
              <div className="single_chart_div">
                <p className="sub_subheader inter_bold">
                  Highest rated directors
                </p>
                <BarChart
                  chartData={directorsChartData}
                  axis={"y"}
                  className="charts fav_bar_chart"
                ></BarChart>
              </div>
            </div>
            <div className="line_chart_div">
              <p className="sub_subheader inter_bold">
                Average ratings over the years
              </p>
              <LineChart chartData={yearsChartData}></LineChart>
            </div>
          </div>
        )}
    </div>
  );
};

export default ChartsPage;
