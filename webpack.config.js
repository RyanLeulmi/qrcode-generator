const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = [
    // Client Bundle 
    {
        entry: "./react-client/index.js",
        output: {
            path: path.join(__dirname, "build"),
            filename: "clientBundle.js"
        },
        target: "web",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
            ],
        }
    },
    // Server Bundle to transpile the jsx on the server
    {
        entry: "./nodejs-server/server.jsx",
        output: {
            path: path.join(__dirname, "build"),
            filename: "serverBundle.js"
        },
        target: "node",
        // bug fix //
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    test: /\.jsx(\?.*)?$/i,
                }, { mangle: false }),
            ],
        },
        ////////////////
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
            ]
        }
    },
]