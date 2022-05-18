import * as sst from "@serverless-stack/resources";
import { HttpMethod } from "aws-cdk-lib/aws-events";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      cors: {
        allowMethods: [HttpMethod.GET],
      },
      // defaultFunctionProps: {
      //   environment: {
      //     MONGODB_URL: props,
      //   },
      // },
      routes: {
        "GET /": "src/lambda.handler",
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}
