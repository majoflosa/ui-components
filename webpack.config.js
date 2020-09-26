const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index/js/index.js',
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'js/script.js',
        publicPath: '/assets/',
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
            { test: /\.scss$/, exclude: /node_modules/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.html$/, exclude: /node_modules/, use: 'html-loader' }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        })
    ]
};
