import { deepCopy } from "taro-tools"
import { keyboardEvent } from './util'

/**
 * 历史记录管理
 */
export class EditHistory {

  constructor() {
    keyboardEvent.add('z', this.revoke, true)
    keyboardEvent.add('z', this.recover, true, true)
  }

  // 历史记录列表
  list = []

  // 操作指针 后退步数
  backSetp = 0

  // 节点数据
  nodes

  // 设置节点数据函数
  setNodeData

  // 移动节点数据函数
  moveNode

  // 通过keys创建一个多层级对象
  createKeyData(keys, value, obj = {}) {
    if (keys.length === 1) {
      obj[keys[0]] = value
    } else {
      obj[keys[0]] = {}
      this.create(keys.slice(1), value, obj[keys[0]])
    }
    return obj
  }

  // 撤销
  revoke = () => {
    const current = this.current()
    if (!current) {
      return
    }
    const { value, type } = current
    switch (type) {
      case 'edit': {
        this.setNodeData?.(value[3], this.createKeyData(value[0], value[1]), true)
        break
      }
      case 'insert': {
        this.moveNode?.(value[0], false, true)
        break
      }
      case 'insert-template': {
        this.moveNode?.(value[0], value[1].length, true)
        break
      }
      case 'move': {
        this.moveNode?.(value[1], value[0], true)
        break
      }
      case 'delete': {
        this.moveNode?.([value[1]], value[0], true)
        break
      }
    }
    this.backSetp++
    this.actionCallback()
  }

  // 恢复
  recover = () => {
    const next = this.next()
    if (!next) {
      return
    }
    const { value, type } = next
    switch (type) {
      case 'edit': {
        this.setNodeData?.(value[3], this.createKeyData(value[0], value[2]), true)
        break
      }
      case 'insert': {
        this.moveNode?.([value[1]], value[0], true)
        break
      }
      case 'insert-template': {
        this.moveNode?.(value[1], value[0], true)
        break
      }
      case 'move': {
        this.moveNode?.(value[0], value[1], true)
        break
      }
      case 'delete': {
        this.moveNode?.(value[0], false, true)
        break
      }
    }
    this.backSetp--
    this.actionCallback()
  }

  /**
   * 页面卸载的时候调用销毁方法
   */
  destroy() {
    keyboardEvent.remove('z', this.revoke, true)
    keyboardEvent.remove('z', this.recover, true, true)
    this.actionFcuns = []
  }

  setTools(nodes, setNodeData, moveNode) {
    this.nodes = nodes
    this.setNodeData = setNodeData
    this.moveNode = moveNode
  }

  // 获取当前指针
  pointer() {
    return this.list.length - this.backSetp
  }

  // 当前要做做的记录
  current() {
    return this.list[this.pointer() - 1]
  }

  // 下一个要操作的记录 用于前进
  next() {
    return this.list[this.pointer()]
  }

  actionFcuns = []
  onAction(func) {
    this.actionFcuns.push(func)
  }

  actionCallback() {
    this.actionFcuns.forEach(func => func({
      back: this.list.length > this.backSetp,
      going: this.backSetp > 0
    }))
  }

  // 插入记录
  insert(type, value) {
    // 删除后面的记录
    this.list.splice(this.pointer())
    this.backSetp = 0

    if (type === 'edit') {
      const current = this.current()
      // 多次重复修改一个属性，将其记录为一次修改记录
      if (current?.value?.[3] === value[3] && current?.value?.[0]?.join() === value[0].join()) {
        current.value[2] = value[2]
        return
      }
    } else if (type === 'insert') {
      value[1] = deepCopy(value[1])
    } else if (type === 'insert-template') {
      value[1] = deepCopy(value[1])
    }
    this.list.push({
      type,
      value
    })
    this.actionCallback()
  }
}
