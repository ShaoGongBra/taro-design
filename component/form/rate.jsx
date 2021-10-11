import React, { useCallback, useMemo, useContext } from 'react'
import { View } from '@tarojs/components'
import { recursionGetValue } from 'taro-tools'
import { Icon } from '../base'
import { FormContext } from './form'
import './rate.scss'

const Rote = ({ name, ...attr }) => {

  const { updateValue, values } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values])

  const { rule = 5 } = attr

  const input = useCallback(val => {
    updateValue(name, val * (rule / 5))
  }, [name, updateValue, rule])

  const newValue = useMemo(() => Math.round(value / (rule / 5)), [value, rule])
  const arr = useMemo(() => [1, 2, 3, 4, 5], [])

  return <View className='form-rate'>
    {arr.map(item => <Icon
      key={item}
      size={42}
      name={item <= newValue ? 'pingfen-yipingfen' : 'pingfen'}
      color={item <= newValue ? '#333' : '#666'}
      onClick={() => input(item)}
    />)}
  </View>
}

Rote.designConfig = {
  defaultValue: item => item.rule,
  isForm: true
}

export default Rote
