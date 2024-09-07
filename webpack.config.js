const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Entry points for bundling each JavaScript file
  entry: {
    background: './src/background.js',
    content: './src/content.js',
    coopPosting: './src/coopPosting.js',
    parser: './src/parser.js'
  },
  output: {
    // Output bundles will be placed in the 'dist' folder
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',  // [name] will use the key from the entry object
  },
  mode: 'production',  // Can change to 'development' if you want
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // Optional: for transpiling ES6+ to ES5
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
      ]
    })
  ]
};
