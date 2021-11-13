# 自定义图标库

当你你在阿里的[iconfont](https://www.iconfont.cn/)有一个图标库，你就可以将这个图标库天加到项目中来使用，只需要将其定义即可。

```jsx
import { defineIcon } from 'taro-design'
import icons from '你的人图标库'

defineIcon('name', icons)

```
导入的文件内容参考 `taro-design/render/static/icon/icon.js`  
定义后你好需要在app.jsx里面全局导入你的样式文件
