(function (global, factory) {
    module.exports = factory();
}(this, (function () { 
    "use strict";

    // 定义一些处理键盘内部逻辑的框架类
    // Author: 陈哈哈 yoojiachen@gmail.com

    var Cached = {
        _mcached: {},

        reg: function(layout, category, keys) {
            if (keys !== undefined && keys.constructor === Array) {
                var cached = this._mcached;
                keys.forEach(function(key) {
                    cached[(category + ":" + key)] = layout;
                });
            } else {
                var keyIdx = (keys === undefined ? 0 : keys);
                this._mcached[(category + ":" + keyIdx)] = layout;
            }
        },

        load: function(category, key) {
            return this._mcached[(category + ":" + (key === undefined ? 0 : key))];
        }
    };

    var Chain = {
        create: function(defVal) {
            var chain = {};
            var _handlers = new Array();
            var _index = 0;

            chain.next = function(args) {
                if (_index <= _handlers.length) {
                    return (_handlers[(_index++)])(chain, args); 
                } else {
                    return defVal;
                }
            };

            chain.process = function(args) {
                var ret = chain.next(args);
                _index = 0;
                return ret;
            };

            chain.reg = function(h) {
                _handlers.push(h);
                return chain;
            };

            return chain;
        }
    };

    var Each = {
        create: function() {
            var _convertor = {};
            var _workers = new Array();

            _convertor.process = function(defVal, args) {
                var ret = defVal;
                _workers.forEach(function(worker) {
                    ret = worker(ret, args);
                });
                return ret;
            };

            _convertor.reg = function(p) {
                _workers.push(p);
                return _convertor;
            };

            return _convertor;
        }
    };

    return {
        Chain: Chain,
        Cached: Cached,
        Each: Each
    }
})));