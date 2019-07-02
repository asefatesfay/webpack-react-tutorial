
const HtmlWebPackPlugin = require("html-webpack-plugin");
const LoadablePlugin = require('@loadable/webpack-plugin')
const path = require("path");
const browserConfig = {
    entry: "./src/browser/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: "/"
    },
    devtool: "cheap-module-source-map",
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: {
                    loader: "css-loader"
                }
              }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
      },
    
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/static/index.html",
            filename: "./public/index.html"
        }),
        new LoadablePlugin()
    ]
}

const serverConfig = {
    entry: "./src/server/index.js",
    target: "node",
    output: {
        path: __dirname,
        filename: "public/server.js",
        publicPath: "/"
    },
    devtool: "cheap-module-source-map",

    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: {
                    loader: "css-loader"
                }
              },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
      },

}
module.exports = [browserConfig, serverConfig];