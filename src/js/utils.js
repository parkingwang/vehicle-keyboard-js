
// 工具函数
// Author: 陈哈哈 yoojiachen@gmail.com

export function __arrayOf(obj, fieldName) {
    var arr = obj[fieldName];
    return arr ? arr : [];
}

export function __orElse(val, def){
    return val === undefined ? def : val;
}

export function __isFun(vars){
    var check = function(fun){
        return typeof fun === "function";
    };
    if(Array.isArray(vars)){
        return vars.some(check)
    }else{
        return check(vars);
    }
}

export function __call(fun, var1, var2) {
    if(fun !== undefined && typeof fun === "function") {
        fun.apply(fun, new Array(var1, var2));
    }
}
