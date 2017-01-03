import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    // consider making an entry point for each page
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // has the files using MD5 so that their names change when the content changes
    new WebpackMd5Hash(),

    // use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // key name matches entry key name
    }),

    // create HTML file that includes reference to bundled js
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true, // dynamically inject any needed script tags (e.g. bundle.js)
      sentryJsToken: 'https://050b345914d042ae8b89bb3aef1d91c3@sentry.io/125997'
    }),

    // eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    // minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
};
