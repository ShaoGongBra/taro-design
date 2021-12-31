import { CSSProperties, LegacyRef, ComponentType, ReactElement } from 'react'

export namespace design {
  interface Node {
    /** 节点唯一标识 */
    nodeName: string
    /** 节点唯一key 类似于id的功能 */
    key: string
    /** 子节点 */
    child: design.Node[]
    /** 其他组件用到的属性 */
    [propName: string]: any
  }
}

interface SaveTast extends Promise<SaveTast> {

}

interface DesignProps {
  /** 尺寸 等同于fontSize */
  size?: number
  /** 页面标题 */
  title: string
  /** 用于自定义渲染标题，请传入jsx，当你定义这个参数时title将失效 */
  renderTitle: ReactElement
  /** 默认渲染节点 */
  defaultNodes: design.Node[]
  /** 是否开启导出功能 */
  exportOpen: boolean
  /** 是否开启模板功能 */
  templateOpen: boolean
  /** 按钮样式 */
  style?: CSSProperties
  /** 发生编辑时触发的事件 你可以返回一个Promise对象 将会显示一个正在保存的loading */
  onChange: (event: design.Node[]) => SaveTast | void
  /** 点击保存按钮时触发的事件，当你配置了这个选项才会出现保存按钮 你可以返回一个Promise对象 将会显示一个正在保存的loading */
  onSave: (event: design.Node[]) => SaveTast | void
  /** 引用 */
  ref?: LegacyRef<any>
}

/**
 * 图标
 * @example
 * ```jsx
 * <Design
 *
 * />
 * ```
 */
export const Design: ComponentType<DesignProps>
