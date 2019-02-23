const path = require("path");

module.exports = [
    // Client Bundle 
    {
        entry: "./react-client/index.js",
        output: {
            path: path.join(__dirname, "build"),
            filename: "clientBundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['babel-preset-env', 'babel-preset-react']
                        }
                    }
                }
            ]
        },
    },
    {
        entry: "./nodejs-server/server.jsx",
        output: {
            path: path.join(__dirname, "build"),
            filename: "serverBundle.js"
        },
        target: "node",
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['babel-preset-env', 'babel-preset-react']
                        }
                    }
                }
            ]
        },
    }
]