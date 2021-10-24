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
