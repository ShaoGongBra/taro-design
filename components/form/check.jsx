import React, { useCallback, useContext, useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import { recursionGetValue } from 'taro-tools'
import { Icon } from '../base'
import { FormContext } from './form'
import './check.scss'

const CheckForm = ({ name, title }) => {

  const { updateValue, values = {} } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values])

  const input = useCallback(() => {
    updateValue?.(name, !value)
  }, [name, updateValue, value])

  return <View className='form-check' onClick={input}>
    <View className='form-check__click'>
      {!!value && value !== '0' && <Icon name='duihao2' size={38} />}
    </View>
    {!!title && <Text className='form-check__tip'>{title}</Text>}
  </View>
}

CheckForm.designConfig = {
  defaultValue: false,
  isForm: true
}

export default CheckForm
