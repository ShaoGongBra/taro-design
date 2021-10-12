import React, { useCallback, useMemo, useContext } from 'react'
import { View, Text } from '@tarojs/components'
import { getKey, recursionGetValue } from 'taro-tools'
import { Icon } from '../base'
import { getFormItemDefaultValue } from './utils'
import { FormContext } from './form'
import './array_one.scss'

const ArrayOne = ({ children, name, _childNodes, _edit, style }) => {

  const { updateValue, values } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values]) || []

  // 添加行
  const addRow = useCallback(() => {
    if (_childNodes.length === 0) {
      return
    }
    value.push(getFormItemDefaultValue(_childNodes[0]))
    updateValue(name, [...value])
  }, [updateValue, name, value, _childNodes])

  // 删除行
  const delRow = useCallback(index => {
    value.splice(index, 1)
    updateValue(name, [...value])
  }, [updateValue, name, value])

  // 重组child
  const nodes = useMemo(() => {
    const list = []
    const [item] = _childNodes
    if (!item) {
      return list
    }
    const newValue = _edit ? [''] : value
    for (let i = 0, l = newValue.length; i < l; i++) {
      list.push({
        ...item,
        name: [...(typeof name === 'object' ? name : [name]), i],
        key: getKey()
      })
    }
    return list
  }, [_childNodes, name, value, _edit])

  return !_edit
    ? <View style={style}>
      <View className='form-array-one__form'>
        <View className='form-array-one__create'>
          {children({ nodes })}
        </View>
        <View className='form-array-one__actions'>
          {
            value.map((item, index) => <View key={'item' + index} className='form-array-one__actions__item'>
              <Icon name='guanbi2' onClick={() => delRow(index)} />
            </View>)
          }
        </View>
      </View>
      <View className='form-array-one__add' onClick={addRow}>
        <Icon name='jiahao' />
        <Text className='form-array-one__add__text'>添加行</Text>
      </View>
    </View> : children()
}

ArrayOne.designConfig = {
  childFunc: true,
  defaultValue: () => [],
  isForm: true
}

export default ArrayOne
