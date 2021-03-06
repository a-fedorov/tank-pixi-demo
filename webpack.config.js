var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/app.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'game.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            pixi: path.join(__dirname, 'node_modules/pixi.js/dist/pixi.js'),
            assets: path.join(__dirname, 'assets/'),
            config: path.join(__dirname, 'src/config.json')
        }
    },
    plugins: [
        new CleanWebpackPlugin([
            path.join(__dirname, 'dist')
        ]),
        new webpack.ProvidePlugin({
            'config': 'config'
        }),
        new HtmlWebpackPlugin({
            title: 'DEV MODE: tank-mini-game!',
            template: path.join(__dirname, 'templates/index.html')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        inline: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true,
            ignored: /node_modules/
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader' },
            { test: /\.(jpg|png|xml|mp3|ogg|m4a|fnt|ac3)$/, loader: 'file-loader?name=assets/[hash].[ext]' },
            { test: /pixi\.js$/, loader: 'expose-loader?PIXI' },
            { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' }
        ]
    },
    devtool: 'source-map'
};
