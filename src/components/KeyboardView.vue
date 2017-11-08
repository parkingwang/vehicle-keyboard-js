<template>
    <div id="keyboard-pad" v-if="hasShortcut">
        <shortcut-view :shortcuts="shortcuts" @onkeyclick="onKeyClick" @onshowmoreclick="onShowMoreClick"/>
    </div>
    <div id="keyboard-pad" v-else>
        <row-view :keys="keyboard.row0" :keycount="kc" :rowcount="rc" @onkeyclick="onKeyClick" @onkeyevent="onKeyEvent"/>
        <row-view :keys="keyboard.row1" :keycount="kc" :rowcount="rc" @onkeyclick="onKeyClick" @onkeyevent="onKeyEvent"/>
        <row-view :keys="keyboard.row2" :keycount="kc" :rowcount="rc" @onkeyclick="onKeyClick" @onkeyevent="onKeyEvent"/>
        <row-view :keys="keyboard.row3" :keycount="kc" :rowcount="rc" @onkeyclick="onKeyClick" @onkeyevent="onKeyEvent" :isfunc="(keyboard.row4.length == 0)" />
        <row-view :keys="keyboard.row4" :keycount="kc" :rowcount="rc" @onkeyclick="onKeyClick" @onkeyevent="onKeyEvent" :isfunc="true" v-if="(keyboard.row4.length > 0)" />
        <div id="keytip" 
            class="r-border"
            v-if="tipText != ''"
            :style="{'left': tipPosX, 'top': tipPosY}"
            >{{ tipText }} </div>
    </div>
</template>

<script>

var $ = require("../js/utils.js");

module.exports = {
    // keyboard 对象是键盘组件的数据对象，用于传递键盘每行的数据
    // keycount 是指定每行的键位数量
    props: ["keyboard", "keycount"],
    data: function(){
        return { tipText: "", tipPosX: "0px", tipPosY: "0px" };
    },
    methods: {
        onKeyEvent: function(evt, key){
            var self = this;
            var _reset = function(){ self.tipText = ""; };
            if(key.enabled && !key.isFunKey){
                this.tipText = key.text;
                var dom = evt.target;
                // 60px 是tooltip的固定宽度
                // 62px 是tooltip的固定高度 + 间隔
                this.tipPosX = (dom.offsetLeft - Math.abs(60 - dom.clientWidth)/4 ) + "px";
                this.tipPosY = (dom.offsetTop - 62) + "px";
                setTimeout(_reset, 250);
            }else{
                _reset();
            }
        },
        onKeyClick: function(key){
            this.$emit("onpadkeyclick", key);
        },
        onShowMoreClick: function(){
            this.$emit("onpadshowmoreclick");
        }
    },
    components: {
        "row-view": require("./KeyRowView.vue"),
        "shortcut-view": require("./ShortcutView.vue"),
    },
    computed: {
        // key count
        kc: function(){ return this.keycount; },
        // row count
        rc: function(){ return $.__arrayOf(this.keyboard, "row4").length === 0 ? 4 : 5; },
        shortcuts: function(){ return $.__arrayOf(this.keyboard, "shortcuts"); },
        hasShortcut: function(){ return this.shortcuts.length > 0; }
    }
}
</script>