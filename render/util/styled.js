import Taro from '@tarojs/taro'
import { colorToRgb, rgbToHexColor } from 'taro-tools'

/**
 * 样式类型配置
 */
export const styleType = {
  enum: 'enum',
  // 尺寸
  size: 'size',
  // 支持百分百比的尺寸
  sizePercent: 'size-percent',
  number: 'number',
  color: 'color',
  string: 'string'
}

/**
 * 样式配置
 */
export const styleConfig = {
  // 基础
  width: {
    text: '宽',
    type: styleType.sizePercent,
  },
  height: {
    text: '高',
    type: styleType.sizePercent,
  },

  maxHeight: {
    text: '最大高度',
    type: styleType.sizePercent,
  },

  maxWidth: {
    text: '最大宽度',
    type: styleType.sizePercent,
  },

  minHeight: {
    text: '最小高度',
    type: styleType.sizePercent,
  },

  minWidth: {
    text: '最小宽度',
    type: styleType.sizePercent,
  },

  opacity: {
    text: '不透明度',
    default: 1,
    type: styleType.number,

    valueClassData: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
    valueClassName(val) {
      console.log(val)
      if (this.valueClassData.includes(+val)) {
        return 'opacity-' + (val * 100)
      }
      if (+val > 1) {
        return 'opacity'
      }
      if (+val < 0) {
        return 'opacity-0'
      }
    }
  },
  backgroundColor: {
    text: '背景色',
    type: styleType.color,
  },
  overflow: {
    text: '填充',
    type: styleType.enum,

    default: 'visible',
    values: {
      visible: '默认',
      hidden: '裁剪'
    },
    valueClassName: {
      hidden: 'overflow-hidden'
    }
  },

  // 边距
  padding: {
    text: '内边距',
    type: styleType.size,
  },
  paddingTop: {
    text: '上内边距',
    type: styleType.size,
  },
  paddingRight: {
    text: '右内边距',
    type: styleType.size,
  },
  paddingBottom: {
    text: '下内边距',
    type: styleType.size,
  },
  paddingLeft: {
    text: '左内边距',
    type: styleType.size,
  },
  margin: {
    text: '外边距',
    type: styleType.size,
  },
  marginLeft: {
    text: '左外边距',
    type: styleType.size,
  },
  marginRight: {
    text: '右外边距',
    type: styleType.size,
  },
  marginTop: {
    text: '上外边距',
    type: styleType.size,
  },
  marginBottom: {
    text: '下外边距',
    type: styleType.size,
  },

  // 边框
  borderStyle: {
    text: '边框样式',
    type: styleType.enum,

    default: 'solid',
    values: {
      solid: '实线',
      dotted: '点状',
      dashed: '虚线'
    },
    valueClassName: {
      dotted: 'border-dotted',
      dashed: 'border-dashed'
    }
  },
  borderWidth: {
    text: '边框宽',
    type: styleType.size
  },
  borderLeftWidth: {
    text: '左边框宽',
    type: styleType.size
  },
  borderRightWidth: {
    text: '右边框宽',
    type: styleType.size
  },
  borderTopWidth: {
    text: '上边框宽',
    type: styleType.size
  },
  borderBottomWidth: {
    text: '下边框宽',
    type: styleType.size
  },
  borderColor: {
    text: '边框颜色',
    type: styleType.color
  },
  borderLeftColor: {
    text: '左边框颜色',
    type: styleType.color
  },
  borderRightColor: {
    text: '右边框颜色',
    type: styleType.color
  },
  borderTopColor: {
    text: '上边框颜色',
    type: styleType.color
  },
  borderBottomColor: {
    text: '下边框颜色',
    type: styleType.color
  },
  borderRadius: {
    text: '圆角',
    type: styleType.size
  },
  borderTopLeftRadius: {
    text: '左上圆角',
    type: styleType.size
  },
  borderTopRightRadius: {
    text: '右上圆角',
    type: styleType.size
  },
  borderBottomLeftRadius: {
    text: '左下圆角',
    type: styleType.size
  },
  borderBottomRightRadius: {
    text: '右下圆角',
    type: styleType.size
  },

  // 定位
  position: {
    text: '定位',
    type: styleType.enum,
    default: 'relative',
    values: {
      relative: '相对定位',
      absolute: '绝对定位'
    },
    valueClassName: {
      absolute: 'absolute'
    }
  },

  left: {
    text: '左',
    type: styleType.sizePercent,
    valueClassName(val) {
      if (+val === 0) {
        return 'left-0'
      }
    }
  },
  right: {
    text: '右',
    type: styleType.sizePercent,
    valueClassName(val) {
      if (+val === 0) {
        return 'right-0'
      }
    }
  },
  top: {
    text: '上',
    type: styleType.sizePercent,
    valueClassName(val) {
      if (+val === 0) {
        return 'top-0'
      }
    }
  },
  bottom: {
    text: '下',
    type: styleType.sizePercent,
    valueClassName(val) {
      if (+val === 0) {
        return 'bottom-0'
      }
    }
  },

  zIndex: {
    text: '层级',
    type: styleType.number,
    valueClassData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    valueClassName(val) {
      if (this.valueClassData.includes(+val)) {
        return 'z-' + val
      }
    }
  },

  // 文本样式
  color: {
    text: '颜色',
    type: styleType.color,
    default: '#333333',
    valueClassData: {
      '#000000': 'text-black',
      '#ffffff': 'text-white'
    },
    valueClassName(val) {
      const color = rgbToHexColor(colorToRgb(val))
      return this.valueClassData[color]
    }
  },
  fontSize: {
    text: '字号',
    type: styleType.size,
    default: 28,
    valueClassData: [24, 26, 28, 30, 32, 36, 48],
    valueClassName(val) {
      if (this.valueClassData.includes(+val)) {
        return 'text-' + val
      }
    }
  },
  lineHeight: {
    text: '行间距',
    type: styleType.size,
  },
  fontWeight: {
    text: '加粗',
    type: styleType.enum,
    default: 'normal',
    values: {
      normal: '默认',
      bold: '加粗'
    },
    valueClassName: {
      bold: 'bold'
    }
  },
  fontFamily: {
    text: '字体',
    type: styleType.string,
  },
  fontStyle: {
    text: '斜体',
    type: styleType.enum,
    default: 'normal',
    values: {
      normal: '默认',
      italic: '斜体'
    },
    valueClassName: {
      italic: 'italic'
    }
  },
  letterSpacing: {
    text: '字间距',
    type: styleType.size,
  },
  textAlign: {
    text: '文本对齐方式',
    type: styleType.enum,
    default: 'auto',
    values: {
      auto: '自动',
      left: '左对齐',
      center: '居中',
      right: '右对齐',
      justify: '两端对齐'
    },
    valueClassName: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify'
    }
  },

  textDecorationLine: {
    text: '装饰线',
    type: styleType.enum,
    default: 'none',
    values: {
      none: '无',
      underline: '下划线',
      'line-through': '删除线'
    },
    valueClassName: {
      underline: 'underline',
      'line-through': 'line-through'
    }
  },
  textTransform: {
    text: '转换',
    type: styleType.enum,
    default: 'none',
    values: {
      none: '无',
      uppercase: '大写',
      lowercase: '小写',
      capitalize: '首字母大写'
    },
    valueClassName: {
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize'
    }
  },
  // flex样式
  flexDirection: {
    text: '布局方向',
    type: styleType.enum,
    default: 'column',
    values: {
      column: '垂直',
      'column-reverse': '垂直反向',
      row: '水平',
      'row-reverse': '水平反向'
    },
    valueClassName: {
      'column-reverse': 'flex-col-reverse',
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse'
    }
  },
  flexWrap: {
    text: '自动换行',
    type: styleType.enum,
    default: 'nowrap',
    values: {
      nowrap: '不换行',
      wrap: '自动换行',
      'wrap-reverse': '反向换行'
    },
    valueClassName: {
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse'
    }
  },
  alignItems: {
    text: '项目X对齐',
    type: styleType.enum,
    default: 'stretch',
    values: {
      stretch: '拉伸',
      'flex-start': '开始',
      center: '居中',
      'flex-end': '结束',
      baseline: '基线对齐'
    },
    valueClassName: {
      'flex-start': 'items-start',
      center: 'items-center',
      'flex-end': 'items-end',
      'baseline': 'items-baseline'
    }
  },
  justifyContent: {
    text: '内容布局',
    type: styleType.enum,
    default: 'flex-start',
    values: {
      'flex-start': '在开始',
      center: '在中间',
      'flex-end': '在结束',
      'space-between': '两端对齐',
      'space-around': '平均对齐(around)',
      'space-evenly': '平均对齐(evenly)'
    },
    valueClassName: {
      center: 'justify-center',
      'flex-end': 'justify-end',
      'space-between': 'justify-between',
      'space-around': 'justify-around',
      'space-evenly': 'justify-evenly'
    }
  },
  alignContent: {
    text: '项目Y对齐',
    type: styleType.enum,
    default: 'stretch',
    values: {
      stretch: '拉伸',
      'flex-start': '在开始',
      center: '在中间',
      'flex-end': '在结束',
      'space-between': '两端对齐',
      'space-around': '平均对齐'
    },
    valueClassName: {
      'flex-start': 'content-start',
      center: 'content-center',
      'flex-end': 'content-end',
      'space-between': 'content-between',
      'space-around': 'content-around'
    }
  },
  flex: {
    text: '弹性伸缩',
    type: styleType.number,

    default: 0,
    valueClassName(val) {
      if (+val === 1) {
        return 'flex-grow'
      }
    }
  },
  flexGrow: {
    text: '弹性伸缩',
    type: styleType.number,

    default: 0,
    valueClassName(val) {
      if (+val === 1) {
        return 'flex-grow'
      }
    }
  },
  flexShrink: {
    text: '弹性挤压',
    type: styleType.number,

    default: 1,
    valueClassName(val) {
      if (+val === 0) {
        return 'flex-shrink'
      }
    }
  },
  alignSelf: {
    text: '自身对齐',
    type: styleType.enum,

    default: 'auto',
    values: {
      auto: '自动',
      'flex-start': '开始',
      'flex-end': '结束',
      center: '居中',
      stretch: '拉伸',
      baseline: '内容对齐'
    },
    valueClassName: {
      'flex-start': 'self-start',
      'flex-end': 'self-end',
      center: 'self-center',
      stretch: 'self-stretch',
      baseline: 'self-baseline'
    }
  }
}

export default {
  // 判断名称是不是style
  isStyleName(name) {
    return !!styleConfig[name]
  },
  // 判断名称是不是尺寸类型的Style  fontSize width height padding margin 等
  isSizeStyle(name) {
    return !!styleConfig[name] && [styleType.size, styleType.sizePercent].includes(styleConfig[name].type)
  },
  // 判断value是不是默认值
  isDefaultStyleValue(name, value) {
    return typeof styleConfig[name].default !== 'undefined' && styleConfig[name].default === value
  },
  // 判断是不是无效的Style
  isInvalidStyle(name, value) {
    return value === '' || this.isDefaultStyleValue(name, value)
  },
  // 将style转换为className 转化失败返回undefined
  getClassName(name, value) {
    const { valueClassName } = styleConfig[name]
    if (typeof valueClassName === 'function') {
      return valueClassName.call(styleConfig[name], value)
    }
    return valueClassName?.[value]
  },
  /**
   * 处理样式
   * @param {object} style 要处理的样式
   * @param {boolean} transformClass 是否转换为ClassName
   * @param {boolean} transformClass 将样式转换为css输出
   * @param {boolean} platform 保留平台差异 Taro.pxTransform函数将直接以字符串的形式输出
   */
  styleTransform(style, transformClass, css, platform) {
    style = { ...style }
    const reg = /^\d{1,}%$/
    const className = []
    // 样式处理
    for (const key in style) {
      // 删除无用样式
      if (this.isStyleName(key) && this.isInvalidStyle(key, style[key])) {
        delete style[key]
        continue
      }
      // 转换可识别的style为className
      let name
      if (transformClass && (name = this.getClassName(key, style[key]))) {
        className.push(name)
        delete style[key]
        continue
      }
      // 转换数字类型样式为可识别的属性
      if (!css && this.isSizeStyle(key)) {
        if (typeof style[key] === 'number' || (typeof style[key] === 'string' && !reg.test(style[key]))) {
          if (platform) {
            style[key] = `Taro.pxTransform(${style[key]})`
          } else {
            style[key] = Taro.pxTransform(style[key])
          }
        }
        continue
      }
    }
    const cssList = []
    if (css && Object.keys(style).length) {
      cssList.push('{')
      for (const key in style) {
        if (Object.hasOwnProperty.call(style, key)) {
          cssList.push(`  ${key.replace(/[A-Z]/g, res => `-${res.toLowerCase()}`)}: ${style[key]}${this.isSizeStyle(key) && !reg.test(style[key]) ? 'px' : ''};`)
        }
      }
      cssList.push('}')
    }

    return { style: css ? {} : style, className: className.join(' '), css: cssList.join('\r\n') }
  },
}

