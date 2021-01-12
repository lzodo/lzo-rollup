function createGetter() {
    //获取属性执行此方法
    return function get(target, key, receiver) {};
}

function createSetter() {
    //设置属性执行此方法
    return function set(target, key, value, receiver) {};
}

let get = createGetter(); //为了预置参数
let set = createSetter();
export const mutableHandlers = {
    get,
    set,
};
