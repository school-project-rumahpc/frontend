const withAntdLess = require('next-plugin-antd-less');
const antdVariables = require('./styles/antdVariables');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...withAntdLess({
    modifyVars: antdVariables,
    lessVarsFilePath: './styles/variables.less',
    lessVarsFilePathAppendToEndOfContent: false,
    cssLoaderOptions: {},
    webpack(config) {
      return config;
    },
  })
}

module.exports = nextConfig;