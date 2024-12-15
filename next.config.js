const webpack = require("webpack");

module.exports = {
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer/"),
        crypto: require.resolve("crypto-browserify"),
      },
    };

    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser",
      })
    );

    return config;
  },
  experimental: {
    middlewareFile: "middleware.ts",
  },
};
