import { getKey } from 'taro-tools'

const getParent = (next, current = { ...next[next.length - 1] }) => {
  if (next.length > 1) {
    current.parentNode = { ...next[next.length - 2] }
    getParent(next.slice(0, next.length - 1), current.parentNode)
  } else {
    current.parentNode = null
  }
  return current
}

/**
 * 通过key查找到一个节点 返回的parentNode是他的父节点数据，可以递归查找到最顶层节点直到这个值为null
 * @param {Array} nodes 节点列表
 * @param {string} key 节点key
 * @param {*} path
 * @returns
 */
export const querySelectByKey = (
  nodes,
  key,
  path = [{
    nodeName: 'root',
    parentNode: null,
    child: nodes
  }]
) => {
  if (key === '__root__') {
    return path[0]
  }
  if (
    nodes.some(item => {
      if (item.key === key) {
        path.splice(1, 0, item)
        return true
      } else if (item.child && item.child.length) {
        if (querySelectByKey(item.child, key, path)) {
          path.splice(1, 0, item)
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    })
  ) {
    return getParent(path)
  } else {
    return null
  }
}

export const querySelectByKeyOriginal = (
  nodes,
  key
) => {
  const path = [{
    nodeName: 'root',
    parentNode: null,
    child: nodes
  }]
  querySelectByKey(nodes, key, path)
  return path[path.length - 1]
}

const childNodeSome = (key, nodes) => !!nodes && nodes instanceof Array && nodes.some(item => {
  if (item.key === key) {
    return true
  } else if (item.child && item.child.length) {
    if (childNodeSome(item.child, key)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
})

/**
 * 判断一个节点是不是另外一个节点的子节点
 * @param {*} childKey 子节点key
 * @param {*} key 要判断的节点key
 * @param {*} nodes 节点列表
 */
export const isChildNode = (childKey, key, nodes) => {
  const node = querySelectByKey(nodes, key)
  if (!node || !node.child || !node.child.length) {
    return false
  }
  return childNodeSome(childKey, node.child)
}

/**
 * 节点数据数据创建
 * @param {*} nodeName 节点标识
 * @param {*} attr 节点属性
 * @param {*} child 子节点
 * @returns
 */
export const nodeCreate = (nodeName, attr, child = []) => {
  return {
    nodeName,
    key: attr.key || getKey(),
    ...attr,
    child: typeof child === 'object' && !Array.isArray(child) ? [child] : child
  }
}


/**
 * 筛选节点数据，过滤以下划线_开头的数据贺禁用列表的数据，筛选后的数据可以用于组件的属性绑定
 * @param {*} props
 */
export const filterProps = props => {
  const newProps = {}
  const disableKeys = ['child', 'children']
  for (const key in props) {
    if (Object.hasOwnProperty.call(props, key) && !key.startsWith('_') && !disableKeys.includes(key)) {
      newProps[key] = props[key]
    }
  }
  return newProps
}
