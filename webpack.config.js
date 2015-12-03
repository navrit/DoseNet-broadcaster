var autoprefixer            = require('autoprefixer');
var ExtractTextPlugin       = require('extract-text-webpack-plugin');
var ModernizrWebpackPlugin  = require('modernizr-webpack-plugin');
var ngAnnotatePlugin        = require('ng-annotate-webpack-plugin');
var path                    = require('path');
var webpack                 = require('webpack');

module.exports = {
    entry: [
        './src/main.js'
    ],
    output: {
        path: path.resolve('./app/static'),
        publicPath: "../",
        filename: "application.min.js"
    },
    module: {
        loaders: [
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!postcss!sass-loader')
            },
            {
                test: /\.html$/,
                loader: "ng-cache?prefix=/"
            }
        ]
    },
    postcss: function() {
        return [
            autoprefixer({
                browsers: [
                    'last 3 versions',
                    '> 2%',
                    'ie >= 8'
                ],
                add: true,
                remove: true
            })
        ];
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ModernizrWebpackPlugin({
            "options": [
                "setClasses",
            ],
            'feature-detects': [
                "css/flexbox"
            ],
            filename: 'modernizer.min.js',
            minify: {
                output: {
                    comments: false,
                    beautify: false
                }
            }
        }),
        new ngAnnotatePlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('application.min.css', {
            allChunks: true
        })
    ]
};
