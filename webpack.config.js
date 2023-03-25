const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Weather App",
            template: "./src/index.ejs", //load custom html template
        }),
    ],
    module: {
        rules: [
            // Makes it so i can import css
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            // Makes it so i can import images
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: "asset/resource",
            },
        ],
    },
    // Also for dev server
    optimization: {
        runtimeChunk: "single",
    },
};
