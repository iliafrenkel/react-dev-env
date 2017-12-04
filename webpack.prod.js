const webpack = require('webpack');

const config = {
    'devtool': 'source-maps',
    'plugins': [
        new webpack
        .DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
        new webpack.optimize.UglifyJsPlugin({'minimize': true})
    ]
};

module.exports = config;
