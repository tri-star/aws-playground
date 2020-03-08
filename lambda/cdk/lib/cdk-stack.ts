import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const instanceId = process.env.INSTANCE_ID ?? ''
    const roleArn = process.env.ROLE_ARN ?? ''
    const functon = new lambda.Function(this, 'Singleton', {
      code: new lambda.AssetCode('./resources'),
      handler: 'sample_function.handler',
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.NODEJS_12_X,
      role: iam.Role.fromRoleArn(this, id, roleArn),
      environment: {
        INSTANCE_ID: instanceId
      }
    });
  }
}

const app = new cdk.App();
new CdkStack(app, 'lambda-example');
app.synth();
