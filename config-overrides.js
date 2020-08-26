const path = require('path');
const {
  customBuildConfig,
  customEntryConfig,
  customProxyConfig,
  customBabelLoaderInclude,
  customKeepFunctionNameConfig,
  fixBabelImports,
  addBabelPlugin,
  addWebpackPlugin,
  addWebpackResolve,
  overrideDevServer
} = require('@mcfed/cra');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  jest: function(config) {
    config.collectCoverageFrom = [
      'packages/**/src/**/*.{ts,tsx}',
      '!packages/**/src/**/*.d.ts',
      '!packages/**/src/**/index.ts',
      '!packages/**/src/interface.ts',
      '!packages/**/src/app.tsx',
      '!packages/**/src/locales/index.tsx',
      '!packages/**/src/redux-message.ts',
      'src/**/*.{js,jsx,ts,tsx}',
      '!<rootDir>/node_modules/',
      '!src/*.d.ts',
      '!src/setupProxy.js',
      '!src/index.ts',
      '!src/interface.ts',
      '!src/app.tsx',
      '!src/locales/index.ts',
      '!src/redux-message.ts'
    ];
    config.roots = ['<rootDir>/src', '<rootDir>/packages'];
    config.testMatch = [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/packages/**/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
      '<rootDir>/packages/**/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
    ];
    config.setupTestFrameworkScriptFile = '<rootDir>/setupTests.ts';
    config.transformIgnorePatterns = ['<rootDir>/node_modules/(?!@mcfed).*/'];
    config.testPathIgnorePatterns = ['<rootDir>/packages/demo'];
    return config;
  }
};
