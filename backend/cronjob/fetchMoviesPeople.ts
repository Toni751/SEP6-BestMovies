import fetch from "node-fetch";
import { getApiKey, getDbConnection } from "../utility/utilitySSM";

const genresMap = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

type moviePerson = {
  id: number;
  name: string;
  known_for_department: string;
};

type ApiPerson = {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  profile_path: string;
  known_for_department: string;
};

type ApiMovie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  credits: {
    cast: [person: moviePerson];
    crew: [person: moviePerson];
  };
};

export async function main(event) {
  const db = await getDbConnection();
  const apiKey = await getApiKey();

  const baseURL = "https://api.themoviedb.org/3";
  console.log("Fetching from api", new Date());

  const fetchedMovieIds = [];
  for (let i = 1; i <= 5; i++) {
    const response = await fetch(
      `${baseURL}/movie/popular?api_key=${apiKey}&page=${i}`
    );
    const data = await response.json();
    fetchedMovieIds.push(...data.results.map((movie) => movie.id));
  }
  console.log("Fetched movie ids", fetchedMovieIds.length);

  const dbMovieIds = (
    await db
      .collection("movies")
      .find({}, { projection: { _id: 1 } })
      .toArray()
  ).map((movie) => movie._id);
  console.log("Db movie ids", dbMovieIds.length, dbMovieIds.slice(0, 10));

  const dbPersonIds = (
    await db
      .collection("people")
      .find({}, { projection: { _id: 1 } })
      .toArray()
  ).map((person) => person._id);
  console.log("Db person ids", dbPersonIds.length, dbPersonIds.slice(0, 10));

  const newMovieIds = fetchedMovieIds.filter((id) => !dbMovieIds.includes(id));
  console.log("New movie ids", newMovieIds);

  const moviesList = [];
  const personsList = [];
  const personIds = new Set();

  for (let i = 0; i < newMovieIds.length; i++) {
    const id = newMovieIds[i];
    const response = await fetch(
      `${baseURL}/movie/${id}?api_key=${apiKey}&append_to_response=credits`
    );
    const movie: ApiMovie = await response.json();
    const newMovie = {
      _id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      backdrop_path: movie.backdrop_path,
      genres: movie.genres.map((g) => g.name),
    };
    const actors = movie.credits.cast.filter(
      (c) => c.known_for_department === "Acting"
    );
    const firstTenActorIds = actors.map((a) => a.id).slice(0, 10);
    newMovie.actors = firstTenActorIds;
    firstTenActorIds.forEach((id) => personIds.add(id));

    const directors = movie.credits.crew.filter(
      (c) => c.known_for_department === "Directing"
    );
    const firstThreeDirectorIds = directors.map((d) => d.id).slice(0, 3);
    newMovie.directors = firstThreeDirectorIds;
    firstThreeDirectorIds.forEach((id) => personIds.add(id));

    moviesList.push(newMovie);
  }
  console.log("Movies length", moviesList.length, personIds.size);

  for (let id of personIds.values()) {
    if (!dbPersonIds.includes(id)) {
      const response = await fetch(`${baseURL}/person/${id}?api_key=${apiKey}`);
      const person: ApiPerson = await response.json();
      const newPerson = {
        _id: person.id,
        name: person.name,
        biography: person.biography,
        birthday: person.birthday,
        profile_path: person.profile_path,
        known_for_department: person.known_for_department,
      };
      personsList.push(newPerson);
    }
  }
  console.log("Persons length", personsList.length);

  if (moviesList.length > 0) {
    await db.collection("movies").insertMany(moviesList);
  }

  if (personsList.length > 0) {
    await db.collection("people").insertMany(personsList);
  }
}
