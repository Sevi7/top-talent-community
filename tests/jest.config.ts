import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from '../tsconfig.json';

export default {
  moduleFileExtensions: ['ts', 'js'],
  verbose: true,
  preset: 'jest-dynalite',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../' }),
  setupFiles: ['./setEnvVars.ts'],
  testTimeout: 10000,
};
