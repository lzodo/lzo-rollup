import { msg } from "./utils/index.js";

let total = 10;
function main() {
  let getMsg = msg();
  return total + getMsg;
}

// 导出一各个工具后期使用
export { msg, main };
