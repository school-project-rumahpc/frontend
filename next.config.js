const withAntdLess = require('next-plugin-antd-less');
const antdVariables = require('./styles/antdVariables');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{remotePatterns:[{
    protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/school-project-rumahpc/assets/master/img/**',
  }]},
  reactStrictMode: true,
  swcMinify: false,
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