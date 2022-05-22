import AWS from "aws-sdk";

const identity = new AWS.CognitoIdentityServiceProvider();

export async function main(event: any, context: any, callback: any) {
  const email = event.request.userAttributes.email;
  if (email) {
    const userParams = {
      UserPoolId: event.userPoolId,
      AttributesToGet: ["email"],
      Filter: `email = "${email}"`,
      Limit: 1,
    };
    try {
      const { Users } = await identity.listUsers(userParams).promise();
      if (Users && Users.length > 0) {
        callback("EmailExistsException", null);
      } else {
        callback(null, event);
      }
    } catch (error) {
      console.log({ error }, JSON.stringify(error));
      callback({ error }, null);
    }
  }
  // Return to Amazon Cognito
  callback(null, event);
}
