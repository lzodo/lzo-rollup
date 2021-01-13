export const isObject = (val) => typeof val == "object" && val != null;
export const isSymbol = (val) => typeof val == "symbol";

export const isArray = Array.isArray;
export const isInteger = (key) => "" + parseInt(key, 10) === key; //是否是一个数字(主要看key能否转成数字)

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val, key) => hasOwnProperty.call(val, key); //判断key是是不是val的私有属性

export const hasChanged = (value, oldvalue) => value != oldvalue; //判断新老值是否不同
