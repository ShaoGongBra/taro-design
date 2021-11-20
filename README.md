# Taro Design

一个简单易用，方便扩展和集成的移动端页面编辑器。
<center>
  <img src="doc/images/image1.png" width="560px" alt="预览" />
</center>

* [特点](#feature)
* [运行原理](#principle)
* [在线体验](#example)
* [快捷键支持](#hot-key)
* [在项目中使用](#use)
* [导出到其他项目中运行](#otherproject)
* [交流群](#group)
* [更多文档](#more)
	* [把自己的组件放在TaroDesign中运行](#custom-component)
	* [自定义图标库](#custom-icon)
	* [基础组件](#base-component)
	* [基础函数](#base-function)


## <a name='feature'></a>特点

- 发布到npm市场，可以很方便的将他集成到你的项目中。
- 你可以方便的编写一个组件在这个编辑器中运行，或者将你现有的组件经过简单修改运行在编辑器中。
- 编辑后的数据同时支持小程序、H5、React Native，需在Taro3的项目中使用。
- 组件样式遵循以React Native样式为基础的Flex布局，可以同时给设计师和开发人员使用。
- 导出为React组件后，可以继续进行二次开发。
- 模板市场给你提供了存储和使用模板的功能，你可以通过公开的模板快速创建页面，你也可以根据自己的需求创建模板。

## <a name='principle'></a>运行原理

你编辑的后的数据以json的方式运行和存储，下面的示例将一个text组件嵌套在一个view组件的json。
```json
[
  {
    "child": [
      {
        "style": {},
        "text": "文本内容",
        "nodeName": "text",
        "key": "2e0l1-19tg00",
        "child": []
      }
    ],
    "style": {},
    "nodeName": "view",
    "key": "2e0l1VzIiw00"
  }
]
```
对应的JSX代码如下，这些组件并不是原生的Taro组件，而是经过封装的，所以你看到下面的`Text`组件的文本并不是这样：`<Text>文本内容<Text>`，而是将文本内容赋值在其text属性上，其他组件的结构也大体如此。
```html
<View>
  <Text text='文本内容' />
</View>
```

## <a name='example'></a>在线体验

[点击前往在线地址](http://edit.t.platelet.xyz/)  
在线模板现在未开放注册账号以及管理功能，请使用下面的账号密码进行体验。  
- 用户名：admin  
- 密码：123456

## <a name='hot-key'></a>快捷键支持

ctrl + z 撤销操作  
ctrl + shift + z 恢复操作  
ctrl + c 复制节点  
ctrl + v 粘贴节点  
delete 删除节点

## <a name='use'></a>在项目中使用

```bash
yarn add taro-design
```

- 如果你的依赖库里没有下列组件，请添加

```bash
yarn add classnames
```

- 添加配置

```javascript
  h5: {
    esnextModules: [
      'taro-design'
    ]
  }
```

- 编辑器使用示例

```jsx
import React from 'react'
import { Design } from 'taro-design/design'
import { TopView } from 'taro-design'


export default () => {
  return <TopView>
    <Design
      // 默认数据节点
      defaultNodes={[]}
      // 发生编辑时触发的事件 你可以返回一个Promise对象 将会显示一个正在保存的loading
      onChange={nodes => {}}
      // 点击保存按钮时触发的事件，当你配置了这个选项才会出现保存按钮 你可以返回一个Promise对象 将会显示一个正在保存的loading
      onSave={nodes => {}}
      // 开启模板 默认开启
      templateOpen
      // 开启导出 默认开启
      exportOpen
      // 应用在最外层的样式 你也可以通过.taro-design控制样式
      style={{ }}
    />
  </TopView>
}
  ```

- 渲染模式使用示例

```jsx
import React from 'react'
import { TopView, Create } from 'taro-design'

export default () => {
  return <TopView>
    <Create nodes={[]} />
  </TopView>
}
```

- 全局样式

为了和rn端保持样式一致，你需要在你的全局样式代码中加入如下的样式。  
下面的全局样式可能会导致你已经存在的项目样式错乱，你暂时需要自行调试，建议在新项目中使用。

```css
/*postcss-pxtransform rn eject enable*/
view,
page,
.taro_page,
taro-view-core {
  display: flex;
  flex-direction: column;
  position: relative;
  border-style: solid;
  border-width: 0;
}
input,
textarea,
taro-view-core,
view {
  box-sizing: border-box;
}
taro-view-core,
taro-text-core {
  line-height: 1;
}
taro-text-core {
  font-size: 28px;
  color: #333;
}
.taro_page taro-image-core {
  width: auto;
  height: auto;
}
.taro_page .taro-video-container {
  position: relative;
}
/*postcss-pxtransform rn eject disable*/
```

因为样式覆盖问题，你需要在你的index.html 的 body后面插入下面的样式

```css
taro-view-core {
  display: flex;
  flex-direction: column;
}
```

## <a name='otherproject'></a>导出到其他项目中运行

Taro H5端使用index.html中的js代码片段控制了rem单位的基础值的变换，如果你在后端中没有这个控制，你可以将config配置中的designWidth设置为375然后进行打包(这个值默认为750)。  
你可能需要将Taro3升级到较新的版本，旧版本对这个配置支持不完整。
```json
designWidth: 375
```

## <a name='group'></a>交流群

<img src="doc/images/qq.png" width="200px" alt="qq群" />

## <a name='more'></a>更多文档

### <a name='custom-component'></a>把自己的组件放在TaroDesign中运行 
你可以简单的开发一个组件，通过TaroDesign提供的注册函数，实现在其中运行，包括编辑器和运行时[（查看）](doc/customComponent.md)。


### <a name='custom-icon'></a>自定义图标库
系统内置的图标库包含了一些常见的图标 [点击查看图标](https://at.alicdn.com/t/project/2275070/db4d5200-5c79-42ad-a58c-579ddc701fc9.html?spm=a313x.7781069.1998910419.34)，如果你需要添加新的图标库请看这[（查看）](doc/icon.md)。

### <a name='base-component'></a>基础组件
这里面导出了一些常用组件。你可以将他们导入到你的项目中使用

```jsx
import { TopView, PullView, Modal, Icon, Button, Loading, ScrollView, KeyboardAvoiding } from 'taro-design'
```

### <a name='base-function'></a>基础函数
项目引用了`taro-tools`这个依赖，这里面集成了多个常用函数，包含请求、日期、颜色、对象、字符串、表单验证、事件系统等，你可以直接导入到你的项目中使用。

```jsx
import { request, searchQuick, setRequestConfig, dateToStr, dateDiff, colorToRgb, deepCopy, verify, event, ... } from 'taro-tools'
```
