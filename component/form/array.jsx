import React from 'react'

const ArrayForm = ({ children, value, _childNodes }) => {

  // 递归获取子表单
  const getChild = (list, index = [0]) => {
    return list.map(item => {
      const newItem = { ...item }
      if (typeof newItem.name !== 'undefined') {
        newItem.name = index[0]
        index[0]++
      } else if (newItem.child) {
        newItem.child = getChild(newItem.child, index)
      }
      return newItem
    })
  }

  return <React.Fragment>
    {children({ nodes: getChild(_childNodes), values: value })}
  </React.Fragment>

}

ArrayForm.designConfig = {
  defaultValue: () => ([]),
  isForm: true
}

export default ArrayForm
