import { msg } from "./utils/index.js";
import "./static/css/global.css";
import "./static/scss/global.scss";
import { createApp } from "vue";
import App from "./vue/App.vue";

// 工具函数
let total = 10;
function mai() {
  let getMsg = msg();
  return total + getMsg;
}

console.log(mai());

// dom 操作
let a = document.createElement("a");
a.innerText = "创建dom";
document.body.append(a);

// vue
let vm = createApp(App);
vm.mount("#app");
