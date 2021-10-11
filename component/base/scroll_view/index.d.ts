import { CSSProperties } from 'react'
import { Component } from '@tarojs/taro'
import { CommonEventFunction } from '@tarojs/components/types/common'

type props = Partial<{

  /** 组件的内联样式, 可以动态设置的内联样式 */
  style?: CSSProperties

  /** 设置竖向滚动条位置
   * @supported weapp, swan, alipay, tt, h5, rn
   */
  scrollTop?: number

  /** 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
   * @supported weapp, swan, alipay, tt, h5
   */
  scrollIntoView?: string

  /** 在设置滚动条位置时使用动画过渡
   * @supported weapp, swan, alipay, tt, h5, rn
   * @default fasle
   */
  scrollWithAnimation?: boolean

  /** 滚动到底部/右边，会触发 scrolltolower 事件
   * @supported weapp, swan, alipay, tt, h5, rn
   */
  onScrollToLower?: (event: CommonEventFunction) => any

  /** 滚动时触发
   * `event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}`
   * @supported weapp, swan, alipay, tt, h5, rn
   */
  onScroll?: (event: CommonEventFunction) => any

  /** 下拉刷新状态 设置为true显示加载中 false不显示加载中 */
  refresh?: boolean

  /** 下拉刷新触发 */
  onRefresh?: () => any

  /** 显示为空提示 */
  emptyShow?: boolean

  /** 为空显示图标
   * @default info
   */
  emptyIcon?: string

  /** 为空显示标题
   * @default 什么都没有
   */
  emptyTitle?: string

  /** 为空显示简介 */
  emptyDesc?: string

  /** 为空展示按钮 */
  emptyBttton?: string

  /** 为空提示点击时触发 */
  onReload?: () => any

  /** 点击为空按钮时触发 */
  onEmptyButtonCilck?: () => any

  /** 180翻转内容 */
  flip?: boolean

  /** 引用 */
  ref?: string | ((node: any) => any)
}>

/**
 * 自适应高度的滚动组件 支持设置下拉刷新 上拉加载 为空显示
 * @example
 * <View className='page-root'>
 *  <Text>顶部不滚动内容 一般为Header</Text>
 *  <Scroll>
 *    <Text>滚动内容放在此处</Text>
 *  </Scroll>
 *  <Text>底部不滚动内容 根据需要放置</Text>
 * <View>
 * @info 注意滚动组件是使用flex的自动最大宽度实现的 所以外层只能使用flex竖向布局 并且得具有固定高度
 * @info 一般页面使用className='page-root'作为页面得最外层，然后将此组件作为它的子组件使用
 */
export default class Scroll extends Component<props>{

}
