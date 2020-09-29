const path = require('path');
const {
  addBabelPlugin,
  addWebpackPlugin,
  addWebpackResolve,
  customEntryConfig,
  customBuildConfig,
  customBabelLoaderInclude,
  customKeepFunctionNameConfig
} = require('@mcfed/cra');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  paths: function(paths, env) {
    paths.appTypeDeclarations = path.resolve(
      paths.appPath,
      'react-app-env.d.ts'
    );
    paths.appIndexJs = path.resolve(paths.appSrc, 'app.tsx')
    paths.testsSetup = path.resolve(paths.appPath, 'setupTests');

    return paths;
  },
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
      '!src/i18n/index.ts'
    ];
    return config;
  }
};
