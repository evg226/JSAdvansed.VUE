const path = require("path");
module.exports = {
    entry: "./src/main.js",
    output: {
        filename:"build.js",
        path: path.resolve(__dirname,"dist")
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000
    }
}