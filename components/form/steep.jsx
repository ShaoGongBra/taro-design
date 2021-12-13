import React, { useCallback, useMemo, useContext } from 'react'
import { View, Text } from '@tarojs/components'
import { recursionGetValue } from 'taro-tools'
import { Icon } from '../base'
import { FormContext } from './form'
import './steep.scss'

const Steep = ({ name, ...attr }) => {

  const { updateValue, values } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values]) || 0

  const { min = 0, max = 9, step = 1 } = attr

  const change = useCallback(type => {
    const newValue = Number(value) + (type === '+' ? step : -step)
    if (newValue >= Number(min) && newValue <= Number(max)) {
      updateValue(name, newValue)
    }
  }, [min, max, name, updateValue, value, step])

  return <View className='form-steep'>
    <View className='form-steep__btn' onClick={() => change('-')}>
      <Icon name='jianhao' size={32} color={Number(value) <= Number(min) ? '#999' : '#333'} />
    </View>
    <View className='form-steep__num'>
      <Text className='form-steep__num__text'>{value}</Text>
    </View>
    <View className='form-steep__btn' onClick={() => change('+')}>
      <Icon name='jiahao' size={32} color={Number(value) >= Number(max) ? '#999' : '#333'} />
    </View>
  </View>
}

Steep.designConfig = {
  defaultValue: item => item.min || 0,
  isForm: true
}

export default Steep
