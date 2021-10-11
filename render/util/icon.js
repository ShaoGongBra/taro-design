/**
 * 图标库列表
 */
export const icons = {}

/**
 * 定义图标库
 * @param {*} fontFamily 字体名称
 * @param {*} list 图标列表 格式如下
 * {
 *  name: 175416,
 *  name1: 123855
 * }
 * @param {*} prefix 字体图标class前缀
 */
export const defineIcon = (fontFamily, list, prefix = fontFamily + '-') => {
  icons[fontFamily] = {
    list,
    prefix
  }
}
