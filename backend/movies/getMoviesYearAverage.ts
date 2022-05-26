import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const averageForYears = await db
    .collection("movies")
    .aggregate([
      {
        $match: {
          vote_average: { $gt: 0 },
        },
      },
      {
        $project: {
          _id: 1,
          year: { $substr: ["$release_date", 0, 4] },
          vote_average: 1,
        },
      },
      {
        $group: {
          _id: "$year",
          average: { $avg: "$vote_average" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ])
    .toArray();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(averageForYears),
  };
}
