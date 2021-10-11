import React, { useCallback, useContext, useMemo } from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { recursionGetValue } from 'taro-tools'
import { Icon } from '../base'
import { FormContext } from './form'
import './input.scss'

const InputForm = ({ name, _edit, key, multiline, ...attr }) => {

  const { updateValue, checkVerify, values } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values])

  const input = useCallback(e => {
    updateValue(name, e.detail.value)
  }, [updateValue, name])

  const blur = useCallback(() => {
    checkVerify(key)
  }, [checkVerify, key])

  return <View className='form-input'>
    {!!attr.leftIcon && attr.leftIcon.length > 0 && <Icon name={attr.leftIcon} size={36} style={{ marginRight: Taro.pxTransform(10) }} />}
    {
      multiline ?
        <Textarea
          className='form-input__textarea'
          placeholder={attr.placeholder || ''}
          maxLength={attr.maxLength || 140}
          disabled={!!attr.disabled || _edit}
          focus={!!attr.focus}
          value={value}
          onInput={input}
          onBlur={blur}
        /> :
        <Input
          className='form-input__input'
          type={attr.type || 'text'}
          placeholder={attr.placeholder === undefined ? attr.text : attr.placeholder}
          password={!!attr.password}
          maxLength={attr.maxLength || 140}
          disabled={!!attr.disabled || _edit}
          focus={!!attr.focus}
          value={value}
          onInput={input}
          onBlur={blur}
        />
    }
  </View>
}

InputForm.designConfig = {
  defaultValue: '',
  isForm: true
}

export default InputForm
