// 更改为 node 的 commonjs 写法

const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");

const { babel } = require("@rollup/plugin-babel");
const { terser } = require("rollup-plugin-terser");

// scss 找插件
const scss = require("rollup-plugin-scss");
// 打包模板代码存在 css 的处理
const postcss = require("rollup-plugin-postcss");

// 1、打包 vue  (先安装编译插件 @vue/compiler-sfc,新版本可能内置了，测试没安装也能使用)
// 2、安装 @rollup/plugin-replace，将 process插入到vue中 处理 process is not defined 报错问题（webpack defaultPlugin 是有自动插入的）
const vue = require("rollup-plugin-vue");
const replace = require("@rollup/plugin-replace");

// 1、搭建本地服务器
const serve = require("rollup-plugin-serve");
// 2、监听文件变化自动刷新浏览器
const livereload = require("rollup-plugin-livereload");
// 3、npx rollup -c -w 启动实时监听文件变化

// 运行环境
// npx rollup -c --environment NODE_ENV:development -w
// npx rollup -c --environment NODE_ENV:production
// 判断生产环境还是开发环境,分离插件，不同环境使用不同插件
let isProduction = process.env.NODE_ENV == "production";
let plugins = [
  commonjs(),
  nodeResolve(),
  babel({ babelHelpers: "bundled", exclude: /node_modules/ }),
  terser(),
  // scss(), // 用 postcss 就不需要scss插件了
  postcss({
    plugins: [
      require("postcss-preset-env"), // 浏览器兼容前缀，可以直接写在 postcss.config.js 配置文件中
    ],
  }),
  vue(),
  replace({
    preventAssignment: true,
    "process.env.NODE_ENV": `"production"`, // JSON.stringify('production')
  }),
  serve({
    port: 7080,
    open: true,
    contentBase: ".", //要服务的文件件夹
  }),
  livereload(),
];

module.exports = {
  input: "src/main.js",
  output: {
    file: "dist/main.js",
    format: "iife",
    name: "buildName",
    sourcemap: false,
  },
  external: ["lodash"],
  plugins: plugins,
};
