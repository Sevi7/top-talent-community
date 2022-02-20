import { App } from '@aws-cdk/core';
import { BuildConfig } from './BuildConfig';

export default function getConfig(app: App, env: string): BuildConfig {
  const unparsedEnv = app.node.tryGetContext(env);

  const buildConfig: BuildConfig = {
    Environment: unparsedEnv.Environment,
    Parameters: {},
  };

  return buildConfig;
}
