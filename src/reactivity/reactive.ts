import { isObject } from "../shared/index";
import { mutableHandlers } from "./baseHandlers";

export function reactive(target) {
    //我们要将target对象转化为Proxy代理对象
    return createReactiveObject(target, mutableHandlers); //读取文件时做依赖收集，数据变化时重新执行effetc
}

const proxyMap = new WeakMap(); //创建一个映射表

function createReactiveObject(target, mutableHandlers) {
    //如果不是对象直接返回原数据
    if (!isObject(target)) {
        return target;
    }

    //验证改target有没有被代理过,如果有直接返回
    const exisitingProxy = proxyMap.get(target);
    if (exisitingProxy) {
        return exisitingProxy;
    }

    //只对最外层对象做代理，默认不会递归，而且不会重写对象中的属性
    let proxy = new Proxy(target, mutableHandlers);

    //将代理的对象与代理的结果做一个映射表
    proxyMap.set(target, proxy);

    return proxy;
}
