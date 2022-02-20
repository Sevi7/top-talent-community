import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { BuildConfig } from '../bin/config/BuildConfig';

export default class TopTalentCommunityStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);
  }
}
