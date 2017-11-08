
# 键盘输入框混合组件 [MixedKeyboard.js] 使用说明

键盘输入框混合组件 [MixedKeyboard.js] ，它包括输入选择框组件和车牌键盘组件两部分。

在使用上，设置了更新键盘车牌号码的函数：

- `native_update_keyboard(presetNumber, keyboardType, provinceName)` 调用此函数更新键盘输入组件的车牌号码；默认情况下，键盘类型为`2`（民用+武警车牌键盘）。以下是相应参数说明：

    * `presetNumber`: String, 必填参数。预设车牌号码。可以是空车牌号码或者完整车牌。注意：参数不可为空，当空车牌时，设置空字符串**""**即可。
    * `keyboardType`: Int, 可选参数。指定键盘类型。类型如下：
        - `0`-全车牌键盘；
        - `1`-纯民用车牌键盘；
        - `2`-民用+武警车牌键盘；
    * `provinceName` 用户所在省份名称，例如”广东省“。用于显示省份周边的简称。如果此参数为空字符串**""**，则显示全部省份。

提供以下回调接口函数：

- `native_callback_changed(number, isCompleted)` 回调函数，当用户点击键盘导致车牌号码发生变化时回调。
    * `number`: String, 当前输入的车牌号码，部分或者全部，配合`isCompleted`来使用；
    * `isCompleted`: Boolean, 当前车牌号码是否输入完成；

- `native_callback_completed(number, isAutoCompleted)` 回调函数，输入车牌完成时回调，此回调函数保证车牌的完整性。输入车牌完成包括以下两个状态：
    * 在修改车牌过程中`非最后一位`时，用户主动点击`确定`按键时触发此回调函数;
    * 在输入车牌到达`最后一位`字符时，自动触发;

- `native_callback_show_message(message)` 回调函数，用于显示提示信息的回调接口。

## Android、iOS移动客户端使用说明

使用WebView来加载并注入回调对象

第一步：

打包资源文件到项目中：

- MixedKeyboard.js
- index.html

第二步：

注入全局函数对象：

- `native_callback_changed(number, isCompleted)`
- `native_callback_completed(number, isAutoCompleted)`
- `native_callback_show_message(message)`

并调用平台相关的原生代码来实现回调与显示消息的逻辑。

注意：Android平台要将以上三个回调函数注入到一个名为`android`的对象中。

第三步：

调用全局函数来初始化键盘：

```js
native_update_keyboard(presetNumber, keyboardType, provinceName);
```

## Web网页使用说明

#### 第一步：

在HTML页面声明键盘显示的`DIV`标签，同时导入`MixedKeyboard.js`文件：

```html
    <div id="single-keyboard-box">
      <mixed-keyboard :args="args" :callbacks="callbacks"/>
    </div>
    <script src="MixedKeyboard.js"></script>
```

注意，要保持DIV的`id`为`single-keyboard-box`。div内部的组件绑定也需要保持不变（原因是keyboard.js内部的launcher代码使用了这些设置）。

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
```

#### 第三步：

调用全局函数来初始化键盘：

```javascript
... YOUR CODE GOES HERE...
// 第一个参数是需要初始化显示到键盘输入组件的车牌号码。
// 第二个参数暂时为 2 
native_update_keyboard("京A12345", 2);

... YOUR CODE GOES HERE...
```

在移动端，可以通过WebView.loadUrl("javascript:native_update_keyboard('京A12345', 2)")的方式来调用。

#### 第四步：

如果需要根据控制DIV的SHOW / HIDE，可以通过控制`div#single-keyboard-box`的状态来实现。
