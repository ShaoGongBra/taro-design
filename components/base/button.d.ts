import { CSSProperties, LegacyRef, ComponentType } from 'react'

/** 圆角类型 */
interface radiusType {
  /** 直角 */
  'right-angle'
  /** 圆角 */
  fillet
  /** 较小的圆角 */
  'fillet-min'
}

/** 尺寸 */
interface size {
  /** s号 */
  s
  /** m号 */
  m
  /** l号 */
  l
  /** xl号 */
  xl
  /** xxl号 */
  xxl
  /** xxxl号 */
  xxxl
}


interface ButtonProps {
  /** 按钮文字 */
  text: string
  /** 按钮颜色 */
  color?: string
  /** 圆角类型 */
  radiusType?: keyof radiusType
  /** 按钮尺寸 */
  size?: keyof size
  /** 镂空效果 */
  plain?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 显示loading */
  loading?: boolean
  /** 按钮样式 */
  style?: CSSProperties
  /** 按钮文字样式 */
  textStyle?: CSSProperties
  /** 按钮前置图片 */
  beforeImage?: string
  /** 按钮后置图片 */
  afterImage?: string
  /** 点击事件 */
  onClick: () => any
  /** 引用 */
  ref?: LegacyRef<any>
}

/**
 * 统一样式的按钮
 * @example
 * ```jsx
 * <Button text='立即购买' size='l' plain />
 * ```
 */
export const Button: ComponentType<ButtonProps>
