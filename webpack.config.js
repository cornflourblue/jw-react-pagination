var path = require('path');

module.exports = {
    entry: './src/JwPagination.jsx',
    output: {
        path: path.resolve('lib'),
        filename: 'JwPagination.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}