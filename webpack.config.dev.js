const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./webpack.config.base");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

module.exports = merge(baseConfig, {
    mode: "development",
    entry: {
        main: ["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000", "./src/browser/index.js"],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                    { loader: "sass-loader" }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: "css-loader", options: {
                            modules: true
                        }
                    }],
                exclude: /node_modules/,
            }
        ],
    },
    devtool: "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/static/index.html",
            filename: "./index.html",
            favicon: "src/static/favicon.ico"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css",
        }),
    ],
});
