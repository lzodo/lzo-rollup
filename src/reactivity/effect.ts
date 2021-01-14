import { isArray } from "../shared/index";

export function effect(fn, options: any = {}) {
    const effect = createReactiveEffect(fn, options);
    //没有懒加载的话创建时就直接执行
    if (!options.lazy) {
        effect();
    }
    return effect;
}
//储存当前effect
let activeEffect;
let uid = 0; //effect可以写多个
let effectStack = []; //处理外部effect嵌套的情况

//创建一个响应式effect
function createReactiveEffect(fn, options) {
    const effect = function () {
        //防止递归执行
        if (!effectStack.includes(effect)) {
            try {
                activeEffect = effect;
                effectStack.push(activeEffect);
                return fn(); //用户写的逻辑，内部会对数据进行取值操作 ，return为了计算属性能用到
            } finally {
                //执行完之后
                effectStack.pop(); //删除并返回最后一个
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };

    effect.id = uid++;
    effect.deps = []; //表示effect中依赖了哪些属性
    effect.options = options;

    return effect;
}

//{object:{key:[effect,effect]} //!结构
const targetMap = new WeakMap(); //因为WeakMap可以把obj当做key使用

//收集依赖，将key性与effect做一个关联
export function track(target, key) {
    //取值的时候不在effect中,不做收集(外部没有在effect中获取响应对象)
    if (activeEffect == undefined) {
        return;
    }
    // debugger;

    //查看targetMap中有没有当前target
    let depsMap = targetMap.get(target);
    //如果第一次进来的对象没东西,创建结构中的object，值是一个map存在depsMap中{object:{}}
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    //如果depsMap中没有当前key,则创建结果中的key,值是一个Set，存在dep中，{object:{key:Set{}}}
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    //如果dep中没有当前activeEffect,并且在当前activeEffect的deps中添加监听的key
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep); //双向记忆的过程
    }
    console.log(targetMap);
}

//最后更新
export function trigger(target, type, key, value, oldValue?) {
    const depsMap = targetMap.get(target);
    //如果映射表中根本没有改变的对象直接结束
    if (!depsMap) {
        return;
    }
    // debugger;

    const run = (effects) => {
        if (effects) {
            effects.forEach((effect) => {
                effect();
            });
        }
    };

    //如果effect没有监听数组length，当外面将length改成0，effect里数组取值无变化问题
    if (key == "length" && isArray(target)) {
        console.log(depsMap);
        depsMap.forEach((dep, key) => {
            //key 监听到数组元素下标
            console.log(dep, key);
            //如果监听的是数组length或者监听的下标比被修改的length大时，应该更新视图
            if (key == "length" || key >= value) {
                run(dep);
            }
        });
    } else {
        //处理对象
        if (key != void 0) {
            run(depsMap.get(key));
        }

        //处理 数组length=100 更新effect中监听的整个array的变化
    }
}
