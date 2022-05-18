import AWS from "aws-sdk";

const identity = new AWS.CognitoIdentityServiceProvider();

export async function main(event, context, callback) {
  // Impose a condition that the minimum length of the username is 5 is imposed on all user pools.
  const email = event.request.userAttributes.email;
  if (email) {
    const userParams = {
      UserPoolId: event.userPoolId,
      AttributesToGet: ["email"],
      Filter: `email = "${email}"`,
      Limit: 1,
    };
    try {
      // identity.listUsers(userParams, (err, data) => {
      //   if (err) {
      //     console.log("Error listing cognito users", err);
      //     callback({ err }, null);
      //   }
      //   if (data) {
      //     const users = data.Users;
      //     console.log("Users", users);
      //     if (users && users.length > 0) {
      //       console.log("Here1");
      //       callback("EmailExistsException", null);
      //       console.log("Here2");
      //     } else {
      //       callback(null, event);
      //     }
      //   }
      // });
      const { Users } = await identity.listUsers(userParams).promise();
      console.log("Here3", Users);
      if (Users && Users.length > 0) {
        console.log("Here1");
        callback("EmailExistsException", null);
        console.log("Here2");
      } else {
        callback(null, event);
      }
      console.log("Shouldn't be here");
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
