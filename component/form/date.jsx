import React, { useCallback, useMemo, useContext } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import { recursionGetValue, dateToStr } from 'taro-tools'
import { FormContext } from './form'
import './date.scss'

const DateForm = ({ name, ...attr }) => {

  const { updateValue, values } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values])

  const input = useCallback(e => {
    updateValue(name, e.detail.value)
  }, [name, updateValue])

  return <View className='form-date'>
    <Picker mode='date' value={value} disabledd={!!attr.disabled} onChange={input}>
      <Text className='form-date__text'>{value || '请选择日期'}</Text>
    </Picker>
  </View>
}

DateForm.designConfig = {
  defaultValue: () => dateToStr('yyyy-MM-dd'),
  isForm: true
}

export default DateForm
