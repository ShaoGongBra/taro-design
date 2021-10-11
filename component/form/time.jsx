import React, { useCallback, useMemo, useContext } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import { recursionGetValue, dateToStr } from 'taro-tools'
import { FormContext } from './form'
import './time.scss'

const TimeForm = ({ name, ...attr }) => {
  const { updateValue, values } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values])

  const input = useCallback(e => {
    updateValue(name, e.detail.value)
  }, [name, updateValue])

  return <View className='form-time'>
    <Picker mode='time' value={value} disabled={!!attr.disabled} onChange={input}>
      <Text className='form-time__text'>{value || '请选择时间'}</Text>
    </Picker>
  </View>
}

TimeForm.designConfig = {
  defaultValue: () => dateToStr('HH:mm'),
  isForm: true
}

export default TimeForm
