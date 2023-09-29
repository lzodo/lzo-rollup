// 如果有使用到的第三包中存在 commonjs 语法，就需要引入插件 @rollup/plugin-commonjs 才能生效
const commonjs = require("@rollup/plugin-commonjs");
// 如果要使用node_module下的库还要引入插件
const nodeResolve = require("@rollup/plugin-node-resolve");

export default {
  input: "src/main.js",
  output: {
    file: "dist/main.js",
    format: "cjs", // 文件输出格式规范 amd、es、iife、umd、cjs、system...
    name: "buildName", // 包的全局遍历名称
    sourcemap: true, // 生成map文件
  },
  external: ["lodash"], //告诉rollup不要将此lodash一起打包，而作为外
  global: {
    jquery: "$", //告诉rollup 全局变量$即是jquery
  },
  plugins: [commonjs(), nodeResolve()],
};

// 以多种格式输出
// output: [
//   {
//     file: "dist/main.amd.js",
//     format: "amd",
//   },
//   {
//     file: "dist/main.iife.js",
//     format: "iife",
//   },
// ];
