import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const actors = await db
    .collection("people")
    .aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "actors",
          as: "movies",
        },
      },
      {
        $project: {
          name: 1,
          average: { $avg: "$movies.vote_average" },
          known_for_department: 1,
        },
      },
      {
        $match: {
          known_for_department: "Acting",
        },
      },
      {
        $limit: 10,
      },
    ])
    .toArray();

  const directors = await db
    .collection("people")
    .aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "directors",
          as: "movies",
        },
      },
      {
        $project: {
          name: 1,
          average: { $avg: "$movies.vote_average" },
          known_for_department: 1,
        },
      },
      {
        $match: {
          known_for_department: "Directing",
        },
      },
      {
        $limit: 10,
      },
    ])
    .toArray();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ actors, directors }),
  };
}
