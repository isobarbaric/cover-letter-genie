const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    content: './src/content.js',
    coopPosting: './src/coopPosting.js',
    parser: './src/parser.js',
    firebase: './src/firebase.js',
    popup: './src/Popup.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',  
  },
  mode: 'production',  
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //  template: './public/popup.html',
    //  filename: 'popup.html',
    //  chunks: ['popup']
    //}),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
      ]
    })
  ]
};
