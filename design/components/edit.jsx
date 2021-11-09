import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { deepCopy, toast } from 'taro-tools'
import { ScrollView } from '../../component'
import Template from '../template';
import Create from './create'
import Attr from './attr'
import Preview from './preview'
import Export from './export'
import Menus from './menus'
import Del from './del'
import Hover from './hover'

import comp from '../util/comp'
import { isComponent, querySelectByKey, querySelectByKeyOriginal, styled } from '../../render'
import Context from '../util/context'
import { NodePosition } from '../util/edit'
import { EditHistory } from '../util/history'
import EditTypes from '../util/editTypes'
// 初始化编辑器用的表单
import '../attrForm'
import './edit.scss'

// 查找属性中的不同值
const diffAttr = (a, b, keys = []) => {
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

const Edit = ({
  style,
  template = true,
  defaultNodes = []
}) => {

  const [nodes, setNodes] = useState(defaultNodes)
  // 选中的节点
  const [hover, setHover] = useState(void 0)
  // 选中的节点Key
  const [hoverKey, setHoverKey] = useState(void 0)
  // 页面配置
  const [config] = useState({ width: 750 })
  // 预览显示
  const [preview, setPreview] = useState(false)
  // 导出显示
  const [showExport, setShowExport] = useState(false)

  const history = useRef(null)

  useEffect(() => {
    history.current = new EditHistory()
    return () => {
      history.current.destroy()
    }
  }, [])

  // 设置节点数据
  const setNodeData = useCallback((key, data, historyAction) => {
    // 控制编辑表单重新渲染
    if (historyAction && hoverKey === key) {
      setHover(querySelectByKey(nodes, key))
    }
    const item = querySelectByKeyOriginal(nodes, key)
    const res = diffAttr(item, data)
    res.push(key)
    !historyAction && history.current.insert('edit', res)
    item?.forceUpdate?.()
  }, [nodes, hoverKey])

  /**
   * 组件排序 插入 删除 复制 粘贴通用函数
   * 插入：第一个为模板名称 第二个为位置
   * 插入模板：第一个为模板 第二个为位置
   * 排序：第一个为位置 第二个为位置
   * 删除：第一个为位置 第二个为空 或者为number表示要删除的数量
   * 复制：第一个为位置 第二个 '__copy__'
   * 粘贴：第一个为位置 第二个 '__paste__'
   */
  const moveNode = useCallback((key1, key2, historyAction) => {
    if (isComponent(key1) && key2 instanceof NodePosition) {
      // 插入组件
      const node = key2.getNode(nodes)
      const insertNode = comp.getCompAttr(key1)
      // 插入历史记录
      !historyAction && history.current.insert('insert', [key2, insertNode])
      node.child.splice(key2.index, 0, insertNode)
      setNodes([...nodes])
    } else if (key1 instanceof Array && key1[0] instanceof Object && key2 instanceof NodePosition) {
      // 插入模板
      const currentForm = key2.getNode(nodes)
      const addList = []
      comp.copyNodes(key1, !historyAction).forEach(item => {
        if (currentForm.nodeName === 'root') {
          // 添加到根节点
          nodes.push(item)
          addList.push(item)
        } else if (comp.isChildAdd(currentForm.nodeName, currentForm.child.length) && !comp.isChildDisable(currentForm.nodeName, item.nodeName)) {
          currentForm.child.push(item)
          addList.push(item)
        } else {
          console.warn(comp.getCompName(item.nodeName) + '插入失败')
          toast(comp.getCompName(item.nodeName) + '插入失败')
        }
      })
      // 插入历史记录
      addList.length && !historyAction && history.current.insert('insert-template', [key2, addList])
      setNodes([...nodes])
    } else if (key1 instanceof NodePosition && key2 instanceof NodePosition) {
      // 排序
      if (key1.toString() === key2.toString()) {
        return
      }
      const node1 = key1.getNode(nodes)
      const node2 = key2.getNode(nodes)

      // 删除拖拽位置的节点
      const [node] = node1.child.splice(key1.index, 1)
      // 插入历史记录
      !historyAction && history.current.insert('move', [key1, key2])
      // 将其插入到新节点
      // 同一个数组里面 前面的拖动到后面需要索引 -1
      if (!historyAction && key1.key === key2.key && key1.index < key2.index) {
        key2.index--
      }
      node2.child.splice(key2.index, 0, node)
      setNodes([...nodes])
    } else if (key1 instanceof NodePosition && (!key2 || typeof key2 === 'number')) {
      // 删除
      const [node] = key1.getNode(nodes).child.splice(key1.index, key2 || 1)
      // 插入历史记录
      !historyAction && history.current.insert('delete', [key1, comp.copyNodes(node, false)])
      setNodes([...nodes])
      setHover(void 0)
      setHoverKey(void 0)
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

  // 给历史激励管理器添加工具
  useEffect(() => {
    history.current.setTools(nodes, setNodeData, moveNode)
  }, [nodes, setNodeData, moveNode])

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
    showExport,
    setNodeData,
    moveNode,
    selectNode,
    setPreview,
    setShowExport
  }), [nodes, hoverKey, hover, preview, showExport, setNodeData, moveNode, selectNode])

  return <Context.Provider value={context}>
    <View className='taro-design' style={style}>
      <Menus />
      <View
        ref={ref}
        className='phone'
        style={styled.styleTransform({ style: { width: config.width } }).style}
      >
        <ScrollView>
          <Create nodes={nodes} />
          <Hover />
        </ScrollView>
      </View>
      <Attr />
      {preview && <Preview />}
      <Export />
      <Del />
      {template && <Template />}
    </View>
  </Context.Provider>
}

export default props => {
  return <DndProvider backend={HTML5Backend}>
    <Edit {...props} />
  </DndProvider>
}
