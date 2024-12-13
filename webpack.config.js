const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/App.js',
    output: {
        path : path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: 'images/'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3008,
        
        historyApiFallback: true,
       
    },

    plugins: [
        new HTMLWebpackPlugin({
            template:'./public/index.html',
            inject: true,
        }),                    

        
        // new HTMLWebpack(),              //This now makes a file in dist folder.
    ],
    mode: 'development'
};

