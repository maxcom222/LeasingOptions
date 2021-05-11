const supportedLocales = ['en']
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  crossOrigin: 'anonymous',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    config.plugins.push(new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /uk/,
    ));
    config.plugins.push(new webpack.ContextReplacementPlugin(
      /date\-fns[\/\\]/,
      new RegExp(`[/\\\\\](${supportedLocales.join('|')})[/\\\\\]`),
    ));
    return config;
  },
});