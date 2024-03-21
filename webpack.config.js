const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'none',
  entry: './server.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [ '.ts', '.js', '.tsx'],
    fallback: {
      "zlib": false,
      "url": false,
      "fs": false,
      "buffer": false,
      "querystring": false,
      "crypto": false,
      "net":false,
      "http":false,
      "string_decoder":false,
      "stream":false,
      "async_hooks":false,
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "util": false

    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      }
     

    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/app/views', to: 'views' },      
        // Copy other necessary directories or files
      ],
    }),
  ],
  devtool: 'source-map',
};




