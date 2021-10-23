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
