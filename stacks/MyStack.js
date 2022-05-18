import * as sst from "@serverless-stack/resources";
import { HttpMethod } from "aws-cdk-lib/aws-events";

export default class MyStack extends sst.Stack {
  api;
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a HTTP API
    this.api = new sst.Api(this, "Api", {
      cors: true,
      // defaultFunctionProps: {
      //   environment: {
      //     MONGODB_URL: props,
      //   },
      // },
      routes: {
        "GET /movies": "src/lambda.handler",
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
