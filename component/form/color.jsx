import React, { useRef, useContext, useMemo, useCallback } from 'react'
import { View, Input } from '@tarojs/components'
import { isColorString, recursionGetValue } from 'taro-tools'
import { PullView, TopView } from '../../component'
import { PageUrlContext } from '../../render'
import { FormContext } from './form'
import './color.scss'

const colors = ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']

const Select = ({ onSelect, onClose }) => {

  const pullView = useRef(null)

  return <PullView ref={pullView} onClose={onClose}>
    <View className='form-color-pull'>
      {colors.map(item => <View
        className='form-color-pull__item'
        key={item}
        style={{ backgroundColor: item }}
        onClick={() => {
          pullView.current.close()
          onSelect(item)
        }}
      />)}
      <View className='form-color-pull__item--empty' />
      <View className='form-color-pull__item--empty' />
      <View className='form-color-pull__item--empty' />
      <View className='form-color-pull__item--empty' />
      <View className='form-color-pull__item--empty' />
      <View className='form-color-pull__item--empty' />
      <View className='form-color-pull__item--empty' />
      <View className='form-color-pull__item--empty' />
      <View className='form-color-pull__item--empty' />
      <View className='form-color-pull__item--empty' />
    </View>
  </PullView>
}

const ColorForm = ({ name, _edit, ...attr }) => {

  const { updateValue, values } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values])

  const TopViewUrl = useContext(PageUrlContext)

  const key = useRef(null)

  const callback = useRef([])

  const submit = useCallback(val => {
    callback.current[0](val)
  }, [])

  const close = useCallback(() => {
    TopView.remove(key.current, TopViewUrl)
    callback.current[1]()
  }, [TopViewUrl])

  // 选择颜色
  const select = useCallback(() => {
    key.current = TopView.add(<Select onSelect={submit} onClose={close} />, TopViewUrl)
    return new Promise((resolve, reject) => {
      callback.current = [resolve, reject]
    })
  }, [TopViewUrl, submit, close])

  // 颜色输入
  const input = useCallback(e => {
    // 验证颜色值的合法性
    if (isColorString(e.detail.value) || e.detail.value === '') {
      updateValue(name, e.detail.value)
    }
  }, [updateValue, name])

  // 点击选择颜色
  const click = useCallback(() => {
    if (_edit || attr.disabled) {
      return
    }
    select().then(res => {
      updateValue(name, res)
    }).catch(() => { })
  }, [_edit, attr, name, updateValue, select])

  return <View className='form-color'>
    <View
      className='form-color__color'
      style={{ backgroundColor: value || '#fff' }}
      onClick={click}
    />
    <Input className='form-color__input' value={value} placeholder='颜色值' onInput={input} />
  </View>

}

ColorForm.designConfig = {
  defaultValue: '#000',
  isForm: true
}

export default ColorForm
