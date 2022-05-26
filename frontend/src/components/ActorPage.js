import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ActorPage.css";
import ActorBiography from "./ActorBiography";
import peopleservice from "../services/peopleservice";
import BarChart from "./BarChart";

const ActorPage = () => {
  let { personId } = useParams();
  const [person, setPerson] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [chartPersonMovies, setChartPersonMovies] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getPersonAndSetChart();
  }, []);

  const getPersonAndSetChart = () => {
    console.log("Person page", personId);
    peopleservice
      .getPersonById(personId)
      .then((response) => {
        setPerson(response.data[0]);
        let allMovies = sortMovies(response.data[0]);
        setChartForPersonMovies(allMovies);
      })
      .catch((err) => console.log(err));
  };

  const handleNavigateMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleCallback = () => {
    setShowModal(false);
  };

  const sortMovies = (movies) => {
    let mergedMovies = [...movies.actorMovies, ...movies.directorMovies];

    for (let i = 0; i < mergedMovies.length; i++) {
      if (mergedMovies[i].vote_average === 0) {
        mergedMovies.splice([i], 1);
      }
    }
    return mergedMovies
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 15);
  };

  const setChartForPersonMovies = (movies) => {
    let barThickness = 0;
    if (movies.length <= 5) {
      barThickness = 60;
    } else if (movies.length <= 10) {
      barThickness = 30;
    } else {
      barThickness = 10;
    }

    setChartPersonMovies({
      labels: movies.map((movie) => movie.title),

      datasets: [
        {
          label: "Average rating",
          data: movies.map((movie) => movie.vote_average),
          backgroundColor: ["#ffd8a1", "#e8931c", "#965902"],
          color: "white",
          barThickness: barThickness,
        },
      ],
    });
  };

  return (
    <div className="actorpage_div">
      <p className="subheader inter_bold">{person.name}</p>
      <div className="actor_details_div">
        <div className="actor_image_div">
          <img
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                : ""
            }
            alt="Image of actor"
            className="actor_image"
          ></img>
        </div>
        <div className="actor_description_div">
          <p className="inter_bold top_margin_text">Biography:</p>
          {person.biography &&
            (person.biography.length < 1200 ? (
              <p className="biography top_margin_text">{person.biography}</p>
            ) : (
              <p className="biography top_margin_text">
                {person.biography.substring(0, 1200)} {" ... "}
                <span className="links" onClick={() => openModal()}>
                  see more.
                </span>
              </p>
            ))}
          <p className="inter_bold top_margin_text">Known for:</p>
          <p className="top_margin_text">
            {person.actorMovies &&
              person.actorMovies
                .concat(person.directorMovies)
                .map((movie, index) => {
                  return (
                    <span
                      key={movie._id}
                      className="person_name"
                      onClick={() => handleNavigateMovie(movie._id)}
                    >
                      {movie.title}
                      {index !== person.actorMovies.length - 1 && ", "}
                    </span>
                  );
                })}
          </p>
        </div>
      </div>
      {showModal && (
        <ActorBiography
          parentCallback={() => handleCallback()}
          biography={person.biography}
        ></ActorBiography>
      )}
      <div className="chart_div">
        <p className="sub_subheader inter_medium">Top movies by rating</p>
        {Object.keys(chartPersonMovies).length !== 0 && (
          <BarChart
            chartData={chartPersonMovies}
            axis={"y"}
            className="charts"
          />
        )}
      </div>
    </div>
  );
};

export default ActorPage;
