#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import TopTalentCommunityStack from '../lib/top-talent-community-stack';
import { BuildConfig } from './config/BuildConfig';
import getConfig from './config/get-build-config';

const app = new App();

const buildConfigTest: BuildConfig = getConfig(app, 'test');

new TopTalentCommunityStack(app, 'top-talent-community', {}, buildConfigTest);
