import React, { useCallback, useMemo, useContext } from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { recursionGetValue } from 'taro-tools'
import { Icon } from '../base'
import { getFormDefaultValue } from './utils'
import { FormContext } from './form'
import { styled } from '../../render'
import './array_two.scss'

const ArrayTwo = ({ children, name, _childNodes, _edit }) => {


  const { updateValue, values } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values])


  // 添加行
  const addRow = useCallback(() => {
    value.push(getFormDefaultValue(_childNodes))
    updateValue(name, value)
  }, [name, value, updateValue, _childNodes])

  // 删除行
  const delRow = useCallback(index => {
    value.splice(index, 1)
    updateValue(name, value)
  }, [name, value, updateValue])

  const showChild = _childNodes.filter(item => !item.child?.[0]?.hidden)

  const actionWidth = useMemo(() => 100, [])
  const newValue = useMemo(() => _edit ? [{}] : value, [_edit, value])

  return <ScrollView className='form-array-two' scrollX>
    {
      !_edit
        ? <View className='form-array-two__table'>
          <View className='form-array-two__head'>
            {showChild.map(item => <View
              key={item.key}
              className='form-array-two__head__item'
              style={styled.styleTransform(item.style).style}
            >
              <Text className='form-array-two__head__item__txt'>{item.text}</Text>
              <Text className='form-array-two__head__item__tip'>{item.tip}</Text>
            </View>)}
            <View
              className='form-array-two__head__item'
              style={{ width: Taro.pxTransform(actionWidth) }}
            >
              <Icon name='jiahao' onClick={addRow} />
            </View>
          </View>
          {
            newValue.map((item, index) => <View key={'item' + index} className='form-array-two__main'>
              {children({ nodes: showChild })}
              <View className='form-array-two__main__action' style={{ width: Taro.pxTransform(actionWidth) }}>
                <Icon name='guanbi2' onClick={() => delRow(index)} />
              </View>
            </View>)
          }
        </View>
        : <View className='form-array-two__edit'>
          <View className='form-array-two__head'>
            {showChild.map(item => <View
              key={item.key}
              className='form-array-two__head__item'
              style={styled.styleTransform(item.style).style}
            >
              <Text className='form-array-two__head__item__txt'>{item.text}</Text>
              <Text className='form-array-two__head__item__tip'>{item.tip}</Text>
            </View>)}
          </View>
          <View className='form-array-two__edit__main'>
            {children({ nodes: showChild })}
          </View>
        </View>
    }
  </ScrollView>
}

ArrayTwo.designConfig = {
  childFunc: true,
  defaultValue: () => ([]),
  isForm: true,
  // 当前子组件发生更新时更新我
  childForceUpdateSelf: true
}

const ArrayTowItem = ({ children, _edit, _childNodes, ...props }) => {
  return <View {...props}>{children}</View>
}

export default ArrayTwo

export {
  ArrayTwo,
  ArrayTowItem
}
