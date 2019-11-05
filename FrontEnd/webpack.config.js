const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');



module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new Dotenv(),
    new UglifyJsPlugin({ sourceMap: true }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Project',
      template: './src/index.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/login.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'question.html',
      template: './src/question.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: 'src/register.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'QuestionAnswer.html',
      template: 'src/QuestionAnswer.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'user.html',
      template: 'src/user.html',
      chunks: ['main']
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /spec/
        ],
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /spec/
        ],
        loader: "babel-loader",
        options: {
          presets: ['es2015']
        }
      }
    ]
  }
};
