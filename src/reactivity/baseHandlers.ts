import { track } from "./effect";
import {
    hasChanged,
    hasOwn,
    isArray,
    isInteger,
    isObject,
    isSymbol,
} from "../shared/index";
import { reactive } from "./reactive";

function createGetter() {
    //获取属性执行此方法
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver); //res = target[key]
        //如果取值是symbol则忽略它,数组中有很多symbol内置方法
        if (isSymbol(key)) {
            return res;
        }
        //收集依赖
        track(target, key); //收集 target的key
        console.log("此时数据做了获取操作");

        //如果是对象
        if (isObject(res)) {
            return reactive(res);
        }
        return res;
    };
}

function createSetter() {
    //设置属性执行此方法
    return function set(target, key, value, receiver) {
        const oldValue = target[key]; //获取老值

        //如果target是数组并且key是数字的话 => 一定是修改数组索引的操作
        //数组:数字key小于数组长度 => 修改; hadKey:true
        //对象:key在target上则修改; hadKey:true
        const hadKey =
            isArray(target) && isInteger(key)
                ? Number(key) < target.length
                : hasOwn(target, key);

        if (!hadKey) {
            console.log("新增属性");
        } else if (hasChanged(value, oldValue)) {
            console.log("修改属性");
        }

        const res = Reflect.set(target, key, value, receiver);
        return res;
    };
}

let get = createGetter(); //为了预置参数
let set = createSetter();
export const mutableHandlers = {
    get,
    set,
};
