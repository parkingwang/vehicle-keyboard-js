(function (global, factory) {
    module.exports = factory();
}(this, (function () { 
    "use strict";

    // 定义键盘引擎内部的一些参数和类型说明
    // Author: 陈哈哈 yoojiachen@gmail.com

    /**
     * 键盘类型
     */
    var KB_TYPES = {
        // 全键盘
        FULL: 0,
        // 民用
        CIVIL: 1,
        // 民用+特殊车辆
        CIVIL_SPEC: 2
    };

    /** 
     * 键位功能类型
     */
    var KEY_TYPES = {
        // 普通按键
        GENERAL: 0,
        // 功能键：删除
        FUN_DEL: 1,
        // 功能键：确定
        FUN_OK: 2,
        // 功能键：更多
        FUN_MORE: 3
    };

    /**
     * 车牌号码类型
     */
    var NUM_TYPES = {
        // 未知类型
        UNKNOWN: -1,
        // 自动探测试
        AUTO_DETECT: 0,
        // 民用车牌
        CIVIL: 1,
        // 2007武警
        WJ2007: 2,
        // 2012武警
        WJ2012: 3,
        // 2012军队车牌
        PLA2012: 4,
        // 新能源车牌
        NEW_ENERGY: 5,
        // 2007大使馆车牌
        SHI2007: 6,
        // 2017新大使馆车牌
        SHI2017: 7,
        // 民航摆渡车
        AVIATION: 8,

        nameOf: function(mode) {
            switch (mode) {
                case 1: return "UNKNOWN";
                case 0: return "AUTO_DETECT";
                case 1: return "CIVIL";
                case 2: return "WJ2007";
                case 3: return "WJ2012";
                case 4: return "PLA2012";
                case 5: return "NEW_ENERGY";
                case 6: return "SHI2007";
                case 7: return "SHI2017";
                case 8: return "AVIATION";
                default: return "UNKNOWN";
            }
        },

        lenOf: function(mode){
            switch(mode){
                case 3/*2012武警*/:
                case 5/*新能源*/: return 8;
                default: return 7;
            }
        }
    };

    var _PVS = "京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新";
    var _NUM = "1234567890";
    var _LETTERS= "QWERTYUPASDFGHJKLZXCVBNM";
    var _JING = "警";
    var _123 = "123";
    var _DF = "DF";
    var _SHI2007 = "使";
    var _HK = "港";
    var _MACAO = "澳";
    var _DEL = "-";
    var _OK = "+";

    return {
        KB_TYPES: KB_TYPES,
        KEY_TYPES: KEY_TYPES,
        NUM_TYPES: NUM_TYPES,

        S_CIVIL_PVS: _PVS,
        S_PLA2012_PVS: "QVKHBSLJNGCEZ",
        S_PLA2012_AREA: "ABCDEFGHJKLMNOPRSTUVXY",
        S_NUM: _NUM,
        S_LETTERS: _LETTERS,
        S_CHARS: _NUM + _LETTERS,
        C_SHI2007: _SHI2007,
        C_HK: _HK,
        C_MACAO: _MACAO,
        C_XUE: "学",
        C_JING: _JING,
        C_MIN: "民",
        C_HANG: "航",
        S_POSTFIX_ZH: _JING + "挂领试超",
        C_W: "W",
        C_J: "J",
        C_O: "O",
        S_DF: _DF,
        S_123: _123,
        S_NEW_ENERGY: _123 + _DF,
        S_Q_IOP: "QWERTYUIOP",
        S_Q_OP: "QWERTYUOP",
        S_Q_P: "QWERTYUP",
        S_A_L: "ASDFGHJKL",
        S_Z_M: "ZXCVBNM",
        S_HK_MACAO: _HK + _MACAO,
        S_SHI2007_PVS: _SHI2007 + _123,
        C_DEL: _DEL,
        C_OK: _OK,
        C_MORE: "=",
        S_DEL_OK: _DEL + _OK,

    }
})));