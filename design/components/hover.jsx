
import React, { useEffect, useContext, useCallback, useReducer } from 'react'
import { View } from '@tarojs/components'
import Context from '../util/context'
import { getOffset, toPx } from '../util/util'
import './hover.scss'

const diff = (newData, oldData) => {
  const add = []
  const del = []
  newData.forEach(key => {
    if (!oldData.includes(key)) {
      add.push(key)
    }
  })
  oldData.forEach(key => {
    if (!newData.includes(key)) {
      del.push(key)
    }
  })
  return [add, del]
}

const mutationData = {}

const monitorSize = (keys, callback) => {
  if (typeof keys !== 'object') {
    keys = [keys]
  }
  const [add, del] = diff(keys, Object.keys(mutationData))

  add.forEach(key => {
    let targetNode = document.querySelector(`.form-drag-drop.key-${key} .hydrated`)
    if (!targetNode || targetNode.classList.contains('form-drag-drop')) {
      targetNode = document.querySelector(`.form-drag-drop.key-${key}`)
    }
    if (!targetNode) {
      return
    }
    // 观察器的配置（需要观察什么变动）
    const config = { attributes: true, childList: true, subtree: true }

    // 历史布局信息 如果完全相同则不触发回调
    let oldData = {}
    // 当观察到变动时执行的回调函数
    const onChange = function () {
      const { width, height } = targetNode.getBoundingClientRect()
      const data = {
        key,
        ...getOffset(targetNode, document.querySelector('.phone .scroll')),
        width,
        height
      }
      if (data.left !== oldData.left || data.top !== oldData.top || data.width !== oldData.width || data.height !== oldData.height) {
        callback(data)
        oldData = data
      }
    }
    onChange()
    // 创建一个观察器实例并传入回调函数
    mutationData[key] = new MutationObserver(onChange)

    // 以上述配置开始观察目标节点
    mutationData[key].observe(targetNode, config)
  })
  del.forEach(key => {
    mutationData[key].disconnect()
    delete mutationData[key]
  })
  return del
}

const Item = ({ pos }) => {
  pos = { ...pos }
  pos.width -= 2
  // pos.height -= 1

  return <React.Fragment>
    <View className='select-box top' style={{ width: toPx(pos.width), left: toPx(pos.left), top: toPx(pos.top) }} />
    <View className='select-box right' style={{ height: toPx(pos.height), left: toPx(pos.left + pos.width), top: toPx(pos.top) }} />
    <View className='select-box bottom' style={{ width: toPx(pos.width), left: toPx(pos.left), top: toPx(pos.top + pos.height) }} />
    <View className='select-box left' style={{ height: toPx(pos.height), left: toPx(pos.left), top: toPx(pos.top) }} />
  </React.Fragment>
}

// 状态管理
const initialState = []
function reducer(state, action) {
  switch (action.type) {
    case 'change': {
      const index = state.findIndex(v => v.key === action.data.key)
      if (~index) {
        state.splice(index, 1, action.data)
      } else {
        state.push(action.data)
      }
      return [...state]
    }

    case 'del': {
      // 删除
      return state.filter(item => !action.data.includes(item.key))
    }

    default: {
      return state
    }
  }
}

export default () => {

  const { hoverKey } = useContext(Context)

  const [select, dispatch] = useReducer(reducer, initialState)

  const monitorCallback = useCallback(item => dispatch({ data: item, type: 'change' }), [])

  // 监听选中的表单
  useEffect(() => {
    let del
    if (hoverKey) {
      del = monitorSize(hoverKey, monitorCallback)
    } else {
      del = monitorSize([], monitorCallback)
    }
    dispatch({ type: 'del', data: del })
  }, [hoverKey, monitorCallback])

  return select.map(item => <Item key={item.key} pos={item} />)

}
