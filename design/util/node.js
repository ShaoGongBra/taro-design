import { styled } from '../../render'

const getItemName = nodeName => nodeName.split('-').map(name => name.replace(name[0], name[0].toUpperCase())).join('')

const getSpace = level => {
  let base = ''
  for (let i = 0; i < level; i++) {
    base += '  '
  }
  return base
}

const toJsxItem = ({ nodeName, style, child, tplAlias, key, forceUpdate, ...props }, { index, length }, level) => {
  const name = getItemName(nodeName)
  const styleRes = JSON
    .stringify(styled.styleTransform(style, false, true).style)
    // 尺寸函数转换
    .replace(/\"Taro.pxTransform\((\d{1,})\)\"/g, (res, val) => 'Taro.pxTransform(' + val + ')')
    // 将双引号改为单引号
    .replace(/\"([a-zA-Z]{1,})\":\"([a-zA-Z-#,\(\)]{1,})\"/g, (res, val1, val2) => `"${val1}":'${val2}'`)
    // 增加属性之间的空格 和 名称的引号
    .replace(/,\"([a-zA-Z]{1,})\":/g, (res, val) => ', ' + val + ': ')
    // 去除名称的引号
    .replace(/\"([a-zA-Z]{1,})\":/g, (res, val) => val + ': ')
  const space = getSpace(level)
  const start = [
    space,
    // 标识
    '<' + name,
    // 样式
    ...(style && Object.keys(style).length ? [' style={' + styleRes + '}'] : []),
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
  const center = child?.length ? nodeToJsx(child, level + 1) : ''
  const end = space + (child?.length ? `</${name}>` : '')
  return start + (center ? ('\r\n' + center + '\r\n' + end) : '') + (index !== length - 1 ? '\r\n' : '')
}

/**
 * 将节点转换为jsx数据
 * @param {*} nodes 节点
 * @param {*} level
 * @returns
 */
export const nodeToJsx = (nodes, level = 0) => {
  return nodes.map((node, index) => toJsxItem(node, {
    index,
    length: nodes.length
  }, level)).join('')
}
