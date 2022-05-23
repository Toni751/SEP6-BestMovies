import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const userId = event.pathParameters.user_id;

  const genres = await db
    .collection("toplists")
    .aggregate([
      {
        $match: { user_id: userId },
      },
      {
        $lookup: {
          from: "movies",
          localField: "movies_id",
          foreignField: "_id",
          as: "movies",
        },
      },
      {
        $project: {
          user_id: 1,
          "movies.genres": 1,
        },
      },
      {
        $unwind: "$movies",
      },
      {
        $group: {
          _id: "$user_id",
          genre: "$movies.genres",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(genres),
  };
}
