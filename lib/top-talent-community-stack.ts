import { Construct, Stack, StackProps, Duration } from '@aws-cdk/core';
import { Function, LayerVersion, Runtime, Code } from '@aws-cdk/aws-lambda';
import { BuildConfig } from '../bin/config/BuildConfig';

export default class TopTalentCommunityStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);

    const layer = new LayerVersion(this, 'layer', {
      code: Code.fromAsset('dist/src/layer'),
      compatibleRuntimes: [Runtime.NODEJS_14_X],
    });

    const nominatePeerLambda = new Function(this, 'nominatePeer', {
      functionName: 'nominatePeer',
      handler: 'index.lambdaHandler',
      runtime: Runtime.NODEJS_14_X,
      layers: [layer],
      code: Code.fromAsset('dist/src/functions/nominatePeer'),
      timeout: Duration.seconds(15),
      environment: {},
    });
  }
}
