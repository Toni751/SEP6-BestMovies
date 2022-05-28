import React, { useState, useEffect, useContext } from "react";
import "../styles/Commons.css";
import sparkles from "../images/sparkles.png";
import MovieListPagination from "./MovieListPagination";
import userservice from "../services/userservice";
import { AuthContext } from "../auth/AuthProvider";
import "../styles/Favourites.css";
import MovieList from "./MovieList";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const Favourites = () => {
  const auth = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [seeTab, setSeeTab] = useState("movies");
  const [pieChartData, setPieChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});

  useEffect(() => {
    fetchMovies(page);
  }, []);

  const getUserId = () => {
    return auth.user ? auth.user.username : null;
  };

  const fetchMovies = (currentPage) => {
    userservice
      .getUserToplist(getUserId(), currentPage)
      .then((response) => {
        console.log("Favourite movies: ", response.data);
        setMovies(response.data.movies);
        setTotalNumberOfPages(response.data.totalNumberOfPages);
        console.log(movies);
      })
      .catch((err) => console.log(err));
  };

  const handleCallback = (current_page_index) => {
    setPage(current_page_index);
    fetchMovies(current_page_index);
  };

  const goToMovies = () => {
    setSeeTab("movies");
  };

  const goToCharts = () => {
    setSeeTab("charts");
    fetchAndSetPieChartData();
    fetchAndSetBarChartData();
  };

  const fetchAndSetPieChartData = () => {
    userservice
      .getUserGenres(getUserId())
      .then((response) => {
        console.log("User genres: ", response.data);
        setPieChart(response.data);
      })
      .catch((err) => console.log(err));
  };

  const setPieChart = (data) => {
    setPieChartData({
      labels: data.map((genres) => genres.name),

      datasets: [
        {
          label: "Genres",
          data: data.map((genres) => genres.count),
          backgroundColor: ["#f4cb92", "#e8931c", "#b97516"],
          width: "100px",
        },
      ],
    });
  };

  const fetchAndSetBarChartData = () => {
    userservice
      .getUserYears(getUserId())
      .then((response) => {
        console.log("User years: ", response.data);
        setBarChart(response.data);
        console.log(barChartData);
      })
      .catch((err) => console.log(err));
  };

  const setBarChart = (data) => {
    let barThickness = 0;
    if (movies.length <= 5) {
      barThickness = 60;
    } else if (movies.length <= 10) {
      barThickness = 30;
    } else {
      barThickness = 10;
    }
    setBarChartData({
      labels: data.map((obj) => obj.year),

      datasets: [
        {
          label: "Number of movies",
          data: data.map((obj) => obj.count),
          backgroundColor: ["#f4cb92", "#e8931c", "#b97516"],
          width: "100px",
          barThickness: barThickness,
        },
      ],
    });
  };
  return (
    <div className="discover_div">
      <div className="header_w_icon_div">
        <p className="subheader inter_bold">Favourites </p>
        <img src={sparkles} alt="fire icon" width="30px" height="30px"></img>
      </div>
      <div className="tabs_div">
        <p
          className="tab_link"
          style={seeTab === "movies" ? { color: "#e8931c" } : {}}
          onClick={() => goToMovies()}
        >
          Movies
        </p>
        <p
          className="tab_link"
          style={seeTab === "charts" ? { color: "#e8931c" } : {}}
          onClick={() => goToCharts()}
        >
          Statistics
        </p>
      </div>
      {seeTab === "movies" &&
        (movies && movies.length > 0 ? (
          <React.Fragment>
            <MovieList parentMovies={movies} />
            <MovieListPagination
              parentCallback={(p) => handleCallback(p)}
              totalNumberOfPages={totalNumberOfPages}
            />
            <p>
              Page: <span className="inter_bold">{page}</span> out of{" "}
              <span className="inter_bold">{totalNumberOfPages}</span>
            </p>
          </React.Fragment>
        ) : (
          <p className="sub_subheader inter_bold">
            You have no movies in your favourites' list.
          </p>
        ))}
      {seeTab === "charts" &&
        movies &&
        movies.length > 0 &&
        Object.keys(pieChartData).length !== 0 &&
        Object.keys(barChartData).length !== 0 && (
          <div className="charts_div">
            <div className="single_chart_div">
              <p className="sub_subheader inter_bold">
                Your most favorite genres
              </p>
              <p className="helper_text helper_text_margin">
                *The genres in your favourites' list and how often they occur.
              </p>
              <PieChart
                chartData={pieChartData}
                className="charts fav_bar_chart"
              ></PieChart>
            </div>
            <div className="single_chart_div">
              <p className="sub_subheader inter_bold">
                Your most favorite years
              </p>
              <p className="helper_text helper_text_margin">
                *The most occuring years in your favourites' list.
              </p>
              <BarChart
                chartData={barChartData}
                axis={"y"}
                className="charts fav_bar_chart"
              ></BarChart>
            </div>
          </div>
        )}
      {seeTab === "charts" && (movies === null || movies.length === 0) && (
        <p className="sub_subheader inter_bold">
          You have no movies in your favourites' list.
        </p>
      )}
    </div>
  );
};

export default Favourites;
