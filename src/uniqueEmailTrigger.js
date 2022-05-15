import AWS from "aws-sdk";

const identity = new AWS.CognitoIdentityServiceProvider();

export async function main(event, context, callback) {
  // Impose a condition that the minimum length of the username is 5 is imposed on all user pools.
  const email = event.request.userAttributes.email;
  if (email) {
    const userParams = {
      UserPoolId: event.userPoolId,
      AttributesToGet: ["email"],
      Filter: "", // `email = "${email}"`
      Limit: 1,
    };
    try {
      const Users = identity.listUsers(userParams, (err, data) => {
        console.log("Dataaaa", data, err);
      });
      // console.log("Users", Users);
      if (Users && Users.length > 0) {
        callback("EmailExistsException", null);
      } else {
        callback(null, event);
      }
    } catch (error) {
      console.log({ error }, JSON.stringify(error));
      callback({ error }, null);
    }

    // const error = new Error(
    //   "Cannot register users with username less than the minimum length of 5: " +
    //     event.username
    // );
    // // Return error to Amazon Cognito
    // callback(error, event);
  }
  // Return to Amazon Cognito
  callback(null, event);
}
