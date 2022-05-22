import React from "react";
import white_like from "../images/white_like.png";
import yellow_like from "../images/yellow_like.png";
import white_star from "../images/white_star.png";
import yellow_star from "../images/yellow_star.png";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  const name = "James Bond - Skyfall";
  const rating = "4.5";
  const likes = "255";
  const genre = "Horror";
  const director = "Sam Mendes";
  const actors = [
    "Daniel Craig",
    "Judi Dench",
    "Javier Bardem",
    "Ralph Fiennes",
    "Naomi Harris",
  ];
  const comments = "5";

  const giveLike = () => {
    console.log("Like given");
  };

  const addToFavourites = () => {
    console.log("Added to favourites");
  };

  const goToMovieDetails = () => {
    console.log("Going to movie details");
  };

  return (
    <div className="moviecards_div">
      <div className="movie_image_div">
        <img
          src="https://image.tmdb.org/t/p/w200/cqnVuxXe6vA7wfNWubak3x36DKJ.jpg"
          alt="Movie Background"
          className="movie_image"
        ></img>
      </div>
      <div className="movie_details">
        <div className="header_row_div">
          <p
            className="movie_text inter_medium links"
            onClick={() => goToMovieDetails()}
          >
            {movie.title}
          </p>
          <div className="left_group_div">
            <p>{likes}</p>
            <img
              src={white_like}
              alt="Like"
              width="18px"
              height="18px"
              id="like_icon"
              className="icons"
              onClick={() => giveLike()}
            ></img>
            <img
              src={white_star}
              alt="Favourite"
              width="18px"
              height="18px"
              className="icons"
              onClick={() => addToFavourites()}
            ></img>
          </div>
        </div>
        <p className="row_div">
          <span className="inter_medium">Rating: </span>
          {rating}
        </p>
        <p className="row_div">
          <span className="inter_medium">Genre: </span>
          {genre}
        </p>

        {movie.directors.join(", ") ? (
          <div>
            <p className="row_div">
              <span className="inter_medium">Director: </span>
              {movie.directors.join(", ")}
            </p>
          </div>
        ) : (
          <div>
            <p className="row_div">
              <span className="inter_medium">Director: </span>
              Unknown director
            </p>
          </div>
        )}

        <div className="footer_row_div">
          {actors.join(", ") ? (
            <div>
              <p>
                <span className="inter_medium">Actors: </span>{" "}
                {actors.join(", ")} and <span> others...</span>
              </p>
            </div>
          ) : (
            <div>
              <p>
                <span className="inter_medium">Actors: </span> Unknown actors
              </p>
            </div>
          )}

          <p className="links" onClick={() => goToMovieDetails()}>
            {comments} comments...
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
