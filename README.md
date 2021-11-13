# Taro Design

- 基于Taro3开发的页面设计器，可以方便的将他集成到你的项目中，你也可以方便的编写一个组件在这个编辑器中运行，或者将你现有的组件经过简单修改运行在编辑器中。
- 请在Taro3的项目中使用，低版本理论上只能支持h5和RN端，小程序端无法支持，并且尚未测试。
- 功能当前正在完善中，尚有多处功能无法正常使用，小程序端和app端尚未测试，请你谨慎使用。
  
## 在线体验

[点击前往在线地址](http://edit.t.platelet.xyz/)  
在线模板现在未开发注册账号以及管理功能，请使用下面的账号密码进行体验，你保存的模板和项目也可能在后面的更新中被删除。  
用户名：admin  
密码：123456

## 快捷键

ctrl+z 撤销操作  
ctrl+shift+z 恢复操作  
ctrl+c 复制节点  
ctrl+v 粘贴节点  
delete 删除节点

## 基本用法

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

## 导入到其他项目中运行

Taro H5端使用index.html中的js代码片段控制了rem单位的基础值的变换，如果你在后端中没有这个控制，你可以将config配置中的designWidth设置为375然后进行打包(这个值默认为750)。  
你可能需要将Taro3升级到较新的版本，旧版本对这个配置支持不完整。
```json
designWidth: 375
```
