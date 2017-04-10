import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

export default () => ({
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.jsx'),
        ],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer,
                ],
            },
        }),
        new FaviconsWebpackPlugin('./src/assets/images/favicon.png'),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            include: path.join(__dirname, 'src'),
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        ['es2015', {
                            modules: false,
                        }],
                        'react',
                    ],
                },
            }],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader', 'eslint-loader'],
        },
        {
            test: /\.(css|scss|sass)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                loader: [
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer],
                        },
                    },
                    { loader: 'resolve-url-loader' },
                    { loader: 'sass-loader?sourceMap' },
                ],
            }),
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'url-loader?limit=10000&mimetype=application/font-woff&publicPath=assets/fonts/&outputPath=assets/fonts/',
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'file-loader?publicPath=assets/fonts/&outputPath=assets/fonts/',
        },
        {
            test: /\.(jpg|png|svg)$/,
            use: 'file-loader?name=[name].[ext]&publicPath=assets/images/&outputPath=assets/images/',
        }],
    },
});
