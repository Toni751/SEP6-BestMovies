import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ActorPage.css";
import ActorBiography from "./ActorBiography";
import peopleservice from "../services/peopleservice";

const ActorPage = () => {
  let { personId } = useParams();
  const [person, setPerson] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Person page", personId);
    peopleservice
      .getPersonById(personId)
      .then((response) => {
        console.log(response);
        setPerson(response.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNavigateMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleCallback = () => {
    setShowModal(false);
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
          <p className="biography top_margin_text">
            {person.biography &&
              (person.biography.length < 1200
                ? person.biography
                : person.biography.substring(0, 1200))}{" "}
            ...{" "}
            <span className="links" onClick={() => openModal()}>
              see more.
            </span>
          </p>
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
    </div>
  );
};

export default ActorPage;
