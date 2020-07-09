const fs = require("fs");
const path = require("path");

module.exports = function override(config, env) {
  fs.writeFileSync(path.resolve(__dirname, "webpack-config.before.json"), JSON.stringify(config, null, 2));

  const extended = applyArgon2BrowserConfig(config);

  fs.writeFileSync(path.resolve(__dirname, "webpack-config.after.json"), JSON.stringify(extended, null, 2));
  return extended;
};

/**
 *
 * https://github.com/antelle/argon2-browser/blob/master/examples/webpack/webpack.config.js
 */

function applyArgon2BrowserConfig(config) {
  config.module.rules.push({
    test: /\.wasm$/,
    loaders: ["base64-loader"],
    type: "javascript/auto",
  });

  config.module.noParse = /\.wasm$/;

  config.node = {
    ...(config.node || {}),
    __dirname: false,
    fs: "empty",
    Buffer: false,
    process: false,
  };

  return config;
}

/**
 *
 * https://www.telerik.com/blogs/using-webassembly-with-react
 */
function applyTelerikConfig(config) {
  const wasmExtensionRegExp = /\.wasm$/;

  config.resolve.extensions.push(".wasm");

  config.module.rules.forEach((rule) => {
    (rule.oneOf || []).forEach((oneOf) => {
      if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
        // make file-loader ignore WASM files
        oneOf.exclude.push(wasmExtensionRegExp);
      }
    });
  });

  // add a dedicated loader for WASM
  config.module.rules.push({
    test: wasmExtensionRegExp,
    include: path.resolve(__dirname, "src"),
    use: [{ loader: require.resolve("wasm-loader"), options: {} }],
  });

  return config;
}
