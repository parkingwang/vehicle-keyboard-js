
// Vue插件，Tap事件处理
// Author: 陈哈哈 yoojiachen@gmail.com

var _IS_MOBILE = /mobile|table|ip(ad|hone|od)|android/i.test(navigator.userAgent);

var plugin = {
    bind: function(el, binding){
        el.binding_ref = binding;
        el.tapEventHandler = function(evt){
            if(el.disabled) return;
            evt.stopPropagation();
            evt.cancelBubble = true;
            var value = el.binding_ref.value;
            value.event = evt;
            value.methods.call(this, value);
        };
        el.tapEventHandler_nop = function(evt){};
        if(_IS_MOBILE){
            el.addEventListener("touchstart", el.tapEventHandler, true);
            el.addEventListener("touchend", el.tapEventHandler_nop, true);
        }else{
            el.addEventListener("click", el.tapEventHandler, true);
        }
    },
    unbind: function(el){
        if(_IS_MOBILE){
            el.removeEventListener("touchstart", el.tapEventHandler, true);
            el.removeEventListener("touchend", el.tapEventHandler_nop, true);
        }else{
            el.removeEventListener("click", el.tapEventHandler, true);
        }
    },
    update: function(el, binding){
        el.binding_ref = binding;
    }
};

var vueTap = {};
vueTap.install = function(Vue) {
  Vue.directive("tap", plugin);
};

if (typeof exports == "object") {
    module.exports = vueTap;
} else if (typeof define == "function" && define.amd) {
    define([], function(){ return vueTap; });
} else if (typeof window !== "undefined" && window.Vue) {
    window.vueTap = vueTap;
    Vue.use(vueTap);
}