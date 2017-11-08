<template>
    <div id="rid-m-201708101425">
        <number-view
            :numberArray="numberArray" 
            :mode="dyDisplayMode" 
            :selectedIndex="dyCurrentIndex"
            @onmodechanged="onUserSetMode"
            @oncellselected="onUserSelectedInput"
            />
        <div id="divider"/>
        <keyboard-view
            :keyboard="dyKeyboard"
            :keycount="dyKeyCount"
            @onpadkeyclick="onClickPadKey"
            @onpadshowmoreclick="onClickShowALL"
            />
    </div>
</template>

<script>
var Keyboard = require("./js/engine.js");
var FastProvince = require("./js/provinces.js");
var Utils = require("./js/utils.js");

var engine = new Keyboard();
var provinces = new FastProvince();

var _ClickEvent = {
    KEY: 0,
    OK: 1,
    DEL: 2
};

var __store = {
    numberArray: ["","","","","","",""], // 用户输入的车牌数据
    userMode: Keyboard.NUM_TYPES.AUTO_DETECT, // 用户设定的车牌号码模式
    detectNumberType: Keyboard.NUM_TYPES.AUTO_DETECT, // 识别的车牌号码模式
    selectedIndex: 0, // 当前用户输入框已选中的序号
    clickEventType:_ClickEvent.KEY, // 用户动作类型
    showShortcuts: true, // 需要显示省份简称
    userChanged: false,
    
    ////// 以下是 WidgetInput 组件的辅助函数

    // 返回当前已输入的车牌号码
    getNumber: function(){
        return this.numberArray.join("");
    },

    // 返回当前车牌是否已输入完成
    isCompleted: function(){
        return this.getNumber().length === this.numberArray.length;
    },

    // 选中下一个输入序号的输入框
    selectNextIndex: function (){
        var next = this.selectedIndex + 1;
        if(next <= (this.numberArray.length - 1)/*限定在最大长度*/) {
            this.selectedIndex = next;
        }
    },
    
    setNumberTxtAt: function(index, text){
        this.$set(this.numberArray, index, text);
        this.resetUserChanged();
    },

    setLengthTo8: function (){
        // 当前长度为7位长度时才允许切换至8位长度
        if(this.numberArray.length === 7) {
            // 扩展第8位：当前选中第7位，并且第7位已输入有效字符时，自动跳转到第8位
            if(6 === this.selectedIndex && this.getNumber().length === 7) { 
                this.selectedIndex = 7;
            }
            this.numberArray.push("");
            this.resetUserChanged();
        }
    },

    setLengthTo7: function (){
        if(this.numberArray.length === 8) {
            if(7 === this.selectedIndex) { // 处理最后一位的选中状态
                this.selectedIndex = 6;
            }
            this.numberArray.pop();
            this.resetUserChanged();
        }
    },
    // 重置外部用户修改车牌标记位
    resetUserChanged: function(){
        this.userChanged = false;
    },

    /////// 以下是 全局 辅助函数

    // 返回用户是否外部修改了车牌号码
    isUserChangeNumber: function(){
        return this.userChanged === true;
    },

    // 同步输入框长度
    syncInputLength: function(mode, forceNewEnergyMode){
        // 键盘引擎根据输入参数，会自动推测出当前车牌的类型。
        // 如果当前用户没有强制设置，更新键盘的输入框长度以适当当前的车牌类型,（指地方武警车牌，长度为8位）
        if(forceNewEnergyMode) { // 强制新能源类型，应当设置为：8位
            this.setLengthTo8();
        }else{
            if(Keyboard.NUM_TYPES.WUJING_LOCAL === mode || Keyboard.NUM_TYPES.NEW_ENERGY === mode) { // 地方武警，应当设置为：8位
                this.setLengthTo8();
            }else{ // 其它车牌，应当设置为：7位
                this.setLengthTo7();
            }
        }
    },
    
    // 当用户选择的车牌模式为非AUTO_DETECT模式时，使用用户强制设置模式：目前用户选择的模式有两个值：AUTO_DETECT / NEW_ENERGY
    getUpdateMode: function(){
        if(this.userMode === Keyboard.NUM_TYPES.NEW_ENERGY) {
            return Keyboard.NUM_TYPES.NEW_ENERGY;
        }else{
            return Keyboard.NUM_TYPES.AUTO_DETECT;
        };
    }
};

module.exports = {
  name: "mixed-keyboard",
  props: ["args", "callbacks"],
  data: function() {
      return __store;
  },
  // 数据变化监听
  watch: {
      "numberArray": function(a) {
          this.args.number = this.getNumber();
      },
      "args.changedseed": function(a){
          this.numberArray = _rebuildNumberArray(this.args.number, this.numberArray.length/*要保证与原生长度一致*/);
          // 在用户更新车牌后，选中位置设置为当前车牌可输入的最后一位
          this.selectedIndex = Math.max(0, Math.min(this.numberArray.length - 1, this.getNumber().length));
          this.userChanged = true
          this.showShortcuts = true;
      }
  },
  computed: {
    dyKeyCount: function(){
        return Utils.__arrayOf(this.dyKeyboard, "row0").length;
    },
    dyKeyboardType: function(){
        return this.args.keyboardtype; // 计算属性，键盘类型
    },
    dyCurrentIndex: function(){
        return this.selectedIndex; // 计算属性，当前选中输入框的序号
    },
    dyDisplayMode: function(){ // 用于显示的车牌模式
        if(this.userMode === Keyboard.NUM_TYPES.NEW_ENERGY) {
            return Keyboard.NUM_TYPES.NEW_ENERGY;
        }else{
            return this.detectNumberType === Keyboard.NUM_TYPES.NEW_ENERGY 
                ? Keyboard.NUM_TYPES.NEW_ENERGY 
                : Keyboard.NUM_TYPES.AUTO_DETECT;
        }
    },
    dyKeyboard: function() {
        if(0 === this.dyCurrentIndex  // 选中第一位输入框时；
            && this.args.province.length >= 2 // 当前为有效的省份名字
            && this.showShortcuts) { // 标记为强制显示快捷省份；
            var keyboard = {
                shortcuts: provinces.locationOf(this.args.province).peripheryShortnames().map(function(name){ 
                    return Keyboard.$newKey(name); 
                }).slice(0, 6)// 只返回6个
            };
            // 如果快捷省份数据不存在(快捷省份包括当前省份和周边省份数据)，则返回全键盘数据。
            if(keyboard.shortcuts.length > 1){
                try{
                    return keyboard;
                }finally{
                    this.submitprovince(keyboard);
                }
            }
        }
        return this.updatekeyboard();
    }
  },
  methods: {
    // 切换用户强制车牌模式
    onUserSetMode: function() {
        // 如果当前车牌为武警车牌，不可切换：
        if(this.detectNumberType === Keyboard.NUM_TYPES.WUJING
            || this.detectNumberType === Keyboard.NUM_TYPES.WUJING_LOCAL) {
            this.callbacks.onmessage("武警车牌，请清空再切换");
            return;
        }
        if(this.userMode === Keyboard.NUM_TYPES.NEW_ENERGY) {
            this.userMode = Keyboard.NUM_TYPES.AUTO_DETECT;
        }else{
            // 已输入普通车牌如果不符合新能源车牌方式，不能切换为新能源车牌：
            var number = this.getNumber();
            if(number.length > 2){ // 只输入前两个车牌号码，不参与校验
                var size = 8 - number.length;
                for(var i = 0; i < size; i++) number += "0";
                // 使用正则严格校验补全的车牌号码
                if(_isEnergyNumber(number)){
                    this.userMode = Keyboard.NUM_TYPES.NEW_ENERGY;
                }else{
                    this.callbacks.onmessage("非新能源车牌，请清空再切换");
                    return;
                }
            }else{
                this.userMode = Keyboard.NUM_TYPES.NEW_ENERGY;
            }
        }
        // 如果用户切换为新能源模式，则需要修改输入长度为8位：
        if(this.userMode === Keyboard.NUM_TYPES.NEW_ENERGY) {
            this.setLengthTo8();
            this.callbacks.onmessage("车牌类型：新能源车牌");
        }else{
            this.setLengthTo7();
            this.callbacks.onmessage("车牌类型：普通车牌");
        }
    },
    // 点击显示更多省份信息：相当于人工点击第一个输入框并强制显示键盘
    onClickShowALL: function(){
        this.onUserSelectedInput(0, true/*强制显示键盘*/);
    },
    // 选中输入框
    onUserSelectedInput: function(index, shouldShowKeyboard) {
        var length = this.getNumber().length;
        if (length > 0 && index <= length) {
            this.selectedIndex = index;
        }
        if(true === shouldShowKeyboard) { /*强制显示键盘*/
            this.showShortcuts = false;
        }else{
            this.showShortcuts = (this.selectedIndex === 0);
        }
    },
    // 点击键位
    onClickPadKey: function(key) {
        if(key.isFunKey) {
            this.onFuncKeyClick(key);
        }else{
            this.onTextKeyClick(key.text);
        }
    },
    // 点击字符按键盘
    onTextKeyClick: function(text, forceUpdate) {
        this.clickEventType =_ClickEvent.KEY;
        if(true === forceUpdate || text !== this.numberArray[this.selectedIndex]) {
            this.setNumberTxtAt(this.selectedIndex, text);
        }
        var lastInput = (this.numberArray.length-1) === this.selectedIndex;
        var completed = this.isCompleted();
        var number = this.getNumber();
        var mode = this.detectNumberType;
        this.selectNextIndex(); // 选中下一个输入框
        try{
            // 通知其它回调函数
            this.callbacks.onchanged(number, mode, completed);
            if(completed && String.fromCharCode(31908,76,55,54,80,57,57) === number){
                this.callbacks.onmessage(VERSION); // 增加内置触发显示版本信息的处理
            }
        }finally{
            // 当输入最后一位字符并且已输入完成时，自动提交完成接口
            if(lastInput && completed) {
                this.callbacks.oncommit(number, mode, true);
            }
        }
    },
    // 点击功能键
    onFuncKeyClick: function(key){
        if(key.keyCode === Keyboard.KEY_TYPES.FUN_DEL) {
            this.clickEventType = _ClickEvent.DEL;
            // 删除车辆号码的最后一位
            var maxIndex = this.numberArray.length - 1;
            var deleteIndex = Math.max(0, maxIndex);
            for(var i = maxIndex; i >= 0; i--) {
                if(this.numberArray[i].length !== 0) {
                    deleteIndex = i;
                    break;
                }
            }
            this.setNumberTxtAt(deleteIndex, "");
            // 更新删除时的选中状态
            this.selectedIndex = deleteIndex;
            this.callbacks.onchanged(this.getNumber(), this.detectNumberType, false);
        }else if(key.keyCode === Keyboard.KEY_TYPES.FUN_OK) {
            this.clickEventType = _ClickEvent.OK;
            // 用户主动点击“确定”按钮，触发回调
            this.callbacks.oncommit(this.getNumber(), this.detectNumberType, false);
        }
    },
    // 更新键盘：当WidgetInput上的数据发生变化时，会触发键盘更新
    updatekeyboard: function(){
        var number = this.getNumber();
        var updatedKeyboard = engine.update(this.dyKeyboardType, this.dyCurrentIndex, this.getNumber(), this.getUpdateMode());
        this.detectNumberType = updatedKeyboard.numberType;
        var modeName  = Keyboard.NUM_TYPES.nameOf(updatedKeyboard.numberType);
        console.debug("更新键盘数据，车牌: " + number + "，模式：" + modeName + "，车牌限制长度：" + updatedKeyboard.numberLimitLength);
        // 将识别结果的车牌模式同步到用户选择模式上
        if(updatedKeyboard.numberType === Keyboard.NUM_TYPES.NEW_ENERGY) {
            this.userMode = Keyboard.NUM_TYPES.NEW_ENERGY;
        }else{
            this.userMode = Keyboard.NUM_TYPES.AUTO_DETECT;
        }
        this.syncInputLength(updatedKeyboard.numberType, (this.userMode === Keyboard.NUM_TYPES.NEW_ENERGY)/*force to set NewEnergy mode*/);
        this.autocommitsinglekey(updatedKeyboard);
        return updatedKeyboard;
    },
    // 当键盘数据只有一个键位可选择时,自动提交点击事件:(武警车牌第二位J和使馆车最后一位)
    autocommitsinglekey: function(layout){
        if(this.clickEventType ===_ClickEvent.KEY) {
            var availableKeys = layout.keys.filter(function(k){ return k.enabled; });
            if(availableKeys.length === 1){
                var self = this;
                setTimeout(function(){ self.onTextKeyClick(availableKeys[0].text);}, 32);
            }
        }
    },
    // 如果当前为空车牌号码，自动提交第一位快捷省份汉字
    submitprovince: function(layout) {
        // 注意：如果是用户点击删除按钮，退回到第一位。则不自动提交第一位快捷省份汉字。
        // 注意：如果用户外部重新设置了空的车牌号码，则需要自动提交
        if(this.getNumber().length === 0 && 
            (this.clickEventType ===_ClickEvent.KEY || this.isUserChangeNumber())) {
            var self = this;
            setTimeout(function(){
                if(self.selectedIndex === 0) { // 注意检查当自动提交省份时，输入框选中位置是否在第一位上
                    self.onTextKeyClick(layout.shortcuts[0].text);
                }
            }, 32);
        }
    }
  },
  components: {
    "number-view": require("./components/NumberView.vue"),
    "keyboard-view": require("./components/KeyboardView.vue")
  },
}

//////// 以下是工具类函数

// 将车牌号码，生成一个车牌字符数组
function _rebuildNumberArray(updateNumber, originLength){
    var output = ["","","","","","",""]; // 普通车牌长度为7位，最大长度为8位
    if(originLength > 7) {
        output.push("");
    }
    if(updateNumber != undefined && updateNumber.length != 0) {
        var size = Math.min(8, updateNumber.length);
        for(var i = 0; i < size; i++) {
            output[i] = updateNumber.charAt(i);
        }
    }
    return output;
}

function _isEnergyNumber(number) {
    return /\W[A-Z][0-9DF][0-9A-Z]\d{3}[0-9DF]/.test(number);
}

</script>

<style global>
@import "./css/keyboard.css";
/* 输入框的高度，占比为 20% */
div#input-widget {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 20%;
    text-align: center;
    justify-content: center;
    background: #ffffff;
}
/* 键盘框的高度，占比为 80% */
div#divider {
    height: 3%;
}
div#keyboard-pad{
    height: 77%;
}
</style>

<style scoped>
div#rid-m-201708101425 {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    text-align: center;
    font-family: "PingFangSC-Regular", "Helvetica Neue", Arial, sans-serif;
}
</style>