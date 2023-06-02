const path = require ('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config({ path: './.env' });

const srcDir = path.resolve(__dirname, './src');

module.exports ={
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: ["@babel/polyfill", "./src/index.tsx"],
    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "[name].[hash].js",
        publicPath: '/',
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        watchFiles: ["public/*.html"],
        static: {
            directory: srcDir,
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
        alias: {
            "@": path.resolve(__dirname, './src/'),
            styles: path.resolve(__dirname, './src/styles/'),
        },
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html",
            favicon:  `${srcDir}/assets/images/favicon.ico`
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react", "@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    }
}