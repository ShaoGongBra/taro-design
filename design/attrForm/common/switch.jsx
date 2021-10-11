import React, { useCallback, useContext, useMemo } from 'react'
import { Switch } from '@tarojs/components'
import { recursionGetValue } from 'taro-tools'
import { FormContext } from '../form'
import './switch.scss'

export default ({ name }) => {

  const { updataValue, formValue } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, formValue) || '', [name, formValue])

  const onUpdataValue = useCallback(e => {
    updataValue?.(name, e.target.value)
  }, [updataValue, name])


  return <Switch checked={!!value && value !== '0'} onChange={onUpdataValue} />
}
