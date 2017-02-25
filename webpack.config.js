var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
	entry: DEV + "/index.jsx",
	output: {
		path: OUTPUT,
		filename: "bundle-[chunkhash].js"
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	module: {
		loaders: [{
			test: /\.jsx$/,
			include: DEV,
			loader: "babel-loader"
		}, {
        	test: /\.html$/,
        	loader: 'html-loader'
    	}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new CleanWebpackPlugin([OUTPUT])
	]
};

module.exports = config;
