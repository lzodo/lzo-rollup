export default {
    input: "src/main.js",
    output: {
        file: "dist/main.js",
        format: "cjs", // 文件输出格式规范 amd、es、iife、umd、cjs、system...
        name: "buildName", // 包的全局遍历名称
        sourcemap: true, // 生成map文件
    },
    external: ["lodash"], //告诉rollup不要将此lodash打包，而作为外
    global: {
        jquery: "$", //告诉rollup 全局变量$即是jquery
    },
};
