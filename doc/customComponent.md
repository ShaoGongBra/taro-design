# 把自己的组件放在TaroDesign中运行
你可以简单的开发一个组件，通过TaroDesign提供的注册函数，实现在其中运行，包括编辑器和运行时

## 定义组件
假设你有一个下面这样的组件，内容你可以自己掌控
```jsx
export const Custom = () => {
  return <View>
    <Text>这是个自定义组件</Text>
  </View>
}
```
在app.jsx，或者你使用了运行时的页面中，将这个组件添加到TaroDesign

```jsx
import { defineComponent } from 'taro-design'
import { Custom } from '你的组件所在位置'

defineComponent('author-custom', Custom)
```
如果你想一次性导入多个组件，可以用`defineComponents`方法
```jsx
import { defineComponents } from 'taro-design'
import { Custom, Custom2 } from '你的组件所在位置'

defineComponents({
  'author-custom': Custom,
  'author-custom2': Custom2
})
```
在上面的例子中我们看到给组件定义了名称：`author-custom`，当你定义名称时请遵循`作者名-组件名`的形式，全部采用小写进行定义，这名称必须是唯一的

## 定义编辑器表单
你经过上面的操作后你的组件可以正常运行在运行时下了，但是在编辑器上还不能使用你这个组件，要在编辑器上使用这个组件，你还需要定义编辑器需要的参数。  
编辑器的参数定义请不要放在`app.jsx`文件里面，因为这样会导致编辑器和运行时混乱，你应该在你导入编辑器组件的地方定义，像下面这样。

```jsx
import React from 'react'
import { Design, defineComponentConfig } from 'taro-design/design'
import { componentCate } from 'taro-design/design/min'
import { TopView } from 'taro-design'

defineComponentConfig('author-custom', {
  // 节点中文名称
  text: '自定义组件',
  // 节点所在分类
  cate: componentCate.base,
})

export default () => {
  return <TopView>
    <Design />
  </TopView>
}
```

完成上面的操作你就能在基础分类下看到一个名称为`自定义组件`的组件，将这个组件拖到编辑区域即可看到效果。
  
如果你想一次定义多个节点可以使用下面的函数定义

```jsx
import { defineComponentConfigs } from 'taro-design/design/min'

defineComponentConfigs({
  'author-custom': {},
  'author-custom2': {},
})
```
一个组件很多情况下都会有一个或多个属性样式，比如下面的常见的`children, style, text, show`
```jsx
export const Custom = ({ children, style, text, show }) => {
  return <View style={style}>
    {show && <Text>{text}</Text>}
    {children}
  </View>
}
```
那么你在定义参数的时候需要加上面这些参数
```jsx
import React from 'react'
import { Design, defineComponentConfig } from 'taro-design/design'
import { componentCate, getBaseAttrForm, FormCreate, styleNode } from 'taro-design/design/min'

import { TopView } from 'taro-design'

defineComponentConfig('author-custom', {
  // 节点中文名称
  text: '自定义组件',
  // 节点所在分类
  cate: componentCate.base,
  // 组件默认属性
  attr() {
    return {
      // 当你使用了children，需要返回一个child为空
      child: [],
      // 默认样式 请给他一个默认空对象 或者你需要的默认样式
      style: {},
      // 其他属性根据你的需求指定默认值 你也可以不指定，默认不会给组件设置这个值
      show: false
    }
  },
  // 创建编辑这些属性需要用到的表单
  // 下面的函数你可以直接阅读源码获得帮助
  // 返回编辑表单实际就是用封装的函数创建了一个TaroDesign运行时的json数据
  form() {
    return getBaseAttrForm({
      text: '样式',
      name: 'style',
      styles: styleNode.view
    }, [
      FormCreate.input('文本', 'text'),
      FormCreate.switch('显示', 'show'),
    ])
  }
  // 子节点 当你这个节点调用了children时，必须定义此属性，默认值定义为空对象，反之请勿定义此属性
  child: {
    // 定义可以容纳的子节点的最大值 未定义则不限制
    max: 99,
    // 如果你需要禁止一些组件被拖到子节点，请配置这个选项
    disable: {
      // 组件
      comp: ['swiper-item'],
      // 组件判断是否是包含这些组件还是不包含这些组件
      // 为true表示白名单机制，否则是黑名单机制
      contain: true
    }
  }
})

export default () => {
  return <TopView>
    <Design />
  </TopView>
}
```
通过上面的一顿操作，你就能在选中这个组件时获得编辑表单了。

## 新增分类

默认有基础和表单这两个分类，当你组件过多时你可以自定义增加一些分类
```jsx
import { defineComponentCate } from 'taro-design/design/min'

defineComponentCate('cate', '新分类')

defineComponentConfig('author-custom', {
  // 节点中文名称
  text: '自定义组件',
  // 节点所在分类 设置为上面定义的新分类
  cate: componentCate.cate,
})

```
## 更多高级功能等待更新或者阅读源码获得支持
