const copyWebpackPlugin = require('copy-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const package = require('./package.json')

const extractCSS = new extractTextPlugin('library.[chunkhash].css')
const extractSCSS = new extractTextPlugin('app.[chunkhash].css')
const isProd = process.env.NODE_ENV === 'production'

const config = {
    entry: {
        bundle: path.resolve(__dirname, 'src/init.jsx')
    },
    output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    module: {
        rules: [
            {test: [/\.png(\?|$)/, /\.gif(\?|$)/, /\.jpe?g(\?|$)/], loader: 'file-loader?name=[name]-[hash].[ext]'},
            {test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=[name]-[hash].[ext]'},
            {test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.pug$/, use: ['pug-loader']},
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/components/app/app.pug')
        }),
        // new copyWebpackPlugin([{ from: path.resolve(__dirname, 'src/images'), to: 'images' }]),
        new copyWebpackPlugin([
            {
              from: 'node_modules/monaco-editor/min/vs',
              to: 'vs',
            }
          ]),
        extractCSS,
        extractSCSS,
    ],
    resolve: {
        extensions: ['.css', '.js', '.jsx']
    },
    devServer: {
        contentBase: 'app',
        port: 4000,
        historyApiFallback: true,
        stats: { colors: true },
        proxy: {
            "/api": {
                target: "http://localhost:4010",
                secure: false,
            }
        }
    }
}

if (isProd) {
    config.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'applicationVersion': JSON.stringify(package.version)
    }))
    config.plugins.push(new webpack.optimize.UglifyJsPlugin())
    config.plugins.push(new webpack.HashedModuleIdsPlugin())
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
}))
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }))

    config.module.rules.push({test: /\.css$/, use: extractCSS.extract(['css-loader'])})
    config.module.rules.push({test: /\.scss$/, use: extractSCSS.extract(['css-loader', 'sass-loader'])})

    config.devtool = "source-map"
} else {
    config.plugins.push(new webpack.DefinePlugin({
        'applicationVersion': JSON.stringify(package.version)
    }))
    config.plugins.push(new webpack.NamedModulesPlugin())
    config.module.rules.push({test: /\.css$/, use: ['style-loader', 'css-loader']})
    config.module.rules.push({test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']})
    config.output.filename = "[name].[hash].js"
    config.devtool = "cheap-module-eval-source-map"
}

module.exports = config
