const path = require('path');
const {
  addBabelPlugin,
  addWebpackPlugin,
  addWebpackResolve,
  customBuildConfig,
  customEntryConfig,
  customBabelLoaderInclude,
  customKeepFunctionNameConfig
} = require('@mcfed/cra');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  webpack: function(config, env) {
    addBabelPlugin('babel-plugin-transform-typescript-metadata')(config);
    customBabelLoaderInclude([path.resolve(__dirname, '..')])(config);
    addWebpackResolve({
      mainFields: ['typescript', 'browser', 'module', 'main']
    })(config);
    customBuildConfig()(config);
    customEntryConfig()(config);
    customKeepFunctionNameConfig()(config);
    addWebpackPlugin(new HardSourceWebpackPlugin())(config);

    return config;
  },
  jest: function(config) {
    config.collectCoverageFrom = [
      'src/**/*.{js,jsx,ts,tsx}',
      '!<rootDir>/node_modules/',
      '!src/*.d.ts',
      '!src/setupProxy.js',
      '!src/index.ts',
      '!src/interface.ts',
      '!src/app.tsx',
      '!src/locales/index.ts'
    ];
    return config;
  }
};
