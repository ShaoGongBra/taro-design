import React, { useRef, useContext, useCallback, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { stopPropagation } from 'taro-tools'
import EditTypes from '../util/editTypes'
import comp from '../util/comp'
import Context from '../util/context'
import { ComponentItem, isChildNode, Create as BaseCreate } from '../../render'
import { NodePosition } from '../util/edit'

import './create.scss'

// 每个组件拖动及排序
const Item = ({ index, item: currentItem, Create, parentNode }) => {

  const { nodes, moveNode, selectNode } = useContext(Context)

  const ref = useRef(null)

  // 当前插入的位置 start 开始 insert插入 end结束
  const [insertPos, setInsertPos] = useState('')

  // 判断父元素是否横向布局
  const isRow = (() => {
    if (!ref.current) {
      return false
    }
    const style = document.defaultView.getComputedStyle(ref.current.parentNode, null)
    const direction = style.flexDirection
    const display = style.display
    if (display === 'block') {
      return false
    } else {
      return direction === 'row'
    }
  })()

  /**
   * 判断能不能插入到当前节点 或者移动到当前节点的前后
   */
  const getOver = useCallback((monitor, item = monitor.getItem()) => {
    const data = [false, false, false]
    // 没有拖到当前项目
    if (!monitor.isOver({ shallow: true })) {
      return data
    }

    const type = monitor.getItemType()
    // 要插入的模块列表
    const tpls = []
    if (type === EditTypes.FORM_MOVE || type === EditTypes.FORM_ADD) {

      if (type === EditTypes.FORM_MOVE) {

        // 跳过相同的位置
        if (item.key === currentItem.key) {
          return data
        }

        // 禁止将父组件拖动到自己的子组件
        if (isChildNode(currentItem.key, item.key, nodes)) {
          return data
        }

      }
      // 模块排序 基础模块添加
      tpls.push(item.nodeName)
    } else if (type === EditTypes.TEMPLATE_ADD) {
      // 模板添加
      item.template.forEach(v => tpls.push(v.nodeName))
    }

    if (tpls.length === 0) {
      return data
    }

    // 拖动的模块是否能插入到当前这个模板
    const isInsert = tpls.every(v => !comp.isChildDisable(currentItem.nodeName, v)) && comp.isChildAdd(currentItem.nodeName, currentItem.child?.length, tpls.length)

    // 是否能插入到当前父组件里面
    const isMove = !tpls.some(v => comp.isChildDisable(parentNode.nodeName, v)) && comp.isChildAdd(parentNode.nodeName, parentNode.child.length)

    return [isInsert || isMove, isInsert, isMove]

  }, [parentNode.nodeName, nodes, currentItem.key, currentItem.child, currentItem.nodeName, parentNode.child])

  /**
   * 获取当前插入位置
   */
  const getPos = useCallback((isInsert, isMove, monitor) => {
    const dropRect = ref.current?.getBoundingClientRect()
    const { x, y } = monitor.getClientOffset()
    // 计算索引 能插入当前组件分三份，不能插入当前组件份二份
    const num = (isRow
      ? (x - dropRect.left) / dropRect.width
      : (y - dropRect.top) / dropRect.height
    ) * (isInsert && isMove
      ? 3
      : isMove
        ? 2
        : 1
      ) | 0
    const posAllValue = ['start', 'insert', 'end', 'end']
    const posMoveValues = ['start', 'end', 'end']
    const posIndertValue = ['insert', 'insert']
    return (isInsert && isMove ? posAllValue : isMove ? posMoveValues : posIndertValue)[num]
  }, [isRow])

  // 拖
  const [{ isDragging }, drag] = useDrag({
    type: EditTypes.FORM_MOVE,
    item: () => {
      selectNode()
      return {
        type: EditTypes.FORM_MOVE,
        ref,
        position: new NodePosition(parentNode.key, index),
        key: currentItem.key,
        nodeName: currentItem.nodeName
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  // 放
  const [{ over }, drop] = useDrop({
    accept: [EditTypes.FORM_MOVE, EditTypes.FORM_ADD, EditTypes.TEMPLATE_ADD],
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const [isOver, isInsert, isMove] = getOver(monitor, item)

      if (!isOver) {
        return
      }

      const pos = getPos(isInsert, isMove, monitor)

      // 跳过已选中位置
      if (isOver && insertPos === pos) {
        return
      }
      setInsertPos(pos)
    },
    drop(item, monitor) {
      if (!over) {
        return
      }
      const type = monitor.getItemType()

      const pos = new NodePosition(
        insertPos === 'insert' ? currentItem.key : parentNode.key,
        insertPos === 'insert' ? (currentItem.child?.length || 0)
          : insertPos === 'start'
            ? index
            : index + 1
      )

      // 不同类型操作
      if (type === EditTypes.FORM_MOVE) {
        moveNode(item.position, pos)
      } else if (type === EditTypes.FORM_ADD) {
        moveNode(item.nodeName, pos)
      } else if (type === EditTypes.TEMPLATE_ADD) {
        moveNode(item.template, pos)
      }
    },
    collect(monitor) {
      return {
        over: getOver(monitor)[0]
      }
    }
  })

  drag(drop(ref))

  return <View
    ref={ref}
    className={classNames('form-drag-drop', `key-${currentItem.key}`, {
      'form-drag-drop--hover': isDragging,
      'form-drag-drop--row': isRow,
      // 将父元素的样式用于子元素 保证布局一致性
      'self-start': currentItem.style?.alignSelf === 'flex-start',
      'self-end': currentItem.style?.alignSelf === 'flex-end',
      'self-center': currentItem.style?.alignSelf === 'center',
      'self-stretch': currentItem.style?.alignSelf === 'stretch',
      'self-baseline': currentItem.style?.alignSelf === 'baseline',
      insert: over && insertPos === 'insert'
    })}
    style={{
      flex: currentItem.style?.flex,
      flexGrow: currentItem.style?.flexGrow,
      flexShrink: currentItem.style?.flexShrink
    }}
    onClick={e => {
      stopPropagation(e)
      selectNode(currentItem.key)
    }}
  >
    {over && insertPos === 'start' && <View className={classNames('form-drag-drop__add', { row: isRow })} />}
    <ComponentItem attr={currentItem} parentNode={parentNode} Create={Create} edit />
    {over && insertPos === 'end' && <View className={classNames('form-drag-drop__add', { row: isRow })} />}
  </View>
}

export default class Create extends BaseCreate {

  render() {
    const { nodes = [], compName = 'root', parentNode = { key: '__root__', nodeName: 'root', child: nodes } } = this.props
    return nodes.map((item, index) => <Item
      key={item.key}
      item={item}
      index={index}
      parentNode={parentNode}
      Create={Create}
      compName={compName}
      listLength={nodes.length}
    />)
  }
}
