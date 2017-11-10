# 停车王车牌号码专用键盘 VehicleKeyboard - vue.js

`VehicleKeyboard`是停车王品牌的各端产品线的基础组件，专为提高中国车牌号码输入速度而定制开发的专用键盘组件，包括以下三个项目：

- `VehicleKeyboard-Android` Android项目，为Android客户端定制包括输入组件、键盘组件及相关控制逻辑实现；
- `VehicleKeyboard-iOS` iOS客户端项目，为iOS客户端定制包括输入组件、键盘组件及相关控制逻辑实现；
- `VehicleKeyboard-JS` JavaScript项目，为H5页面定制，包括Web、微信、支付宝等，同样包括输入组件、键盘组件及相关控制逻辑实现

## 项目主页

- VehicleKeyboard-Android GitHub项目主页： [https://github.com/parkingwang/vehicle-keyboard-android](https://github.com/parkingwang/vehicle-keyboard-android)
- VehicleKeyboard-Android OSChina项目主页： [https://gitee.com/iRainIoT/vehicle-keyboard-android](https://gitee.com/iRainIoT/vehicle-keyboard-android)

- VehicleKeyboard-iOS [准备中]GitHub项目主页： [https://github.com/parkingwang/vehicle-keyboard-android](https://github.com/parkingwang/vehicle-keyboard-ios)
- VehicleKeyboard-iOS [准备中]OSChina项目主页： [https://gitee.com/iRainIoT/vehicle-keyboard-android](https://gitee.com/iRainIoT/vehicle-keyboard-ios)

- VehicleKeyboard-JS GitHub项目主页： [https://github.com/parkingwang/vehicle-keyboard-js](https://github.com/parkingwang/vehicle-keyboard-js)
- VehicleKeyboard-JS OSChina项目主页： [https://gitee.com/iRainIoT/vehicle-keyboard-js](https://gitee.com/iRainIoT/vehicle-keyboard-js)


![](keyboard.jpeg)

## 键盘输入框混合组件使用说明

[键盘输入框混合组件](./MixedKeyboardUsage.md)

混合组件包括键盘和输入框两部分组件，具有完成的车牌输入逻辑。

基于VUE.js实现的单组件，单JS文件，包含vue核心库，文件大小约 114KB。

## 单键盘组件使用说明

[单键盘组件的使用方法](./SingleKeyboardUsage.md)

单键盘组件只包含键盘组件部分。

基于VUE.js实现的单组件，单JS文件，包含vue核心库，文件大小约 105KB。

## 键盘逻辑引擎使用说明

[键盘逻辑引擎使用说明](./Engine.md)

## 车牌号码规则

1. 本公司整理的车牌号码规则：[停车王车牌号码专用键盘规则和设计说明](./NumberRules.md)

1. [中华人民共和国民用机动车号牌](https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%B0%91%E7%94%A8%E6%9C%BA%E5%8A%A8%E8%BD%A6%E5%8F%B7%E7%89%8C)


## 已知问题

- 在 Android4.4 以下的浏览器或者WebView中，由于不支持CSS3部分特性，会出现输入框界面宽度变化的问题；

## 版本更新记录

### v2017.1108

- 完成基础功能，更新文档并公开发布；


## 维护

- [陈永佳](https://github.com/yoojia) chenyongjia@parkingwang.com

## License

    Copyright 2017 Xi'an iRain

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

## License

    Copyright 2017 Xi'an iRain

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.