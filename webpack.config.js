const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
mode: 'none',
entry: './src/app/app.js',
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
},
resolve: {
    modules: [
        path.resolve(__dirname, 'src'),
        'node_modules'
    ],
    alias: {
        '@less-helpers-module': path.resolve(__dirname, 'src/assets/less/helpers'), // alias for less helpers
        '@assets-root-path': path.resolve(__dirname, 'src/assets') // alias for assets (use for images & fonts)
    }
},
module: {
    rules: [{
        test: /\.less$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
        ]
        }, {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: [{
            loader: 'url-loader',
            options: {
            limit: 10000,
            name: 'images/[name].[ext]'
            }
        }]
        }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
        }, 
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: ['@babel/plugin-proposal-class-properties']
                } 
            },
        },
        {
            test: /\.handlebars$/,
            loader: "handlebars-loader"
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new CopyWebpackPlugin([
            'src/index.html', // will copy to root of outDir (./dist folder)
        {
            from: 'src/app/pages',
            to: 'pages'
        },
        {
            from: 'src/assets/images',
            to: 'images'
        },
        {
            from: 'src/assets/fonts',
            to: 'fonts'
        },
        
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    devServer: {
        contentBase: './dist',
        port: 3000,
        historyApiFallback: true
    }
};


