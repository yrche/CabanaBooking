/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  rootDir: '.',

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.json',
      },
    ],
  },

  moduleNameMapper: {

    '^@domain/(.*)\\.js$': '<rootDir>/src/domain/$1',
    '^@gateways/(.*)\\.js$': '<rootDir>/src/gateways/$1',
    '^@infrastructure/(.*)\\.js$': '<rootDir>/src/infrastructure/$1',
    '^@config/(.*)\\.js$': '<rootDir>/src/config/$1',
    '^@/(.*)\\.js$': '<rootDir>/src/$1',

    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@gateways/(.*)$': '<rootDir>/src/gateways/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@/(.*)$': '<rootDir>/src/$1',

    '^(\\./.*)\\.js$': '$1',
    '^(\\.\\./.*)\\.js$': '$1',
  },

  testMatch: ['<rootDir>/src/**/*.spec.ts'],
};