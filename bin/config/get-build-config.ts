import { App } from '@aws-cdk/core';
import { BuildConfig } from './BuildConfig';

export default function getConfig(app: App, env: string): BuildConfig {
  const unparsedEnv = app.node.tryGetContext(env);

  const buildConfig: BuildConfig = {
    Environment: unparsedEnv.Environment,
    Parameters: {
      JWT_TOKEN_KEY: unparsedEnv.Parameters.JWT_TOKEN_KEY,
      DYNAMO_TABLE_NAME_MEMBERS: unparsedEnv.Parameters.DYNAMO_TABLE_NAME_MEMBERS,
      DYNAMO_TABLE_NAME_NOMINATIONS: unparsedEnv.Parameters.DYNAMO_TABLE_NAME_NOMINATIONS,
      SOURCE_EMAIL: unparsedEnv.Parameters.SOURCE_EMAIL,
    },
  };

  return buildConfig;
}
