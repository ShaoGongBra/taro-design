import { Component } from 'react'
import { styled } from './util/styled'
import CreateDefault from './Create'
import './static/base.css'

/**
 * 组件索引
 */
export const componentList = {}

/**
 * 组件更新函数
 * @param {*} attr
 */
const compUpdate = function (attr) {
  this.forceUpdate()
  const { parentNode } = this.props
  const Item = componentList[attr.nodeName]
  const parentItem = componentList[parentNode?.nodeName]
  // 让父组件更新
  // 在当前组件定义 parentForceUpdate 或者在父组件定义 childForceUpdateSelf
  if (Item?.designConfig?.parentForceUpdate || parentItem?.designConfig?.childForceUpdateSelf) {
    parentNode?.forceUpdate?.()
  }

  // 让子组件更新
  if (Item?.designConfig?.childForceUpdate) {
    const { child } = attr
    child.forEach(item => item.forceUpdate?.())
  }
}

export default class ComponentItem extends Component {

  componentDidMount() {
    const { attr } = this.props
    if (!attr.forceUpdate) {
      attr.forceUpdate = () => compUpdate.call(this, attr)
    }
  }

  componentWillUnmount() {
    const { attr } = this.props
    if (attr.forceUpdate) {
      delete attr.forceUpdate
    }
  }

  render() {
    const { attr, Create = CreateDefault, parentNode, edit = false } = this.props
    const { hidden, nodeName, child, style, key, ...otherItem } = attr

    if (hidden) {
      return null
    }

    const Item = componentList[nodeName]

    if (!Item) {
      console.log(nodeName + ' 组件未定义')
      return null
    }

    const { style: styleRes, className } = styled.styleTransform(style, true)

    return <Item {...otherItem} style={styleRes} className={className} _key={key} _childNodes={child} _parentNode={parentNode} _edit={edit}>
      {(child && child.length > 0 || Item.designConfig?.childFunc) && (
        Item.designConfig?.childFunc ?
          ((slotProps = {}) => (child || slotProps.nodes) && <Create
            nodes={child}
            compName={nodeName}
            {...slotProps}
            parentNode={attr}
          />) :
          <Create
            nodes={child}
            compName={nodeName}
            parentNode={attr}
          />
      )}
    </Item>
  }
}

/**
 * 是不是一个合法的节点
 * @param {string} nodeName 节点
 */
export const isComponent = nodeName => !!componentList[nodeName]

/**
 * 获取组件配置
 * @param {string} nodeName 节点
 * @returns
 */
export const getComponentConfig = nodeName => componentList[nodeName]?.designConfig || {}

/**
 * 获取指定的一系列节点转换为大驼峰命名后的结果
 * @param {*} nodeNames 指定要获取的节点 如果不传入此字段则返回所有组件
 */
export const getComponentList = nodeNames => {
  return Object.fromEntries(
    (nodeNames ? nodeNames : Object.keys(componentList))
      .map(key => [key.split('-').map(name => name.replace(name[0], name[0].toUpperCase())).join(''), componentList[key]])
  )
}

/**
 * 定义一个组件
 * @param {String} key 组件标识
 * @param {Component} value 组件
 */
export const defineComponent = (key, value) => {
  componentList[key] = value
}

/**
 * 定义多个组件
 * @param {Object} data 一个由key: 组件组成的对象
 */
export const defineComponents = (data) => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      componentList[key] = data[key]
    }
  }
}
