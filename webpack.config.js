const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Customize the config here if needed
  config.resolve.alias['react-native'] = 'react-native-web';

  return config;
};
