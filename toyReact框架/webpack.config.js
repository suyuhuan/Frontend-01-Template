const path = require('path');
module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/main.js')
    },
    mode: "development",
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    optimization: {
        minimize: false
    }
};