import { Component, CSSProperties } from 'react'

type props = Partial<{
  /**
   * 是否显示安全区域
   * @default false
  */
  isSafe: boolean
  /**
   * 是否是表单页面
   * @default false
  */
  isForm: boolean
  /**
   * 是否是组件
   */
  isComponent: boolean
  /**
   * 组件页面标识 不传默认读取当前页面的路由
   */
  pageUrl: string
  /** 顶层样式 */
  style: CSSProperties
  /** 引用 */
  ref?: string | ((node: any) => any)
}>

/**
 * 根节点 可以用于控制页面全局弹窗 下巴机型底部空白 键盘弹出控制
 */
export default class TopView extends Component<props> {
  static add(element, page) {
    return
  }

  static async addAsync(element, page) {
  }

  static update(key, element, page) {
    return
  }

  static remove(key, page) {
  }

  static removeAll(page) {
  }
}
