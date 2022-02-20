import cdk from '../cdk.json';

// eslint-disable-next-line no-restricted-syntax
for (const [key, value] of Object.entries(cdk.context.test.Parameters)) {
  process.env[key] = value as string;
}
