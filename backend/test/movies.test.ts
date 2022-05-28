import { describe, expect, it } from "vitest";
import { main } from "../movies/addMovieComment";

describe("Comments for a movie", function () {
  it("adds a comment to a movie", async function () {
    const userId = "user1";
    const comment = "Such a good movie it was!";
    const movieId = "744276";
    const event = {
      body: JSON.stringify({
        comment: comment,
        userId: userId,
        movieId: movieId,
      }),
    };
    const response = await main(event);
    const body = JSON.parse(response.body);
    expect(body.user_id).toBe("44443");
    expect(body.comment).toBe(comment);
  });
});
