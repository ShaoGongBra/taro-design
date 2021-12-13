import React from 'react'
import { getComponentConfig } from '../../render'

// 递归获取子表单
const getChild = (list, name, index = [0]) => {
  return list.map(item => {
    const newItem = { ...item }
    if (getComponentConfig(newItem.nodeName).isForm) {
      newItem.name = typeof name === 'object' ? [...name, index[0]] : [name, index[0]]
      index[0]++
    } else if (newItem.child) {
      newItem.child = getChild(newItem.child, name, index)
    }
    return newItem
  })
}

const ArrayForm = ({ children, name, _childNodes, _edit }) => {

  return <React.Fragment>
    {_edit ? children() : children({ nodes: getChild(_childNodes, name) })}
  </React.Fragment>

}

ArrayForm.designConfig = {
  childFunc: true,
  defaultValue: () => [],
  isForm: true
}

export default ArrayForm
