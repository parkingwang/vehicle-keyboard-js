<template>
    <div id="rid-s-20170810142224">
        <keyboard-view
            :keyboard="dyKeyboard"
            :keycount="dyKeyCount"
            @onpadkeyclick="onClickPadKey"
            @onpadshowmoreclick="onClickShowALL"
            />
    </div>
</template>

<script>
    var KeyboardEngine = require("./js/engine.js");
    var $ = require("./js/utils.js");
    var FastProvince = require("./js/provinces.js");

    var engine = new KeyboardEngine();
    var provinces = new FastProvince();

    module.exports = {
        name: "keyboard",
        props: ["args", "callbacks"],
        computed: {
            dyKeyCount: function(){
                return $.__arrayOf(this.dyKeyboard, "row0").length;
            },
            dyKeyboard: function() {
                if(this.args.inputIndex === 0
                    && $.__orElse(this.args.provinceName, "").length >= 2
                    && $.__orElse(this.args.showProvince, true)){
                        var kb = this.updateShortcut();
                        if(kb.shortcuts.length > 1){
                            return kb;
                        }else{
                            return this.updateKeyboard();
                        }
                }else{
                    return this.updateKeyboard();
                }
            }
        },
        methods: {
            //// 内部函数
            updateKeyboard: function(){
                var layotu = {};
                try{
                    var as = this.args;
                    layout = engine.update(as.keyboardType, as.inputIndex, as.presetNumber, as.numberType);
                }catch(err){
                    this.callbacks.onmessage(err.message);
                    return layout;
                }
                // 判断输入车牌是否已完成
                var isCompleted = (layout.numberLength === layout.numberLimitLength);
                try{
                    try{
                        this.callbacks.onchanged(layout.presetNumber, isCompleted);
                    }finally{
                        if(isCompleted){
                            this.callbacks.oncompleted(layout.presetNumber, true);
                        }
                    }
                }finally{
                    return layout;
                }
            },
            updateShortcut: function(){
                return {
                    shortcuts: provinces.locationOf(this.args.provinceName).peripheryShortnames().map(function(name){ 
                        return KeyboardEngine.$newKey(name); 
                    }).slice(0, 6)// 只返回6个快捷键
                };
            },
            //// 回调函数
            onClickPadKey: function(key){
                try{
                    this.callbacks.onkeypressed(key);
                }finally{
                    if(key.keyCode === KeyboardEngine.KEY_TYPES.FUN_OK){
                        this.callbacks.oncompleted(this.args.presetNumber, false);
                    }
                }
            },
            onClickShowALL: function(){
                this.args.showProvince = false
            },
        },
        components: {
            "keyboard-view": require("./components/KeyboardView.vue")
        },
    }
</script>

<style global>
@import "./css/keyboard.css";
</style>

<style scoped>
div#rid-s-20170810142224 {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    text-align: center;
    font-family: "Helvetica Neue", Arial, sans-serif;
}
</style>