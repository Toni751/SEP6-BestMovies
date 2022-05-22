import { getDbConnection } from "../utility/utilitySSM";

export async function main() {
  const rand = Math.floor(Math.random() * 10);
  const db = await getDbConnection();

  // Make a MongoDB MQL Query
  const movies = await db.collection("movies").find({}).limit(5).toArray();
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify(movies),
  };
}
