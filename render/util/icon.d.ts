
interface IconList {
  /** 图标名称对应的value */
  [propName: string]: number
}

export const icon: {
  [propName: string]: {
    /** 图标列表 */
    list: IconList
    /** 前缀 */
    prefix: string
  }
}

/**
 * 定义图标库
 * @param fontFamily 字体名称
 * @param list 图标列表 格式如下
 * ```jsvascript
 * {
 *  name: 175416,
 *  name1: 123855
 * }
 * ```
 * @param prefix 字体图标class前缀 默认为 fontFamily + '-'
 */
export function defineIcon(fontFamily: string, list: IconList, prefix?: string): void
