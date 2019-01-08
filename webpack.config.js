const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extra\ct-plugin");
var config = {
    entry: {main: './src/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: 'http://localhost:63342/reactor1/dist/',
        chunkFilename: '[name].chunk.js',
    },
    module: {

        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: [/\.css$/, /\.scss$/],
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.EnvironmentPlugin(['NODE_ENV']),
        // new ExtractTextPlugin({filename: 'style.css'})
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
            chunkFilename: '[name].style.css',
        })
    ]
};
module.exports = (env, argv) => {
    return config;
};