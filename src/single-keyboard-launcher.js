(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ?
        module.exports = factory() :
        typeof define === "function" && define.amd ? define(factory) :
        (global.KeyboardEngine = factory());
}(this, (function() {
    "use strict";

    var Vue = require("vue");
    Vue.use(require("./js/tap.js"));
    var KeyboardEngine = require("./js/engine.js");
    var $ = require("./js/utils.js");
    
    var vm = {}

    function _warning(name){
        console.info("Warning! Callback on default bridge: " + name);
    }

    // 注入平台桥接对象
    var CallbackBridge = {
        _default: {
            native_callback_changed: function(number, isCompleted){ _warning("changed"); },
            native_callback_completed: function(number, isAutoCompleted){ _warning("completed"); },
            native_callback_ontextkey: function(text){ _warning("textkey"); },
            native_callback_ondelkey: function(){ _warning("delkey"); },
            native_callback_onokkey: function(){ _warning("okkey"); },
            native_callback_onrawkey: function(key) { _warning("rawkey"); },
            native_callback_show_message: function(message) { _warning("message"); }
        },
        platform: function() {
            var isAndroid = (typeof android === "object");
            if (isAndroid) {
                return android;
            } else {
                if ($.__isFun(new Array(global.native_callback_changed,
                                            global.native_callback_completed,
                                            global.native_callback_show_message,
                                            global.native_callback_ontextkey,
                                            global.native_callback_ondelkey,
                                            global.native_callback_onokkey,
                                            global.native_callback_onrawkey
                                            ))) {
                    return global;
                } else {
                    return this._default;
                }
            }
        },
        //// 回调函数
        onchanged: function(number, isCompleted){
            $.__call(this.platform().native_callback_changed, number, isCompleted);
        },
        oncompleted: function(number, isAutoCompleted){
            $.__call(this.platform().native_callback_completed, number, isAutoCompleted);
        },
        onkeypressed: function(key) {
            try{
                $.__call(this.platform().native_callback_onrawkey, key);
            }finally{
                var p = this.platform();
                if(KeyboardEngine.KEY_TYPES.FUN_DEL === key.keyCode){
                    $.__call(p.native_callback_ondelkey);
                }else if(KeyboardEngine.KEY_TYPES.FUN_OK === key.keyCode){
                    $.__call(p.native_callback_onokkey);
                }else{
                    $.__call(p.native_callback_ontextkey, key.text);
                }
            }
        },
        onmessage: function(message) {
            $.__call(this.platform().native_callback_show_message, message);
        }
    };

    // 创建Vue组件
    vm = new Vue({
        el: "#single-keyboard-box",
        data: {
            args: {
                presetNumber: "",
                keyboardType: 2,
                inputIndex: 0,
                numberType: 0,
                provinceName: "",
                showProvince: true
            },
            callbacks: CallbackBridge
        },
        components: {
            "single-keyboard": require("./SingleKeyboard.vue")
        }
    });

    function _indexOf(presetNumber, inputIndex){
        if(inputIndex === undefined || inputIndex < 0) {
            return presetNumber.length;
        }else{
            return inputIndex;
        }
    }

    /**
     * native_update_keyboard(presetNumber, keyboardType, provinceName, numberType, inputIndex)
     * @param {* presetNumber} 预设车牌号码
     * @param {* keyboardType} 键盘类型
     * @param {* provinceName} 省份类型
     * @param {* numberType} 车牌号码类型
     * @param {* inputIndex} 当前输入位置
     */
    return function(presetNumber, keyboardType, provinceName, numberType, inputIndex){
        try {
            vm.$set(vm.$data.args, "presetNumber", presetNumber);
            vm.$set(vm.$data.args, "keyboardType", Math.max(0, Math.min(2, keyboardType)));
            vm.$set(vm.$data.args, "provinceName", provinceName);
            vm.$set(vm.$data.args, "showProvince", (provinceName != undefined && provinceName.length > 0));
            vm.$set(vm.$data.args, "inputIndex", _indexOf(presetNumber, inputIndex));
            vm.$set(vm.$data.args, "numberType", $.__orElse(numberType, 0));
        } catch (err) {
            console.log(err);
        }
    };

})));