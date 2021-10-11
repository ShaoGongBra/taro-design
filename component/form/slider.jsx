import React, { useCallback, useMemo, useContext } from 'react'
import { Slider } from '@tarojs/components'
import { recursionGetValue } from 'taro-tools'
import { FormContext } from './form'
import './slider.scss'

const SliderForm = ({ name, ...attr }) => {

  const { updateValue, values } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values])

  const change = useCallback(e => {
    updateValue(name, e.detail.value)
  }, [name, updateValue])

  return <Slider value={value} min={attr.min} disabled={!!attr.disabled} max={attr.max} step={attr.step} activeColor='#666' backgroundColor='#e2e2e2' onChange={change} />
}

SliderForm.designConfig = {
  defaultValue: item => item.min || 0,
  isForm: true
}

export default SliderForm
