import { styled, getComponentConfig } from '../../render'

/**
 * 组件名称转换
 * @param {*} nodeName
 * @returns
 */
const getItemName = nodeName => nodeName.split('-').map(name => name.replace(name[0], name[0].toUpperCase())).join('')

/**
 * 节点中用到的不重复的组件名称列表
 * @param {*} nodes
 * @param {*} nodeNames
 * @returns
 */
export const getNodesNames = (nodes, nodeNames = []) => {
  nodes.forEach(item => {
    if (!nodeNames.includes(item.nodeName)) {
      nodeNames.push(item.nodeName)
    }
    if (item.child?.length) {
      getNodesNames(item.child, nodeNames)
    }
  })
  return nodeNames
}

/**
 * 获取组件框架
 * @param {*} comps 用到的组件列表
 * @param {*} type 类型 function 函数组件 class 类组件
 * @param {*} jsx 组件JSX内容
 */
const getBase = (comps = [], type, jsx) => {
  return `import React${type === 'class' ? ', { Component }' : ''} from 'react'
${jsx.indexOf('Taro.') !== -1 ? 'import Taro from \'@tarojs/taro\'\r\n' : ''}import { getComponentList, TopView } from 'taro-design'

const { ${comps.map(getItemName).join(', ')} } = getComponentList([${comps.map(name => `'${name}'`).join(', ')}])

export default ${type === 'function'
      ? `() => {

  return <TopView>
${jsx}
  </TopView>
}`
      : `class TaroDesignPage extends Component {

  render() {
    return <TopView>
${jsx}
    </TopView>
  }
}`
    }
`
}

/**
 * 获取空格
 * @param {*} type
 * @param {*} level
 * @returns
 */
const getSpace = (type, level) => {
  let base = ''
  for (let i = 0, l = level + (type === 'function' ? 2 : 3); i < l; i++) {
    base += '  '
  }
  return base
}

const toJsxItem = (
  { nodeName, style, child, tplAlias, key, forceUpdate, ...props },
  { index, length },
  type,
  globalClass,
  cssSeparate,
  level,
  cssList
) => {
  // 当前空格缩进
  const space = getSpace(type, level)
  // 是否是最后一个
  const isLast = index === length - 1
  // 转换后的组件名称
  const name = getItemName(nodeName)
  if (getComponentConfig(nodeName).childFunc) {
    return space + '{/* ' + name + ' 组件定义了子元素为函数，不支持导出为JSX */}' + (isLast ? '' : '\r\n')
  }

  let { style: styleOriginal, className, css } = styled.styleTransform(style, globalClass, cssSeparate, true)

  // css和样式处理
  if (css && !cssList[css]) {
    cssList[css] = 'class-' + (++cssList.index)
  }
  if (css) {
    className += (className ? ' ' : '') + cssList[css]
  }

  const styleRes = cssSeparate
    ? ''
    : JSON
      .stringify(styleOriginal)
      // 尺寸函数转换
      .replace(/\"Taro.pxTransform\((\d{1,})\)\"/g, (res, val) => 'Taro.pxTransform(' + val + ')')
      // 将双引号改为单引号
      .replace(/\"([a-zA-Z]{1,})\":\"([a-zA-Z-#,\(\)]{1,})\"/g, (res, val1, val2) => `"${val1}":'${val2}'`)
      // 增加属性之间的空格 和 名称的引号
      .replace(/,\"([a-zA-Z]{1,})\":/g, (res, val) => ', ' + val + ': ')
      // 去除名称的引号
      .replace(/\"([a-zA-Z]{1,})\":/g, (res, val) => val + ': ')

  const start = [
    space,
    // 标识
    '<' + name,
    // 类名
    ...(className ? [' className=\'' + className + '\''] : []),
    // 样式
    ...(!cssSeparate && styleOriginal && Object.keys(styleOriginal).length ? [' style={{ ' + styleRes.substr(1, styleRes.length - 2) + ' }}'] : []),
    // 属性
    Object.keys(props).map(k => {
      const keyType = typeof props[k]
      return ` ${k}=${keyType === 'object'
        ? `{${JSON.stringify(props[k])}}`
        : keyType === 'number' || keyType === 'boolean'
          ? `{${props[k]}}`
          : `'${props[k]}'`}`
    }).join(''),
    // 结尾
    child?.length ? '>' : ' />'
  ].join('')
  const center = child?.length ? nodeToJsx(child, type, globalClass, cssSeparate, level + 1, cssList) : ''
  const end = space + (child?.length ? `</${name}>` : '')
  return start + (center ? ('\r\n' + center + '\r\n' + end) : '') + (isLast ? '' : '\r\n')
}

/**
 * 将节点转换为jsx数据
 * @param {*} nodes 节点
 * @param {*} type 组件类型 函数和类 function class
 * @param {*} globalClass 使用全局样式
 * @param {*} cssSeparate 样式分离
 * @param {*} level
 * @returns
 */
export const nodeToJsx = (nodes, type = 'function', globalClass, cssSeparate, level = 0, css = { index: 0 }) => {
  const jsx = nodes.map((node, index) => toJsxItem(node, {
    index,
    length: nodes.length
  }, type, globalClass, cssSeparate, level, css)).join('')
  if (level === 0) {
    return {
      jsx: getBase(getNodesNames(nodes), type, jsx),
      css: Object.keys(css).filter(key => key !== 'index').map(value => `.${css[value]} ${value}`).join('\n\r')
    }
  }
  return jsx
}
