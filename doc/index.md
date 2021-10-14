# Taro Design

基于Taro3开发的页面设计器，可以方便的将他集成到你的项目中。  
你可以很方便的自行开发组件插入到Taro Design的编辑模式和运行模式下，并且组件只需要开发一次。  

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
