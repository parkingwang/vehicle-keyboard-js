
# 单键盘组件[SingleKeyboard.js]

键盘输入组件[SingleKeyboard.js]，它包括只包括车牌键盘组件。

在使用上，设置了更新键盘车牌号码的函数：

- `native_update_keyboard(presetNumber, keyboardType, provinceName, numberType, inputIndex)` 调用此函数更新键盘输入组件的车牌号码。以下是相应参数说明：

    * `presetNumber`: String, 必填参数。预设车牌号码。可以是空车牌号码或者完整车牌。注意：参数不可为空，当空车牌时，设置空字符串**""**即可。
    * `keyboardType`: Int, 可选参数。指定键盘类型。类型如下：
        - `0`-全车牌键盘；
        - `1`-纯民用车牌键盘；
        - `2`-民用+特殊车牌键盘；
    * `provinceName` 用户所在省份名称，例如”广东省“。用于显示省份周边的简称。如果此参数为空字符串**""**，则显示全部省份。

    - `numberType`: 车牌号码类型。
    - `inputIndex`: 车牌号码输入位置，指当前键盘输入处于车牌号码的哪个位置。注意：当设置为负数时，则以当前预设车牌的长度为输入位置。

提供以下回调接口：

- `native_callback_changed(number, isCompleted)` 回调函数，当用户点击键盘导致车牌号码发生变化时回调。
    * `number`: String, 当前输入的车牌号码，部分或者全部，配合`isCompleted`来使用；
    * `isCompleted`: Boolean, 当前车牌号码是否输入完成；

- `native_callback_completed(number, isAutoCompleted)` 回调函数，输入车牌完成时回调，此回调函数保证车牌的完整性。输入车牌完成包括以下两个状态：
    * 在修改车牌过程中`非最后一位`时，用户主动点击`确定`按键时触发此回调函数;
    * 在输入车牌到达`最后一位`字符时，自动触发;

- `native_callback_show_message(message)` 回调函数，用于显示提示信息的回调接口。

- `native_callback_onrawkey(key)` 点击键盘上的任何按键时，都会回调此函数。

- `native_callback_ontextkey(text)` 点击键盘上的**文本**按键时，回调此函数。

- `native_callback_ondelkey()` 点击键盘上的**删除**按键时，回调此函数。

- `native_callback_onokkey()` 点击键盘上的**确定**按键时，回调此函数。
    
## Web网页使用说明

#### 第一步：

在HTML页面声明键盘显示的`DIV`标签，同时导入`SingleKeyboard.js`文件：

```html
    <div id="single-keyboard-box">
      <single-keyboard :args="args" :callbacks="callbacks"/>
    </div>
    <script src="SingleKeyboard.js"></script>
```

**注意:**

1. 要保持DIV的`id`为`single-keyboard-box`。div内部的组件绑定也需要保持不变（原因是keyboard.js内部的launcher代码使用了这些设置）。
1. 注意DIV内部的组件名称，与`键盘输入框混合组件`不同，它的组件名称为 `single-keyboard`。

#### 第二步：

创建全局回调函数：

```javascript
// 输入完成时此函数会被调用
function native_callback_completed(number, isAutoCompleted) {
    alert("车牌号码已输入完成: " + number + "，自动完成吗？" + isAutoCompleted);
}

// 输入过程中，车牌号码增量变化时，此函数会被调用
function native_callback_changed(number, isCompleted){
    alert("输入中的车牌：" + number + "，是否完成：" + isCompleted);
}

// 当需要显示信息提示用户时，例如切换了键盘类型等情况下，调用此函数来显示消息。
function native_callback_show_message(message){
    alert(message);
}

// 处理点击文本按键的逻辑
function native_callback_ontextkey(text) {
    // text 为当前按键的文本字符。
}

// 处理点击删除按键的逻辑
function native_callback_ondelkey() {
    
}

// 处理点击确定按钮的逻辑
function native_callback_onokkey() {
    
}
```

#### 第三步：

调用全局函数来初始化键盘：

```javascript
... YOUR CODE GOES HERE...
// 第一个参数预设车牌号码：当前已输入的车牌号码。无车牌时，填写空字符串“”。
// 第二个参数键盘类型：暂时为 1，表示: 民用键盘。
// 第三个参数快捷省份: 无省份时，填写空字符串“”。
// 第四个参数车牌类型: 默认为0,表示自动探测版本类型。也可以指定为5,表示新能源车牌。
// 第五个参数当前车牌输入序号。默认为-1,表示按照当前预设车牌的长度序号。
native_update_keyboard("京A12345", 1, "广东省", 0, -1);

... YOUR CODE GOES HERE...
```

#### 第四步：

如果需要根据控制DIV的SHOW / HIDE，可以通过控制`div#single-keyboard-box`的状态来实现。
