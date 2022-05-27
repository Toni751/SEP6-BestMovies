import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const queryString = event.queryStringParameters.query_string;
  const regexObject = { $regex: `^${queryString}`, $options: "i" };

  const movies = await db
    .collection("movies")
    .aggregate([
      {
        $match: {
          title: regexObject,
        },
      },
      { $limit: 5 },
      { $project: { _id: 1, name: "$title", type: "movie" } },
    ])
    .toArray();

  const people = await db
    .collection("people")
    .aggregate([
      {
        $match: {
          name: regexObject,
        },
      },
      { $limit: 5 },
      { $project: { _id: 1, name: 1, type: "person" } },
    ])
    .toArray();

  const responseList = [];
  const numberOfMovies = people.length > 1 ? 3 : 5 - people.length;
  const numberOfPeople = movies.length > 2 ? 2 : 5 - movies.length;
  responseList.push(...movies.slice(0, numberOfMovies));
  responseList.push(...people.slice(0, numberOfPeople));

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(responseList),
  };
}
