import React, { useCallback, useMemo, useContext } from 'react'
import { Switch, View } from '@tarojs/components'
import { recursionGetValue } from 'taro-tools'
import { FormContext } from './form'
import './switch.scss'

const SwitchForm = ({ name, ...attr }) => {

  const { updateValue, values } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values])

  const input = useCallback(e => {
    updateValue(name, e.detail.value)
  }, [name, updateValue])

  return <View className='form-switch'>
    <Switch checked={!!value && value !== '0'} disabled={!!attr.disabled} onChange={input} />
  </View>
}

SwitchForm.designConfig = {
  defaultValue: false,
  isForm: true
}

export default SwitchForm
