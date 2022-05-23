import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const userId = event.pathParameters.user_id;

  const deleteFromMovies = await db.collection("movies").updateMany(
    {},
    {
      $pull: {
        comments: { user_id: userId },
        likes: userId,
      },
    }
  );

  const deleteFromToplist = await db
    .collection("toplists")
    .deleteOne({ user_id: userId });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deleteFromMovies),
  };
}
