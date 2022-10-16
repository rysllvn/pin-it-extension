const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    content: path.resolve('src/content_scripts/content.ts'),
    background: path.resolve('src/background_scripts/background.ts'),
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts?$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static/'),
          to: path.resolve('dist'),
        },
      ],
    }),
    new CleanWebpackPlugin({ 
      cleanStaleWebpackAssets: false,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },
};
