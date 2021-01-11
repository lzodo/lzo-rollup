//与webpack类似的打包工具
import ts from "rollup-plugin-typescript2"; //解析ts插件
import { nodeResolve } from "@rollup/plugin-node-resolve"; //解析第三方插件
import replace from "@rollup/plugin-replace"; //替换插件
import serveb from "rollup-plugin-serve"; //启动本地服务插件
import path from "path";
import serve from "rollup-plugin-serve";

export default {
    input: "src/index.ts", //入口
    //出口
    output: {
        name: "VueReactivity", //window.VueReactivity
        format: "umd",
        file: path.resolve("dist/vue.js"), //输出文件路径
        sourcemap: true, //生成映射文件
    },
    //插件
    plugins: [
        nodeResolve({
            extensions: [".js", ".ts"], //默认引入的文件扩展名
        }),
        //ts执行
        ts({
            tsconfig: path.resolve(__dirname, "tsconfig.json"), //ts配置文件
        }),
        //替换环境变量
        replace({
            "process.env.NOOD_ENV": JSON.stringify("development"),
        }),
        //启动服务
        serve({
            open: true,
            openPage: "/public/index.html",
            port: 3000,
            contentBase: "", //服务启动位置 默认空
        }),
    ],
};
