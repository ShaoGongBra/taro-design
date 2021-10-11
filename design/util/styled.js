import Create from './formCreate'

import { styleType, styleConfig } from '../../render'

/**
 * 样式类型分组
 * 不同类型的组件拥有不同的样式
 */
export const styleGroup = [
  {
    name: '弹性盒子',
    styles: [
      'flexDirection',
      'flexWrap',
      'alignItems',
      'justifyContent',
      'alignContent'
    ]
  },
  {
    name: '弹性盒子项目',
    styles: [
      'flexGrow',
      'flexShrink',
      'alignSelf'
    ]
  },
  {
    name: '布局',
    styles: [
      'width',
      'height',
      ['最大最小尺寸', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth'],
      ['padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
      ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
      ['position', 'top', 'right', 'bottom', 'left', 'zIndex'],
    ]
  },
  {
    name: '字体',
    styles: [
      'color',
      'fontSize',
      'textAlign',
      'lineHeight',
      'fontWeight',
      ['更多', 'fontFamily', 'fontStyle', 'letterSpacing', 'textDecorationLine', 'textTransform']
    ]
  },
  {
    name: '外观',
    styles: [
      'backgroundColor',
      'borderStyle',
      ['borderWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'],
      ['borderColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'borderBottomColor'],
      ['borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius'],
      'overflow',
      'opacity'
    ]
  }
]

/**
 * 定义节点支持的style
 */
export const styleNode = {
  // 布局组件通用
  view: ['width', 'height', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'opacity', 'backgroundColor', 'overflow', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'margin', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderStyle', 'borderWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth', 'borderColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'borderBottomColor', 'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'position', 'left', 'right', 'top', 'bottom', 'zIndex', 'flexDirection', 'flexWrap', 'alignItems', 'justifyContent', 'alignContent', 'flex', 'flexGrow', 'flexShrink', 'alignSelf'],
  // 文本 输入框类组件通用
  text: ['width', 'height', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'opacity', 'backgroundColor', 'overflow', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'margin', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderStyle', 'borderWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth', 'borderColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'borderBottomColor', 'position', 'left', 'right', 'top', 'bottom', 'zIndex', 'color', 'fontSize', 'lineHeight', 'fontWeight', 'fontFamily', 'fontStyle', 'letterSpacing', 'textAlign', 'textDecorationLine', 'textTransform', 'flex', 'flexGrow', 'flexShrink', 'alignSelf'],
  // 图片专用
  image: ['width', 'height', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'opacity', 'backgroundColor', 'overflow', 'margin', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderStyle', 'borderWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth', 'borderColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'borderBottomColor', 'position', 'left', 'right', 'top', 'bottom', 'zIndex', 'flex', 'flexGrow', 'flexShrink', 'alignSelf']
}

/**
 * 获取样式表单
 */
const getForm = {
  [styleType.enum](name) {
    return Create.init('select', this.text, name)
      .select(Object.entries(this.values).map(([value, text]) => ({ text, value })))
      .get()
  },
  [styleType.size](name) {
    return Create.init('input', this.text, name).inputNumber().get()
  },
  [styleType.number](name) {
    return Create.init('input', this.text, name).inputNumber().get()
  },
  [styleType.color](name) {
    return Create.init('color', this.text, name).get()
  },
  [styleType.string](name) {
    return Create.init('input', this.text, name).get()
  }
}

/**
 * 通过样式名称渲染表单值
 * @param {string} names 样式名称 可以传如数组
 */
const getStyleAttr = names => {
  if (typeof names === 'string') {
    names = [names]
  }
  const obj = {}
  names.forEach(key => {
    const item = styleConfig[key]
    if (item && typeof item.default !== 'undefined') {
      obj[key] = item.default
    }
  })
  return obj
}
/**
 * 通过样式名称渲染表单类型
 * @param {string} names 样式名称 可以传数组获取多个
 */
const getStyleForm = names => {
  if (typeof names === 'string') {
    names = [names]
  }
  const arr = []
  names.forEach(key => {
    const item = getForm[key]
    if (item) {
      arr.push(item.call(item, key))
    }
  })
  return arr
}


const styleSimplify = {
  size: {
    attr: () => getStyleAttr(['width', 'height']),
    form: () => getStyleForm(['width', 'height'])
  },
  width: {
    attr: () => getStyleAttr('width'),
    form: () => getStyleForm('width')
  },
  padding: {
    attr: () => getStyleAttr(['padding', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']),
    form: () => ([
      Create.init('compose').child(
        getStyleForm(['padding', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']),
      ).get()
    ])
  },
  margin: {
    attr: () => getStyleAttr(['margin', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom']),
    form: () => ([
      Create.init('compose').child(
        getStyleForm(['margin', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom'])
      ).get()
    ])
  },
  opacity: {
    attr: () => getStyleAttr('opacity'),
    form: () => getStyleForm('opacity')
  },
  position: {
    attr: () => getStyleAttr(['position', 'top', 'left', 'right', 'bottom', 'zIndex']),
    form: () => getStyleForm(['position', 'top', 'left', 'right', 'bottom', 'zIndex'])
  },
  flex: {
    attr: () => getStyleAttr(['flexDirection', 'flexWrap', 'alignItems', 'justifyContent', 'alignContent']),
    form: () => getStyleForm(['flexDirection', 'flexWrap', 'alignItems', 'justifyContent', 'alignContent'])
  },
  flexChild: {
    attr: () => getStyleAttr(['flexGrow', 'flexShrink', 'alignSelf']),
    form: () => getStyleForm(['flexGrow', 'flexShrink', 'alignSelf'])
  },
  text: {
    attr: () => getStyleAttr(['fontSize', 'color', 'lineHeight', 'fontWeight', 'fontFamily', 'fontStyle', 'letterSpacing', 'textAlign', 'textDecorationLine']),
    form: () => getStyleForm(['fontSize', 'color', 'lineHeight', 'fontWeight', 'fontFamily', 'fontStyle', 'letterSpacing', 'textAlign', 'textDecorationLine'])
  },
  border: {
    attr: () => getStyleAttr(['borderStyle', 'borderWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth', 'borderColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'borderBottomColor']),
    form: () => ([
      ...getStyleForm('borderStyle'),
      Create.init('compose').child(
        getStyleForm(['borderWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'])
      ).get(),
      Create.init('compose').child(
        getStyleForm(['borderColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'borderBottomColor'])
      ).get()
    ])
  },
  borderRadius: {
    attr: () => getStyleAttr('borderRadius'),
    form: () => getStyleForm('borderRadius')
  },
  backgroundColor: {
    attr: () => getStyleAttr('backgroundColor'),
    form: () => getStyleForm('backgroundColor')
  },
  fontWeight: {
    attr: () => getStyleAttr('fontWeight'),
    form: () => getStyleForm('fontWeight')
  },
  overflow: {
    attr: () => getStyleAttr('overflow'),
    form: () => getStyleForm('overflow')
  }
}

export default {
  /**
   * 返回样式
   * @param {array} list 样式属性
   */
  getAttr(list) {
    let data = {}
    for (let i = 0, l = list.length; i < l; i++) {
      if (list[i].value && list[i].name) {
        if (typeof list[i].value === 'object') {
          data = { ...data, ...styleSimplify[list[i].name].attr(), ...list[i].value }
        } else {
          data[list[i].name] = list[i].value
        }
      } else {
        data = { ...data, ...styleSimplify[list[i]].attr() }
      }
    }
    return data
  },
  /**
   * 返回用于控制style的表单
   * @param {array} list 样式列表
   */
  getForm(list) {
    const data = []
    for (let i = 0, l = list.length; i < l; i++) {
      data.push(...styleSimplify[list[i].name || list[i]].form())
    }
    return data
  },

}

