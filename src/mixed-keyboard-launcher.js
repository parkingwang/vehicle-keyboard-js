(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ?
        module.exports = factory() :
        typeof define === "function" && define.amd ? define(factory) :
        (global.KeyboardEngine = factory());
}(this, (function() {
    "use strict";

    var Vue = require("vue");
    Vue.use(require("./js/tap.js"));

    // 注入平台桥接对象
    var CallbackBridge = {
        _default: {
            native_callback_changed: function(isCompleted, number) {
                console.log("[无回调] 输入车牌号码（输入中），当前车牌：" + number);
            },
            native_callback_completed: function(number, isAutoCompleted) {
                console.log("[无回调] 输入车牌号码（已完成），当前车牌：" + number + "，自动完成：" + isAutoCompleted);
            },
            native_callback_show_message: function(message) {
                console.log("[无回调] 提示消息：" + message);
            }
        },
        platform: function() {
            var isAndroid = (typeof android === "object");
            if (isAndroid) {
                return android;
            } else {
                if (typeof global.native_callback_completed === "function") {
                    return global;
                } else {
                    return this._default;
                }
            }
        },
        onchanged: function(number, plateMode, isCompleted) {
            this.platform().native_callback_changed(isCompleted, number);
        },
        oncommit: function(number, plateMode, isAutoCompleted) {
            this.platform().native_callback_completed(number, isAutoCompleted);
        },
        onmessage: function(message) {
            this.platform().native_callback_show_message(message);
        }
    };

    // 创建Vue组件
    var vm = new Vue({
        el: "#mixed-keyboard-box",
        data: {
            args: {
                number: "",
                province: "",
                keyboardtype: 0
            },
            callbacks: CallbackBridge
        },
        components: {
            "mixed-keyboard": require("./MixedKeyboard.vue")
        }
    });

    function _invalidType(obj, type, msg) {
        if (typeof obj !== type) {
            CallbackBridge.onshowmessage(msg);
            console.log(msg);
            return true;
        } else {
            return false;
        }
    }

    // 更新键盘组件
    return function(updateNumber, updateKeyboardType, provinceName) {
        // 默认车牌键盘类型为2
        updateKeyboardType = updateKeyboardType === undefined ? 0 : updateKeyboardType;
        console.log("收到更新键盘布局请求，车牌：" + updateNumber + "，键盘类型：" + updateKeyboardType + ", 省份：" + provinceName);
        if (_invalidType(updateNumber, "string", "初始化参数(number)必须是字符串！")) return;
        if (_invalidType(updateKeyboardType, "number", "初始化参数(keyboardType)必须是整数！")) return;
        if (_invalidType(provinceName, "string", "初始化参数(provinceName)必须是字符串！")) return;
        try {
            // 在设置车牌号码时，对车牌号码进行包装，以强制触发VUE的更新缓存数据。后续读取时，记得解包装！！
            vm.$set(vm.$data.args, "changedseed", new Date().getTime());
            vm.$set(vm.$data.args, "province", provinceName.trim());
            vm.$set(vm.$data.args, "keyboardtype", Math.max(0, Math.min(2, updateKeyboardType)));
            vm.$set(vm.$data.args, "number", updateNumber.trim().toUpperCase());
        } catch (err) {
            console.log(err);
        }
    };

})));