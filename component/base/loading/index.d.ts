import React, { Component, CSSProperties } from 'react'

interface color {
  /** 深色 #7a7a7a */
  dark
  /** 白色 #fff */
  blank
}

type props = Partial<{
  /** loading颜色 */
  color: keyof color,
  /** loading尺寸 */
  size: number,
  /** 图标样式 传入color和fontSize会覆盖 color和size属性 */
  style: CSSProperties,
  /** 引用 */
  ref?: string | ((node: any) => any)
}>

/**
 * 菊花loading动画 三端统一
 * @example <Loading size={60} />
 * @info size暂不支持动态更改，只会渲染其初始值
 */
export default class Loading extends Component<props> {

}
