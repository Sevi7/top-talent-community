export default {
  moduleFileExtensions: ['ts', 'js'],
  verbose: true,
  preset: 'jest-dynalite',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFiles: ['./setEnvVars.ts'],
  testTimeout: 10000,
};
