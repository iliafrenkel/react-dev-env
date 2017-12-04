/* eslint sort-keys: 'off'*/
/* eslint max-len: ["error", 140] */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge');

const CLIENT = path.resolve(__dirname, "client");
const SERVER = path.resolve(__dirname, "server");
const OUTPUT = path.resolve(__dirname, "publish");
const MODULES = path.resolve(__dirname, './node_modules');

module.exports = (env) => {
    const envConfig = require(`./webpack.${env.env}.js`); // eslint-disable-line global-require

    const config = {
        'entry': CLIENT + "/index.jsx",
        'output': {
            'path': `${OUTPUT}/static`,
            'filename': 'assets/bundle-[chunkhash].js'
        },
        'resolve': {
            'extensions': ['.js', '.jsx'],
            'modules': [CLIENT, MODULES]
        },
        'module': {
            'loaders': [{
                'test': /\.jsx$/,
                'include': CLIENT,
                'loader': "babel-loader",
                'exclude': /node_modules/
            }, {
                'test': /\.css$/,
                'loader': ExtractTextPlugin.extract({
                    'fallback': 'style-loader',
                    'use': 'css-loader'
                })
            }, {
                'test': /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                'loader': 'file-loader?&name=assets/fonts/[hash].[ext]&publicPath=../'
            }, {
                'test': /\.(woff|woff2)$/,
                'loader': 'url-loader?prefix=font&limit=5000&name=assets/fonts/[hash].[ext]&publicPath=../'
            }, {
                'test': /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                'loader': 'url-loader?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[hash].[ext]&publicPath=../'
            }, {
                'test': /favicon\.ico/,
                'loader': 'file-loader?&name=favicon.ico&publicPath=../'
            }, {
                'test': /\.jpg$/,
                'loader': 'url-loader?limit=10000&mimetype=image/jpg&name=assets/images/[hash].[ext]&publicPath=../'
            }, {
                'test': /\.png$/,
                'loader': 'url-loader?limit=10000&mimetype=image/png&name=assets/images/[hash].[ext]&publicPath=../'
            }, {
                'test': /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                'loader': 'url-loader?limit=10000&mimetype=image/svg+xml&name=assets/images/[hash].[ext]&publicPath=../'
            }, {
                'test': /\.html$/,
                'include': CLIENT,
                'exclude': /node_modules/,
                'loader': 'html-loader'
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                'template': `${CLIENT}/index.html`,
                'favicon': `${CLIENT}/images/favicon.ico`
            }),
            new ExtractTextPlugin('assets/[name]-[chunkhash].css'),
            new OptimizeCssAssetsPlugin(),
            new CopyWebpackPlugin([
                {
                    'from': SERVER,
                    'to': `${OUTPUT}/server`,
                    'ignore': ['*.test.js']
                }
            ]),
            new CleanWebpackPlugin([OUTPUT])
        ]
    };
    const mergedConfig = webpackMerge(config, envConfig);

    return mergedConfig;
}
