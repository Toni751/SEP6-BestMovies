import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const commentId = event.pathParameters.comment_id;

  const deleteComment = await db.collection("movies").updateMany(
    {},
    {
      $pull: {
        comments: { _id: commentId },
      },
    }
  );

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deleteComment),
  };
}
