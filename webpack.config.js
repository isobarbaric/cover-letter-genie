const path = require('path');

module.exports = {
  // Entry points for bundling each JavaScript file
  entry: {
    background: './public/background.js',
    content: './public/content.js',
    coopPosting: './public/coopPosting.js',
    parser: './public/parser.js'
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
};
