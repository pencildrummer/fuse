const path = require("path");
const pkg = require("./package.json");
const { dependencies, peerDependencies } = pkg;
const varname = require("varname");

/** @type {import('@types/webpack').Configuration} */
module.exports = {
  mode: "development",
  watch: process.env.NODE_ENV == "development",
  entry: path.resolve(__dirname, "./index.js"),
  output: {
    //publicPath: 'auto',
    path: path.resolve(__dirname, "dist-client"),
    filename: "main.js",
    library: {
      name: pkg.libraryName || varname.camelcase("@fuse-labs/marlin-core"),
      type: "umd",
    },
  },
  target: "web",
  externals: {
    //...Object.keys(peerDependencies)
    "@fuse-labs/core-client": "CoreClient",
    "@fuse-labs/core-ui": "CoreUi",
    "@fuse-labs/shared-utils": "SharedUtils",
    // "@radix-ui/react-icons": "ReactIcons",
    // "classnames": "classnames",
    // "filesize": "filesize",
    react: "React",
    //"react-dom": "ReactDOM",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
};
