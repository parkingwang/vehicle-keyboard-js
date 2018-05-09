(function(global, factory) {
    module.exports = factory();
}(this, (function() {
    "use strict";

    // 定义键盘引擎内部键盘响应逻辑
    // Author: 陈哈哈 yoojiachen@gmail.com

    var frm = require("./frm.js")
    var def = require("./define.js")
    var hlp = require("./helper")

    /** 全局配置 */
    var _GlobalConf = {
        // 键位提供器
        keyProvider: frm.Chain.create({}),
        // 布局提供器
        layoutProvider: frm.Chain.create({}),
        // 布局混合
        mixiner: frm.Each.create()
    };

    ////// 注册布局提供器 START //////

    
    // 民用键盘布局：
    var _LAYOUT_CIVIL = "layout.c";
    frm.Cached.reg({
        row0: hlp.keysOf(def.S_CIVIL_PVS.substr(0, 9)), // 京津晋冀蒙辽吉黑沪
        row1: hlp.keysOf(def.S_CIVIL_PVS.substr(9, 8)), // 苏浙皖闽赣鲁豫鄂
        row2: hlp.keysOf(def.S_CIVIL_PVS.substr(17, 8)), // 湘粤桂琼渝川贵云
        row3: hlp.keysOf(def.S_CIVIL_PVS.substr(25, 6) + def.S_DEL_OK), // 藏陕甘青宁新-+
    }, _LAYOUT_CIVIL, 0);
    frm.Cached.reg({
        row0: hlp.keysOf(def.S_NUM),
        row1: hlp.keysOf(def.S_Q_OP + def.C_MACAO),
        row2: hlp.keysOf(def.S_A_L + def.C_HK),
        row3: hlp.keysOf(def.S_Z_M + def.S_DEL_OK),
    }, _LAYOUT_CIVIL, 1);
    frm.Cached.reg({
        row0: hlp.keysOf(def.S_NUM),
        row1: hlp.keysOf(def.S_Q_P + def.S_HK_MACAO),
        row2: hlp.keysOf(def.S_A_L + def.C_XUE),
        row3: hlp.keysOf(def.S_Z_M + def.S_DEL_OK),
    }, _LAYOUT_CIVIL, [2, 3, 4, 5, 6, 7]);


    // 民用+特殊车牌布局：
    var _LAYOUT_SPEC = "layout.s";
    var _LAYOUT_SPEC_FULL = "layout.s.f";
    frm.Cached.reg({
        row0: hlp.keysOf(def.S_CIVIL_PVS.substr(0, 9)), // "京津晋冀蒙辽吉黑沪"
        row1: hlp.keysOf(def.S_CIVIL_PVS.substr(9, 9)), // "苏浙皖闽赣鲁豫鄂湘"
        row2: hlp.keysOf(def.S_CIVIL_PVS.substr(18, 9)), // "粤桂琼渝川贵云藏"
        row3: hlp.keysOf(def.S_CIVIL_PVS.substr(25, 5) + def.C_SHI2007 +def.C_W + def.S_DEL_OK), // 陕甘青宁新使W-+
    }, _LAYOUT_SPEC, 0);
    frm.Cached.reg({
        row0: hlp.keysOf(def.S_NUM + def.S_CIVIL_PVS.substr(0, 1)),
        row1: hlp.keysOf(def.S_CIVIL_PVS.substr(1, 11)),
        row2: hlp.keysOf(def.S_CIVIL_PVS.substr(12, 11)),
        row3: hlp.keysOf(def.S_CIVIL_PVS.substr(22, 8) + def.S_DEL_OK),
    }, _LAYOUT_SPEC, 2);

    frm.Cached.reg({
        row0: hlp.keysOf(def.S_NUM + def.S_CIVIL_PVS.substr(0, 1)),
        row1: hlp.keysOf(def.S_CIVIL_PVS.substr(1, 11)),
        row2: hlp.keysOf(def.S_CIVIL_PVS.substr(12, 10)),
        row3: hlp.keysOf(def.S_CIVIL_PVS.substr(22, 9) + def.C_DEL),
    }, _LAYOUT_SPEC_FULL, 2);


    // 全键盘布局：
    var _LAYOUT_FULL = "layout.f";
    frm.Cached.reg({
        row0: hlp.keysOf(def.S_CIVIL_PVS.substr(0, 10)), // "京津晋冀蒙辽吉黑沪苏"
        row1: hlp.keysOf(def.S_CIVIL_PVS.substr(10, 10)), // "浙皖闽赣鲁豫鄂湘粤桂"
        row2: hlp.keysOf(def.S_CIVIL_PVS.substr(20, 10)), // "琼渝川贵云藏陕甘青宁"
        row3: hlp.keysOf(def.S_CIVIL_PVS.substr(30, 1) + def.C_MIN + def.S_SHI2007_PVS + def.C_W + def.S_PLA2012_PVS.substr(0, 4)), // 新民使123WQVKH
        row4: hlp.keysOf(def.S_PLA2012_PVS.substr(4, 9) + def.C_DEL)
    }, _LAYOUT_FULL, 0);
    frm.Cached.reg({
        row0: hlp.keysOf(def.S_NUM),
        row1: hlp.keysOf(def.S_Q_IOP),
        row2: hlp.keysOf(def.S_A_L),
        row3: hlp.keysOf(def.S_Z_M + def.C_XUE + def.C_HANG),
        row4: hlp.keysOf(def.S_HK_MACAO + def.S_POSTFIX_ZH + def.C_SHI2007 + def.C_DEL)
    }, _LAYOUT_FULL, 1);
    frm.Cached.reg({
        row0: hlp.keysOf(def.S_NUM),
        row1: hlp.keysOf(def.S_Q_IOP),
        row2: hlp.keysOf(def.S_A_L),
        row3: hlp.keysOf(def.S_Z_M + def.C_XUE),
        row4: hlp.keysOf(def.S_HK_MACAO + def.S_POSTFIX_ZH + def.C_SHI2007 + def.C_DEL)
    }, _LAYOUT_FULL, [2, 3, 4, 5, 6, 7]);

    
    // 处理“民用+武警”的特殊键位2种情况:
    // 1 - 第一位键盘布局中，显示带武警字符的特殊布局:
    _GlobalConf.layoutProvider.reg(function(chain, args) {
        if (0 === args.index && args.keyboardType === def.KB_TYPES.CIVIL_SPEC) {
            return frm.Cached.load(_LAYOUT_SPEC, 0);
        } else {
            return chain.next(args);
        }
    });

    // 2 - 第二位键盘布局中，当输入的车牌为武警车牌时，才显示武警特殊布局:
    _GlobalConf.layoutProvider.reg(function(chain, args) {
        if (2 === args.index &&
            args.keyboardType !== def.KB_TYPES.CIVIL &&
            (def.NUM_TYPES.WJ2007 === args.numberType || def.NUM_TYPES.WJ2012 === args.numberType)) {
            if (args.keyboardType === def.KB_TYPES.FULL) {
                return frm.Cached.load(_LAYOUT_SPEC_FULL, 2);
            } else {
                return frm.Cached.load(_LAYOUT_SPEC, 2);
            }
        } else {
            return chain.next(args);
        }
    });

    // 其它注册布局提供器
    _GlobalConf.layoutProvider.reg(function(chain, args) {
        if (args.keyboardType === def.KB_TYPES.FULL) {
            return frm.Cached.load(_LAYOUT_FULL, args.index);
        } else {
            return frm.Cached.load(_LAYOUT_CIVIL, args.index);
        }
    });

    ////// 注册布局提供器 END //////

    ////// 可用键位提供器 START //////

    var _KEY_ANY = "keys.any";
    var _KEY_CIVIL = "keys.civil";
    var _KEY_PLA2012 = "keys.army";
    var _KEY_WJ = "keys.wj";
    var _KEY_AVIATION = "keys.aviation";
    var _KEY_SHI2007 = "keys.embassy";
    var _KEY_SHI2007_ZH = "keys.embassy.zh";
    var _KEY_NUMBRICS = "keys.num";
    var _KEY_NUMBRICS_LETTERS = "keys.num.letters";
    var _KEY_O_POLICE = "keys.O.police";
    var _KEY_NUMERICS_DF = "keys.num.df";
    var _KEY_HK_MACAO = "keys.hk.macao";
    var _KEY_POSTFIX = "keys.postfix";

    frm.Cached.reg(hlp.keysOf(def.S_CIVIL_PVS + def.S_SHI2007_PVS + def.C_W + def.S_PLA2012_PVS + def.C_MIN), _KEY_ANY);
    frm.Cached.reg(hlp.keysOf(def.S_NUM), _KEY_NUMBRICS);
    frm.Cached.reg(hlp.keysOf(def.S_CHARS), _KEY_NUMBRICS_LETTERS);
    frm.Cached.reg(hlp.keysOf(def.S_CHARS + def.C_JING), _KEY_O_POLICE);

    frm.Cached.reg(hlp.keysOf(def.S_LETTERS + def.C_O), _KEY_CIVIL, 1);
    frm.Cached.reg(hlp.keysOf(def.S_PLA2012_AREA), _KEY_PLA2012, 1);
    frm.Cached.reg(hlp.keysOf(def.S_123), _KEY_SHI2007, 1);
    frm.Cached.reg(hlp.keysOf(def.C_J), _KEY_WJ, 1);
    frm.Cached.reg(hlp.keysOf(def.C_HANG), _KEY_AVIATION, 1);

    frm.Cached.reg(hlp.keysOf(def.S_NUM + def.S_CIVIL_PVS), _KEY_WJ, 2);

    frm.Cached.reg(hlp.keysOf(def.S_NUM + def.S_DF), _KEY_NUMERICS_DF);
    frm.Cached.reg(hlp.keysOf(def.S_HK_MACAO), _KEY_HK_MACAO);
    frm.Cached.reg(hlp.keysOf(def.S_CHARS + def.S_POSTFIX_ZH + def.C_XUE), _KEY_POSTFIX);
    frm.Cached.reg(hlp.keysOf(def.C_SHI2007), _KEY_SHI2007_ZH);

    // 键位提供器，Index：0
    _GlobalConf.keyProvider.reg(function(chain, args) {
        if (0 === args.index) {
            return frm.Cached.load(_KEY_ANY);
        } else {
            return chain.next(args);
        }
    });

    // 键位提供器，Index：1
    _GlobalConf.keyProvider.reg(function(chain, args) {
        if (1 === args.index) {
            switch (args.numberType) {
                case def.NUM_TYPES.PLA2012: return frm.Cached.load(_KEY_PLA2012, 1);
                case def.NUM_TYPES.WJ2007:
                case def.NUM_TYPES.WJ2012: return frm.Cached.load(_KEY_WJ, 1);
                case def.NUM_TYPES.AVIATION: return frm.Cached.load(_KEY_AVIATION, 1);
                case def.NUM_TYPES.SHI2007: return frm.Cached.load(_KEY_SHI2007, 1);
                case def.NUM_TYPES.SHI2017: return frm.Cached.load(_KEY_NUMBRICS);
                default: return frm.Cached.load(_KEY_CIVIL, 1);
            }
        } else {
            return chain.next(args);
        }
    });

    // 键位提供器，Index：2
    _GlobalConf.keyProvider.reg(function(chain, args) {
        if (2 === args.index) {
            switch (args.numberType) {
                case def.NUM_TYPES.WJ2007:
                case def.NUM_TYPES.WJ2012: return frm.Cached.load(_KEY_WJ, 2);
                case def.NUM_TYPES.SHI2007:
                case def.NUM_TYPES.SHI2017: return frm.Cached.load(_KEY_NUMBRICS);
                case def.NUM_TYPES.NEW_ENERGY: return frm.Cached.load(_KEY_NUMERICS_DF);
                default: return frm.Cached.load(_KEY_NUMBRICS_LETTERS);
            }
        } else {
            return chain.next(args);
        }
    });

    // 键位提供器，Index：3
    _GlobalConf.keyProvider.reg(function(chain, args) {
        if (3 === args.index &&
            def.NUM_TYPES.SHI2007 === args.numberType) {
            return frm.Cached.load(_KEY_NUMBRICS);
        } else {
            return chain.next(args);
        }
    });

    // 键位提供器，Index：4
    _GlobalConf.keyProvider.reg(function(chain, args) {
        if ((4 === args.index || 5 === args.index) &&
            def.NUM_TYPES.NEW_ENERGY === args.numberType) {
            return frm.Cached.load(_KEY_NUMBRICS);
        } else {
            return chain.next(args);
        }
    });

    // 键位提供器，Index：6
    _GlobalConf.keyProvider.reg(function(chain, args) {
        if (6 === args.index) {
            var mode = args.numberType;
            switch (args.numberType) {
                case def.NUM_TYPES.NEW_ENERGY: return frm.Cached.load(_KEY_NUMBRICS);
                case def.NUM_TYPES.PLA2012:
                case def.NUM_TYPES.SHI2007:
                case def.NUM_TYPES.WJ2007:
                case def.NUM_TYPES.AVIATION:
                case def.NUM_TYPES.WJ2012: return frm.Cached.load(_KEY_NUMBRICS_LETTERS);
                case def.NUM_TYPES.SHI2017: return frm.Cached.load(_KEY_SHI2007_ZH);
                default:
                    var cityCode = args.number.charAt(1);
                    // “粤O” 之类的警车号牌
                    if ("O" === cityCode) {
                        return frm.Cached.load(_KEY_O_POLICE);
                    } else {
                        // “港澳”车牌
                        var isHK_MACAO = def.NUM_TYPES.CIVIL === mode &&
                                            "粤" === args.number.charAt(0) &&
                                            "Z" === cityCode;
                        if (isHK_MACAO) {
                            return frm.Cached.load(_KEY_HK_MACAO);
                        } else {
                            return frm.Cached.load(_KEY_POSTFIX);
                        }
                    }
            }
        }
        return chain.next(args);
    });

    // 键位提供器，Index：7
    _GlobalConf.keyProvider.reg(function(chain, args) {
        if (7 === args.index && def.NUM_TYPES.NEW_ENERGY === args.numberType) {
            return frm.Cached.load(_KEY_NUMERICS_DF);
        }
        return chain.next(args);
    });

    // 注册键位提供器，默认
    _GlobalConf.keyProvider.reg(function() {
        return frm.Cached.load(_KEY_NUMBRICS_LETTERS);
    });

    ////// 可用键位提供器 END //////

    function _rowOf(obj, index) {
        var data = obj["row" + index];
        return data === undefined ? [] : data;
    }

    function _mapRow(obj, index, mapper) {
        obj["row" + index] = _rowOf(obj, index).map(mapper);
    }

    function _mapLayout(layout, mapper) {
        layout.numberType = layout.numberType;
        _mapRow(layout, 0, mapper);
        _mapRow(layout, 1, mapper);
        _mapRow(layout, 2, mapper);
        _mapRow(layout, 3, mapper);
        _mapRow(layout, 4, mapper);
        return layout;
    }

    // 注册键位可用性转换器
    _GlobalConf.mixiner.reg(function(layout, args) {
        var availables = args.keys.map(function(ele) {
            return ele.text;
        });
        return _mapLayout(layout, function(entity) {
            return hlp.keyOfEnabled(entity, hlp.contains(availables, entity.text));
        });
    });

    // 禁用键位: 处理新能源键盘模式下，首位不允许出现的字符
    _GlobalConf.mixiner.reg(function(layout, args) {
        return _mapLayout(layout, function(entity) {
            var enabled = entity.enabled;
            if (enabled && args.index === 0 && layout.numberType === def.NUM_TYPES.NEW_ENERGY) {
                enabled = hlp.isProvince(entity.text);
            }
            return hlp.keyOfEnabled(entity, enabled);
        });
    });

    // 功能按钮“确定、删除、更多”等按键的转换处理
    _GlobalConf.mixiner.reg(function(layout) {
        return _mapLayout(layout, function(entity) {
            // 注意,KeyEntity的KeyCode还是原始状态,尚未更新,不能使用它来判断是否是功能键
            if ("-" === entity.text) {
                return hlp.keyOfCode(entity, "" /* ← */ , def.KEY_TYPES.FUN_DEL);
            } else if ("+" === entity.text) {
                return hlp.keyOfCode(entity, "确定", def.KEY_TYPES.FUN_OK);
            } else {
                return entity;
            }
        });
    });

    // 处理删除键逻辑
    _GlobalConf.mixiner.reg(function(layout) {
        // 当输入车牌不为空时可以点击
        return _mapLayout(layout, function(entity){
                if(entity.keyCode === def.KEY_TYPES.FUN_DEL){
                    return hlp.keyOfEnabled(entity, layout.numberLength != 0);
                }else{
                    return entity;
                }
            });
    });

    // 处理确定键位的逻辑
    _GlobalConf.mixiner.reg(function(layout){
        // 当输入车牌达到最后一位时可以点击
        return _mapLayout(layout, function(entity){
                if(entity.keyCode === def.KEY_TYPES.FUN_OK){
                    return hlp.keyOfEnabled(entity, layout.numberLength === layout.numberLimitLength);
                }else{
                    return entity;
                }
            });
    });

    // 合并生成keys字段
    _GlobalConf.mixiner.reg(function(layout) {
        layout.keys = _rowOf(layout, 0)
            .concat(_rowOf(layout, 1))
            .concat(_rowOf(layout, 2))
            .concat(_rowOf(layout, 3))
            .concat(_rowOf(layout, 4));
        return layout;
    });

    ////////

    function __clone(srcObj) {
        var newCopy = srcObj.constructor();
        for (var prop in srcObj) {
            if (srcObj.hasOwnProperty(prop)) {
                newCopy[prop] = srcObj[prop];
            }
        }
        return newCopy;
    }

    /**
     * 键盘引擎的逻辑设计说明：
     * 1. 由“键盘布局管理器”根据传入的键盘类型，返回对应的键盘布局。例如：民用键盘只显示省份，特定位置没有“警、使”等特殊车辆；
     * 2. 由“可用键盘管理器”根据当前预设车牌号码，返回当前键位序号可用的键位。即，当前布局中哪些可点击，哪些不可点击。
     * 3. 由混合器，将“键盘布局”和“可用键位”混合，输出键盘列表，由界面根据这些键位数据来渲染界面。
     * 
     * @param {* keyboardType} 键盘类型
     * @param {* inputIndex} 当前键位Index
     * @param {* presetNumber} 预设车牌号码
     * @param {* numberType} 车牌号码类型
     */
    function _update(keyboardType, inputIndex, presetNumber, numberType) {
        // 检查参数
        if (keyboardType === undefined || keyboardType < def.KB_TYPES.FULL || keyboardType > def.KB_TYPES.CIVIL_SPEC) {
            throw new RangeError("参数(keyboardType)范围必须在[0, 2]之间，当前: " + keyboardType);
        }
        if (inputIndex === undefined || inputIndex !== parseInt(inputIndex, 10)) {
            throw new TypeError("参数(inputIndex)必须为整数数值");
        }
        if (presetNumber === undefined || typeof presetNumber !== "string") {
            throw new TypeError("参数(presetNumber)必须为字符串");
        }
        if (numberType === undefined || numberType !== parseInt(numberType, 10)) {
            throw new TypeError("参数(numberType)必须为整数数值");
        }
        var detectedNumberType = hlp.detectNumberTypeOf(presetNumber);
        // 如果预设车牌号码不为空，车牌类型为自动探测，则尝试
        var presetNumberType = numberType;
        if (presetNumber.length > 0 && numberType === def.NUM_TYPES.AUTO_DETECT) {
            presetNumberType = detectedNumberType;
        }
        var limitLength = def.NUM_TYPES.lenOf(presetNumberType);
        var presetLength = presetNumber.length;
        inputIndex = Math.min(inputIndex, limitLength - 1);
        if(presetLength > limitLength){
            throw new RangeError("参数(presetNumber)字符太长：" + presetNumber 
                                + "，车牌类型：" + numberType 
                                + "，此类型最大长度:" + limitLength);
        }
        var args = {
            index: inputIndex,
            number: presetNumber,
            keyboardType: keyboardType,
            numberType: presetNumberType,
        };
        // 处理键位布局
        var output = __clone(_GlobalConf.layoutProvider.process(args));
        // 传递一些参数到外部
        output.index = args.index;
        output.presetNumber = args.number;
        output.keyboardType = args.keyboardType;
        output.numberType = args.numberType;
        output.presetNumberType = args.numberType;
        output.detectedNumberType = detectedNumberType;
        output.numberLength = presetLength;
        output.numberLimitLength = limitLength;
        // 处理键位
        args.keys = _GlobalConf.keyProvider.process(args);
        // 混合布局与键位
        return _GlobalConf.mixiner.process(output, args);
    }

    // 导出的对象包括两个属性：update函数、全局配置
    var _export = function() {
        this.update = _update;
        this.config = _GlobalConf;
    };
    // 导出一些工具类函数
    _export.$newKey = hlp.keyOf;
    // 导出一些数据类型
    _export.NUM_TYPES = def.NUM_TYPES;
    _export.KEY_TYPES = def.KEY_TYPES;
    _export.KEYBOARD_TYPES = def.KB_TYPES;
    _export.VERSION = "R1.2/2018.0509/iRain(SZ)";

    return _export;

})));