require('./scripts/plugins/watch-antd-theme');

const isProd = process.env.NODE_ENV === 'production'


module.exports = (phase) => {
  return {
    // Use the CDN in production and localhost for development.
    assetPrefix: isProd ? 'http://localhost:3000' : 'http://localhost:3000',
    webpack(config) {
      config.watchOptions.ignored = config.watchOptions.ignored.filter(i => !/node_modules/.test(i));
      config.resolve.alias['@'] = './';
      return config;
    }
  };
};