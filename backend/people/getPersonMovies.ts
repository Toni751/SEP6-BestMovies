import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();
  const personId = +event.pathParameters.person_id;

  const movies = await db
    .collection("people")
    .aggregate([
      {
        $match: { _id: personId },
      },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "actors",
          as: "actorMovies",
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "directors",
          as: "directorMovies",
        },
      },
      {
        $project: {
          "actorMovies._id": 1,
          "actorMovies.title": 1,
          "actorMovies.vote_average": 1,
          "directorMovies._id": 1,
          "directorMovies.title": 1,
          "directorMovies.vote_average": 1,
          name: 1,
          profile_path: 1,
          known_for_department: 1,
        },
      },
    ])
    .toArray();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movies),
  };
}
