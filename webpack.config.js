var path = require("path");
var webpack = require("webpack");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  entry: {
    SingleKeyboard: "./src/single-keyboard-launcher.js",
    MixedKeyboard: "./src/mixed-keyboard-launcher.js",
  },
  output: {
    path: path.resolve(__dirname, "."),
    publicPath: "/",
    filename: "[name].js",
    libraryTarget: "var",
    library: "native_update_keyboard"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this nessessary.
            "scss": "vue-style-loader!css-loader!sass-loader",
            "sass": "vue-style-loader!css-loader!sass-loader?indentedSyntax"
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.common.js"
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map",
  plugins: [
    new BrowserSyncPlugin({
        host: "localhost",
        port: 3000,
        proxy: "http://localhost:8080/"
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
