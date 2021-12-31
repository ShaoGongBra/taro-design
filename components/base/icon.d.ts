import { CSSProperties, LegacyRef, ComponentType } from 'react'

interface IconProps {
  /** 图标库 */
  font?: string
  /**
   * 图标名称
   * 这是一个不包含前缀的名称
   * 你可以传名称或者一个数组第一项表示字体 第二项表示名称
   */
  name: string | [string, string]
  /** 图标颜色 */
  color?: string
  /** 尺寸 等同于fontSize */
  size?: number
  /** 按钮样式 */
  style?: CSSProperties
  /** 点击事件 */
  onClick: (event: Event | any) => void
  /** 引用 */
  ref?: LegacyRef<any>
}

/**
 * 图标
 * @example
 * ```jsx
 * <Icon name='pingfen-yipingfen' />
 * ```
 */
export const Icon: ComponentType<IconProps>
