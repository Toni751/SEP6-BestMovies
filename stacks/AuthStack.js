import * as iam from "aws-cdk-lib/aws-iam";
import * as sst from "@serverless-stack/resources";

export default class AuthStack extends sst.Stack {
  // Public reference to the auth instance
  auth;

  constructor(scope, id, props) {
    super(scope, id, props);

    // The framework creates automatically 1 user pool for development and another separate user pool for production
    // Therefore development and production users are never mixed
    // Create a Cognito User Pool and Identity Pool
    this.auth = new sst.Auth(this, "Auth", {
      cognito: {
        userPool: {
          // Users can login with their email, username and password
          signInAliases: { email: true, username: true },
        },
        triggers: {
          preSignUp: "src/uniqueEmailTrigger.main",
        },
      },
    });

    // this.auth.attachPermissionsForAuthUsers([
    //    Allow access to the API
    //   api,
    //   // Policy granting access to a specific folder in the bucket
    //   new iam.PolicyStatement({
    //     actions: ["*"],
    //     effect: iam.Effect.ALLOW,
    //     resources: [
    //       bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
    //     ],
    //   }),
    // ]);

    // Show the auth resources in the output
    this.addOutputs({
      Region: scope.region,
      UserPoolId: this.auth.cognitoUserPool.userPoolId,
      IdentityPoolId: this.auth.cognitoCfnIdentityPool.ref,
      UserPoolClientId: this.auth.cognitoUserPoolClient.userPoolClientId,
    });
  }
}
