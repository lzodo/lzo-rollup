export function effect(fn, options: any = {}) {
    const effect = createReactiveEffect(fn, options);
    effect();
    return effect;
}
//储存当前effect
let activeEffect;
let uid = 0; //effect可以写多个

//创建一个响应式effect
function createReactiveEffect(fn, options) {
    const effect = function () {
        activeEffect = effect;
        fn(); //用户写的逻辑，内部会对数据进行取值操作
    };

    effect.id = uid++;
    effect.deps = []; //表示effect中依赖了哪些属性
    effect.options = options;

    return effect;
}

//{obj:{key:[effect,effect]}
//收集依赖，将属性与effect做一个关联
export function track(target, key) {
    //取值的时候不在effect中,不做收集(外部没有在effect中获取响应对象)
    if (activeEffect == undefined) {
        return;
    }
}
