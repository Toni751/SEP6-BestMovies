import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const userId = event.pathParameters.user_id;

  const years = await db
    .collection("toplists")
    .aggregate([
      { $match: { user_id: userId } },
      {
        $lookup: {
          from: "movies",
          localField: "movie_ids",
          foreignField: "_id",
          as: "movies",
        },
      },
      { $unwind: "$movies" },
      {
        $project: { _id: 1, year: { $substr: ["$movies.release_date", 0, 4] } },
      },
    ])
    .toArray();

  let yearsData = [];

  years.forEach((element) => {
    if (element && element.year) {
      const found = yearsData.find((y) => y.year === element.year);
      if (found) {
        found.count++;
      } else {
        yearsData.push({ year: element.year, count: 1 });
      }
    }
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(yearsData),
  };
}
