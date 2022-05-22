import {
  Api,
  Auth,
  ReactStaticSite,
  StackContext,
} from "@serverless-stack/resources";
import * as iam from "aws-cdk-lib/aws-iam";

export function MyStack({ stack, app }: StackContext) {
  // Create a Cognito User Pool to manage auth
  const auth = new Auth(stack, "Auth", {
    cdk: { userPool: { signInAliases: { email: true, username: true } } },
    triggers: { preSignUp: "triggers/uniqueEmailTrigger.main" },
  });

  auth.attachPermissionsForTrigger("preSignUp", [
    new iam.PolicyStatement({
      actions: ["cognito-idp:ListUsers"],
      effect: iam.Effect.ALLOW,
      resources: [`arn:aws:cognito-idp:*:${app.account}:userpool/*`],
    }),
  ]);

  // Create an HTTP API
  const api = new Api(stack, "Api", {
    authorizers: {
      jwt: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "jwt",
    },
    routes: {
      "GET /movies/{movie_id}": {
        function: "movies/getMovieById.main",
        authorizer: "none",
      },
      "GET /movies/discover": {
        function: "movies/getMovies.main",
        authorizer: "none",
      },
      "GET /search": {
        function: "movies/findMoviesPeople.main",
        authorizer: "none",
      },
      "GET /people/{person_id}": {
        function: "people/getPersonById.main",
        authorizer: "none",
      },
      "GET /people/{person_id}/movies": {
        function: "people/getPersonMovies.main",
        authorizer: "none",
      },

      "GET /toplists/{user_id}": "users/getUserToplist.main",
      "GET /movies/trending": "movies/getTrendingMovies.main",
      "POST /movies/likes": "movies/addMovieLike.main",
      "POST /movies/comments": "movies/addMovieComment.main",
      "POST /toplists": "users/addMovieToToplist.main",
      "DELETE /users/{user_id}": "users/deleteUser.main",
      "DELETE /movies/comments/{comment_id}": "movies/deleteComment.main",
      "GET /people/highest_rated": "people/getHighestRatedPeople.main",
      "GET /toplists/{user_id}/genres": "users/getUserGenres.main",
      "GET /movies/years_average": "movies/getMoviesYearAverage.main",
    },
  });

  api.attachPermissions([
    new iam.PolicyStatement({
      actions: ["ssm:GetParameter"],
      effect: iam.Effect.ALLOW,
      resources: [`arn:aws:ssm:*:${app.account}:parameter/*`],
    }),
  ]);

  // Allow authenticated users to invoke the API
  // auth.attachPermissionsForAuthUsers([api]);

  // Deploy our React app
  const site = new ReactStaticSite(stack, "ReactSite", {
    path: "frontend",
    // Pass in our environment variables
    environment: {
      REACT_APP_API_URL: api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });

  // Show the endpoint in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}
