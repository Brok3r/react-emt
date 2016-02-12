var path = require("path")
var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/app.jsx"),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    publicPath: "/"
  },

  devServer: {
    publicPath: "/",
    historyApiFallback: true
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch",
      $: "jquery",
      jQuery: "jquery"
    }),
    new ExtractTextPlugin("css/[name].css"),
    new HtmlWebpackPlugin({
        template: "src/index.html",
        hash: true,
        inject: "body",
        minify: {
            collapseWhitespace: true
        }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
            presets: ["es2015", "stage-0", "react"],
        }
      },{
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },{
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: "file?name=img/[name].[ext]"
      },{  // bootstrap & fontawesome
        test: /\.svg(\?.+)?$/,
        loader: "url?name=fonts/[name].[ext]&limit=8192&mimetype=image/svg+xml"
      },{
        test: /\.(woff|woff2)(\?.+)?$/,
        loader:"url?name=fonts/[name].[ext]&limit=8192&mimetype=application/font-woff"
      },{
        test: /\.(eot|otf|ttf)(\?.+)?$/,
        loader: "url?name=fonts/[name].[ext]&limit=8192"
      }
    ],
  },

  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
}
