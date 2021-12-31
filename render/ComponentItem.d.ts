import { Component, ComponentType, LegacyRef, CSSProperties } from 'react'
import { design } from '../design/components/edit'


declare namespace ComponentItem {
  interface ComponentConfig {
    /** 是否是一个表单组件 */
    isForm?: boolean
    /**
     * 当你定义了这是一个表单组件 就需要为此表单提供一个返回默认值的函数
     * 或者你可以定义一个原始值作为默认值
     */
    defaultValue?: (item: design.Node) => any | string | number | boolean
    /**
     * 创建子组件是否用函数进行创建
     * 当组件指定了此参数，则你调用 children的时候应该这样用，此时children是一个函数，你可以在此处截断child的渲染，传入自己的child
     * 此用法请慎用，可能在后续的更新中被删除
     * ```jsx
     * export default ({ children, _child }) => {
     *
     *  return <>
     *    {children({ nodes: _child })}
     *  </>
     * }
     * ```
     */
    childFunc?: boolean
    /**
     * 当子组件发生更新是更新当前组件
     * 为了提升性能，编辑模式时默认只会刷新正在编辑的组件，但有的时候子组件的内容可能会影响到父组件，此时就打开此选项
     */
    childForceUpdateSelf?: boolean

    /**
     * 当前组件发生更新时是否更新父组件
     * 为了提升性能，编辑模式时默认只会刷新正在编辑的组件，但有的时候子组件的内容可能会影响到父组件，此时就打开此选项
     * 此选项和上面的 childForceUpdateSelf 的功能一样，只是定义的位置不一致
     */
    parentForceUpdate?: boolean

    /**
     * 当前组件更新时，是否更新子组件
     */
    childForceUpdate?: boolean
  }
}

/**
 * 组件索引
 */
export const componentList: {
  [propName: string]: Component
}

interface ComponentItemProps {
  /** 是否处于编辑模式 */
  edit: boolean
  /** 父级节点 */
  parentNode: design.Node
  /**
   * 用于创建页面的组件 默认调用当前路径下的Create组件创建
   */
  Create?: Component
  /** 赋值在组件上的属性 */
  attr: {
    /** 组件标识 */
    nodeName: string
    /** 组件唯一key */
    key: string
    /** 是否隐藏组件 */
    hidden?: boolean
    /** 子节点 */
    child?: design.Node[]
    /** 组件样式 */
    style?: CSSProperties
    /** 组件其他属性 */
    [propName: string]: any
  }
  ref?: LegacyRef<any>
}

/**
 * 用于创建指定组件的组件
 */
export const ComponentItem: ComponentType<ComponentItemProps>

/**
 * 判断是不是一个合法的节点
 * @param nodeName 节点
 */
export function isComponent(nodeName: string): boolean

/**
 * 获取组件配置
 * @param nodeName 节点
 */
export function getComponentConfig(nodeName: string): ComponentItem.ComponentConfig

/**
 * 获取指定的一系列节点转换为大驼峰命名后的结果
 * @param nodeNames 指定要获取的节点 如果不传入此字段则返回所有组件
 * @example
 * ```jsx
 * const { View, Text } = getComponentList(['view', 'text'])
 *
 * return <View>
 *   <Text text='文本内容'></Text>
 * </View>
 * ```
 */
export function getComponentList(nodeName?: string[]): {
  [propName: string]: Component
}

/**
 * 定义一个组件
 * @param key 组件标识
 * @param component 组件
 */
export function defineComponent(key: string, component: Component): void

/**
 * 定义多个组件
 * @param data 多个组件组成的对象
 */
export function defineComponents(data: {
  [propName: string]: Component
}): void
