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
				use: ["style-loader", "css-loader", "sass-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
				exclude: /node_modules/,
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //        {
            //          loader:ExtractCssChunks.loader,
            //        },
            //        "css-loader",
            //        "style-loader"
            //      ]
            //   }
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
		// new ExtractCssChunks(
        //     {
        //       // Options similar to the same options in webpackOptions.output
        //       // both options are optional
        //       filename: "[name].css",
        //       chunkFilename: "[id].css",
        //       orderWarning: true, // Disable to remove warnings about conflicting order between imports
        //     }
        // )
	],
});
