import { CSSProperties } from 'react'

/**
 * 定义样式的值所属的类型
 */
export enum styleType {
  /** 枚举类型 */
  enum = 'enum',
  /** 尺寸 */
  size = 'size',
  /** 支持百分百比的尺寸 */
  sizePercent = 'size-percent',
  /** 数字类型 */
  number = 'number',
  /** 颜色类型 */
  color = 'color',
  /** 字符串类型 */
  string = 'string'
}

/** 样式的分组和样式配置 */
export const styleConfig: {
  [propName: string]: {
    /** 显示名称 */
    text: string
    /** 样式值的类型 */
    type: keyof styleType
  }
}

export namespace styled {
  /**
   * 判断名称是不是一个style样式
   * @param name 样式名
   */
  function isStyleName(name: string): boolean
  /**
   * 判断样式名是不是一个size类型的样式
   * @param name 样式名
   */
  function isSizeStyle(name: string): boolean

  /**
   * 判断value是不是默认值
   * @param name 样式名
   * @param value 值
   */
  function isDefaultStyleValue(name: string, value: string | number): boolean

  /**
   * 判断是不是无效的Style
   * 比如值为空，或则超出选项范围则是无效样式
   * @param name 样式名
   * @param value 值
   */
  function isInvalidStyle(name: string, value: string | number): boolean

  /**
   * 将style转换为className 转化失败返回undefined
   * @param name 样式名
   * @param value 值
   */
  function getClassName(name: string, value: string | number): string | void

  /**
   * 处理样式
   * @param {object} style 要处理的样式
   * @param {boolean} transformClass 是否转换为ClassName
   * @param {boolean} transformClass 将样式转换为css输出
   * @param {boolean} platform 保留平台差异 Taro.pxTransform函数将直接以字符串的形式输出
   */
  function styleTransform(style: CSSProperties, transformClass: boolean, css: boolean, platform: boolean): {
    /** 处理有剩余的style */
    style?: CSSProperties
    /** 处理有的className */
    className?: string
    /** 当transformClass传入true则会返回此参数 这是一个css文本 */
    css?: string
  }
}

/**
 * 组件内部style样式的合并，用法类似与classNames，用于兼容rn与其他端style的差异
 * @param arg 样式
 */
export function styles(...arg: CSSProperties[]): CSSProperties[]
