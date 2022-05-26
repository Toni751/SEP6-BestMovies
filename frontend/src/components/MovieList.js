import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ parentMovies }) => {
  const [movies, setMovies] = useState(parentMovies);
  useEffect(() => {
    console.log("Parent movies", parentMovies);
    setMovies(parentMovies);
  }, [parentMovies]);

  const handleLike = (movieId) => {
    const temp = [...movies];
    temp.forEach((movie) => {
      if (movie._id === movieId) {
        if (movie.isLikedByUser) {
          movie.numberOfLikes -= 1;
        } else {
          movie.numberOfLikes += 1;
        }
        movie.isLikedByUser = !movie.isLikedByUser;
      }
    });
    setMovies(temp);
  };

  const handleStar = (movieId) => {
    const temp = [...movies];
    temp.forEach((movie) => {
      if (movie._id === movieId) {
        movie.isTopListed = !movie.isTopListed;
      }
    });
    setMovies(temp);
  };

  return (
    <React.Fragment>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          handleLike={(movieId) => handleLike(movieId)}
          handleStar={(movieId) => handleStar(movieId)}
        />
      ))}
    </React.Fragment>
  );
};

export default MovieList;
