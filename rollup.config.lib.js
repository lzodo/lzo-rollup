// 更改为 node 的 commonjs 写法

const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");

// babel, 安装 @babel/preset-env 并配置 babel.config.js
const { babel } = require("@rollup/plugin-babel");
// 压缩，如果无效可以用 @rollup/plugin-babel
const { terser } = require("rollup-plugin-terser");

module.exports = {
  input: "lib/main.js",
  output: {
    file: "distLib/main.js",
    format: "cjs",
    name: "buildName",
    sourcemap: false,
  },
  external: ["lodash"],
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({ babelHelpers: "bundled", exclude: /node_modules/ }),
    terser(),
  ],
};
