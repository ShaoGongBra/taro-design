import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { toast } from 'taro-tools'
import Create from './create'
import Attr from './attr'
import Preview from './preview'
import Json from './json'
import Menus from './menus'
import Del from './del'
import Hover from './hover'

import comp from '../util/comp'
import testData from '../util/testData'
import { isComponent, querySelectByKey, querySelectByKeyOriginal, styled } from '../../render'
import Context from '../util/context'
import { NodePosition } from '../util/edit'
import EditTypes from '../util/editTypes'
// 初始化编辑器用的表单
import '../attrForm'
import './edit.scss'


/**
 * 标记组件是否正在更新 正在更新则不更新新的数据，方式数据错乱
 */
let listUpdate = false

const Edit = ({
  style
}) => {

  const [nodes, setNodes] = useState([])
  // 选中的表单
  const [hover, setHover] = useState(void 0)
  // 选中的表单Key
  const [hoverKey, setHoverKey] = useState(void 0)
  // 页面配置
  const [config] = useState({ width: 750 })
  // 预览
  const [preview, setPreview] = useState(false)
  // 导出json
  const [showJson, setShowJson] = useState(false)

  useEffect(() => {
    listUpdate = false
  }, [nodes])

  // 设置节点数据
  const setNodeData = useCallback((id, data) => {
    const item = querySelectByKeyOriginal(nodes, id)
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        item[key] = data[key]
      }
    }
    item?.forceUpdate?.()
  }, [nodes])

  /**
   * 组件排序 插入 删除 复制 粘贴通用函数
   * 插入：第一个为模板名称 第二个为位置
   * 插入模板：第一个为模板 第二个为位置
   * 排序：第一个为位置 第二个为位置
   * 删除：第一个为位置 第二个为空
   * 复制：第一个为位置 第二个 '__copy__'
   * 粘贴：第一个为位置 第二个 '__paste__'
   */
  const moveNode = useCallback((key1, key2) => {
    if (isComponent(key1) && key2 instanceof NodePosition) {
      // 插入组件
      const node = key2.getNode(nodes)
      node.child.splice(key2.index, 0, comp.getCompAttr(key1))
      setNodes([...nodes])
    } else if (key1 instanceof Array && key1[0] instanceof Object && key2 instanceof NodePosition) {
      // 插入模板
      const currentForm = key2.getNode(nodes)
      comp.copyNodes(key1).forEach(item => {
        if (!currentForm) {
          // 添加到根节点
          nodes.push(item)
        } else if (comp.isChildAdd(currentForm.nodeName, currentForm.child.length) && !comp.isChildDisable(currentForm.nodeName, item.nodeName)) {
          currentForm.child.push(item)
        } else {
          console.warn(comp.getCompName(item.nodeName) + '插入失败')
          toast(comp.getCompName(item.nodeName) + '插入失败')
        }
      })
      setNodes([...nodes])
    } else if (key1 instanceof NodePosition && key2 instanceof NodePosition) {
      // 排序
      if (listUpdate || key1.toString() === key2.toString()) {
        return
      }
      listUpdate = true
      const node1 = key1.getNode(nodes)
      const node2 = key2.getNode(nodes)

      // 删除拖拽位置的节点
      const [node] = node1.child.splice(key1.index, 1)
      // 将其插入到新节点
      if (key1.key === key2.key && key1.index < key2.index) {
        // 前面的拖动到后面需要 -1
        key2.index--
      }
      delete node1.parentNode
      node2.child.splice(key2.index, 0, node)
      setNodes([...nodes])
    } else if (key1 instanceof NodePosition && !key2) {
      // 删除
      key1.getNode(nodes).child.splice(key1.index, 1)
      setNodes([...nodes])
    } else if (key1 instanceof NodePosition && key2 === '__copy__') {
      // 复制
      let item = key1.getIndexNode(nodes)
      if (!item) {
        // 复制根节点下的所有组件
        item = nodes
      }
      Taro.setClipboardData({
        data: JSON.stringify(item)
      }).then(() => {
        toast('复制成功')
      }).catch(() => {
        toast('复制失败')
      })
    } else if (key1 instanceof NodePosition && key2 === '__paste__') {
      // 粘贴
      Taro.getClipboardData().then(res => {
        try {
          let data = JSON.parse(res.data.data || res.data)
          if (!data) {
            toast('没有要粘贴的数据')
            return
          }
          if (!(data instanceof Array) && data instanceof Object) {
            data = [data]
          }
          if (!(data instanceof Array)) {
            toast('数据类型错误')
            return
          }
          moveNode(data, key1)
        } catch (error) {
          console.log(error)
          toast('数据解析错误')
        }
      })
    }
  }, [nodes])

  /**
   * 开始编辑表单 当key为空时表示退出表单编辑
   */
  const selectNode = useCallback(key => {
    setHoverKey(key)
  }, [])

  // 选中项目
  useEffect(() => {
    hoverKey && setHover(querySelectByKey(nodes, hoverKey))
  }, [hoverKey, nodes])

  const ref = useRef(null)
  // 添加至最外层
  const [{ }, drop] = useDrop({
    accept: [EditTypes.FORM_MOVE, EditTypes.FORM_ADD, EditTypes.TEMPLATE_ADD],
    drop(item, monitor) {
      const type = monitor.getItemType()
      if (!monitor.isOver({ shallow: true }) || comp.isChildDisable('root', item.nodeName)) {
        return
      }

      const pos = new NodePosition('__root__', nodes.length)

      // 不同类型操作
      if (type === EditTypes.FORM_MOVE) {
        moveNode(item.position, pos)
      } else if (type === EditTypes.FORM_ADD) {
        moveNode(item.nodeName, pos)
      } else if (type === EditTypes.TEMPLATE_ADD) {
        moveNode(item.template, pos)
      }
    }
  })

  drop(ref)

  // 组件共享数据
  const context = useMemo(() => ({
    nodes,
    hoverKey,
    hover,
    preview,
    showJson,
    setNodeData,
    moveNode,
    selectNode,
    setPreview,
    setShowJson
  }), [nodes, hoverKey, hover, preview, showJson, setNodeData, moveNode, selectNode])

  return <Context.Provider value={context}>
    <View className='taro-design' style={style}>
      <Menus />
      <View
        ref={ref}
        className='phone'
        style={styled.styleTransform({ style: { width: config.width } }).style}
      >
        <ScrollView className='scroll' scrollY>
          <Create nodes={nodes} />
          <Hover />
        </ScrollView>
      </View>
      <Attr />
      {preview && <Preview />}
      {showJson && <Json />}
      <Del />
    </View>
  </Context.Provider>
}

export default props => {
  return <DndProvider backend={HTML5Backend}>
    <Edit {...props} />
  </DndProvider>
}
