const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'none',
  entry: './src/app.ts',
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
      "async_hooks":false

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
        { from: 'src/views', to: 'views' },
        { from: 'src/public', to: 'public' },
      
        // Copy other necessary directories or files
      ],
    }),
  ],
  devtool: 'source-map',
};




