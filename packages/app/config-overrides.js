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
  paths: function(paths, env) {
    paths.appTypeDeclarations = path.resolve(
      paths.appPath,
      'react-app-env.d.ts'
    );
    paths.testsSetup = path.resolve(paths.appPath, 'setupTests');

    return paths;
  },
  webpack: function(config, env) {
    addBabelPlugin('babel-plugin-transform-typescript-metadata')(config);
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    })(config);
    fixBabelImports('components', {
      libraryName: '@mcfed/components',
      libraryDirectory: 'es',
      camel2DashComponentName: false,
      style: true
    })(config);
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
    return config;
  },
  devServer: overrideDevServer(
    customProxyConfig({
      '/usercenter': {
        target: 'http://192.168.238.19:8020',
        changeOrigin: true,
        pathRewrite: {'^/usercenter': ''}
      }
    })
  )
};
