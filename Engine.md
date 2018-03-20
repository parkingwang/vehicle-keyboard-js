# KeyboardEngine API说明文档

## 在Web的使用方式

```html
<script src="src/js/keyboard-engine.js"></script>
<script>
    var engine = new KeyboardEngine();
    var layout = engine.update(0, 0, "粤B12345", 0) 
    console.log(layout);
</script>
```

## KeyboardEngine导出对象：

```json
    {
        update: function(keyboardType: Int, showIndex: Int, presetNumber: String, numType: Int),
        $newKey: function(),
        config: JSON,
    }
```
#### `KeyboardEngine.VERSION` 车辆号码类型：

> V2.0/v2017.11S01/iRain(SZ)

#### `KeyboardEngine.NUM_TYPES` 车辆号码类型：
    - `0` 自动探测；
    - `1` 民用车牌
    - `2` 武警总队
    - `3` 武警地方
    - `4` 军队车牌
    - `5` 新能源车牌
    - `6` 大使馆车牌
    - `7` 新大使馆车牌

#### `KeyboardEngine.KEY_TYPES` 键位类型码：
    - `0` 普通按键
    - `1` 功能键：删除
    - `2` 功能键：确定

#### `KeyboardEngine.KEYBOARD_TYPES` 键盘类型，有以下三种方式：
    - `0` 全键盘，显示所有键位。通常用于平板App中。
    - `1` 纯民用车牌键盘；
    - `2` 民用车牌+特殊车牌键盘；

#### `update` 函数

原型为 `function(keyboardType: Int, showIndex: Int, presetNumber: String, numberType: Int): JSONObject`

函数输入参数说明：

- `keyboardType` 指定更新当前键盘布局的*键盘类型*；
- `showIndex` 指定更新当前键盘布局的*车牌号码位置*，例如当前输入为首个字符，则index为：0；
- `presetNumber` 当前已预设置的车牌号码，可以是完整车牌号码，也可以是部分号码；
- `numberType` 指定车牌号码类型。例如可以强制指定为*新能源车牌类型*，默认为`0-自动探测`；

#### `update`函数输出JSON说明：

```json
    {
        index: Int,
        presetNumber: String,
        keyboardType: KEYBOARD_TYPE,
        numberType: NUM_TYPES,
        presetNumberType: NUM_TYPES,
        detectedNumberType: NUM_TYPES,
        numberLength: Int,
        numberLimitLength: Int,
        row0: Array,
        row1: Array,
        row2: Array,
        row3: Array,
        row4: Array
    }
```

- `index` 当前键盘所处的键盘类型；
- `presetNumber` 当前预设的车牌号码；
- `keyboardType` 当前键盘所处的键盘类型；
- `numberType` 当前预设的车牌号码类型（废弃参数）；
- `presetNumberType` 同numberType；
- `detectedNumberType` 检测当前输入车牌号码的号码类型；
- `numberLength` 当前预设的车牌号码长度；
- `numberLimitLength` 当前车牌号码的最大长度；
- `row0` - `row4` 键盘中每一行的键位数组；

## KeyEntity的JSON格式及内容：

```json
{
    text: String,
    keyCode: Int,
    enabled: Boolean,
    isFunKey: Boolean
}
```

- `text` 当前键位显示的文本；
- `keyCode` 当前键位按键类型码；
- `enabled` 当前键位在键盘布局中是否可用；
- `isFunKey` 当前键位是否为功能性的按键；


## 参考输出内容

````json
{
    "index": 0, 
    "presetNumber": "", 
    "keyboardType": 2, 
    "numberType": 0, 
    "detectedNumberType": 0, 
    "numberLength": 0, 
    "numberLimitLength": 7, 
    "row0": [
        {
            "text": "京", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "津", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "晋", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "冀", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "蒙", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "辽", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "吉", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "黑", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "沪", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }
    ], 
    "row1": [
        {
            "text": "苏", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "浙", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "皖", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "闽", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "赣", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "鲁", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "豫", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "鄂", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "湘", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }
    ], 
    "row2": [
        {
            "text": "粤", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "桂", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "琼", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "渝", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "川", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "贵", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "云", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "藏", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }
    ], 
    "row3": [
        {
            "text": "陕", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "甘", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "青", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "宁", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "新", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "W", 
            "keyCode": 0, 
            "enabled": true, 
            "isFunKey": false
        }, 
        {
            "text": "←", 
            "keyCode": 1, 
            "enabled": false, 
            "isFunKey": true
        }, 
        {
            "text": "确定", 
            "keyCode": 2, 
            "enabled": false, 
            "isFunKey": true
        }
    ],
    "row4": [ ]
}
```
