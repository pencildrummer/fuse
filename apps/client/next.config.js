const withTM = require("next-transpile-modules")([
  // TODO - Make dynamic? Or leave it hardcode because plugins will be loaded runtime later?
  "@fuse-labs/core-ui",
  "@fuse-labs/core-client",
  "@fuse-labs/shared-utils",
  "@fuse-labs/terminal-client",
  "@fuse-labs/file-manager-client",
  "@fuse-labs/marlin-core-client",
  "@fuse-labs/marlin-settings-client",
  "@fuse-labs/marlin-temperature-client",
  "@fuse-labs/marlin-move-client",
  "@fuse-labs/marlin-extruder-client",
  "@fuse-labs/marlin-extra-client",
  "@fuse-labs/marlin-gcode-viewer-client",
]);

const config = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/workspace",
        permanent: true,
      },
      {
        source: "/settings",
        destination: "/settings/general",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/settings",
        destination: "/settings/general",
      },
    ];
  },

  webpack: (config, options) => {
    // To avoid warning missing bufferutil anf utf-8
    // See: https://github.com/netlify/netlify-lambda/issues/179
    if (options.isServer) {
      // Server side
      config.externals = [...config.externals, "utf-8-validate", "bufferutil"];
    }

    if (!options.isServer) {
      config.module.rules.push({
        test: require.resolve("react"),
        loader: "expose-loader",
        options: {
          exposes: "React",
        },
      });

      config.module.rules.push({
        test: require.resolve("react-dom"),
        loader: "expose-loader",
        options: {
          exposes: "ReactDOM",
        },
      });

      config.module.rules.push({
        test: require.resolve("@fuse-labs/core-client"),
        loader: "expose-loader",
        options: {
          exposes: "CoreClient",
        },
      });

      config.module.rules.push({
        test: require.resolve("@fuse-labs/core-ui"),
        loader: "expose-loader",
        options: {
          exposes: "CoreUi",
        },
      });
    }

    //console.log('Adding loader - ', options.isServer ? 'SERVER' : 'CLIENT')

    // SVG Loader for @fuse-labs/core-ui package
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer: { and: [/\.(js|ts)x?$/] },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = withTM(config);
