# Taro Design

- 基于Taro3开发的页面设计器，可以方便的将他集成到你的项目中，你也可以方便的编写一个组件在这个编辑器中运行，或者将你现有的组件经过简单修改运行在编辑器中。
- 请在Taro3的项目中使用，低版本理论上只能支持h5和RN端，小程序端无法支持，并且尚未测试。
- 功能当前正在完善中，尚有多处功能无法正常使用，小程序端和app端尚未测试，请你谨慎使用。
  
## 在线体验

[点击前往在线地址](http://edit.t.platelet.xyz/)  
在线模板现在未开发注册账号以及管理功能，请使用下面的账号密码进行体验，你保存的模板和项目也可能在后面的更新中被删除。  
用户名：admin  
密码：123456

## 基本用法

```bash
yarn add taro-design
```

- 如果你的依赖库里没有下列组件，请添加

```bash
yarn add qs classnames react-syntax-highlighter
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
    <Design />
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

更多用法请前往[官方文档](doc/index.md)查看。
