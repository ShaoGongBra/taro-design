import { deepCopy } from "taro-tools"
import { querySelectByKeyOriginal } from "../../render"

/**
 * 节点位置信息类
 */
export class NodePosition {
  /**
   *
   * @param {*} key
   * @param {*} index
   */
  constructor(key, index) {
    this.key = key
    this.index = index
  }

  getNode(nodes) {
    return querySelectByKeyOriginal(nodes, this.key)
  }

  getIndexNode(nodes) {
    return querySelectByKeyOriginal(nodes, this.key)?.child?.[this.index]
  }

  toString() {
    return this.key + '-' + this.index
  }
}


// 查找属性中的不同值，当检测到不同值是将会进行赋值
export const diffAttr = (a, b, keys = []) => {
  for (const k in b) {
    if (Object.hasOwnProperty.call(b, k)) {
      const typeb = typeof b[k]
      if (typeb === 'undefined') {
        const res = a[k]
        delete a[k]
        return [[...keys, k], res, b[k]]
      } else if (typeb !== 'object' && a[k] != b[k]) {
        const res = a[k]
        a[k] = b[k]
        return [[...keys, k], res, b[k]]
      } else if (b[k] instanceof Array && JSON.stringify(a[k]) !== JSON.stringify(b[k])) {
        const res = deepCopy(a[k])
        a[k] = b[k]
        return [[...keys, k], res, deepCopy(b[k])]
      } else if (typeb === 'object') {
        const res = diffAttr(a[k], b[k], [...keys, k])
        if (res[0].length !== 0) {
          return res
        }
      }
    }
  }
  return [[], void 0]
}
