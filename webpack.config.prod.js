const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = merge(baseConfig, {
	mode: "production",
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{loader: MiniCssExtractPlugin.loader}, 
					{
						loader: "css-loader",
						options: {
							modules: true,
						  },
					}, 
					{loader: "sass-loader"}],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					}, {
						loader: "css-loader",
						options: {
							modules: true,
						  }
					}],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		// new BundleAnalyzerPlugin({
		// 	analyserMode: "static",
		// }),

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
