import React, { useRef, useState, useMemo, useContext, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Input } from '@tarojs/components'
import classNames from 'classnames'
import { recursionGetValue } from 'taro-tools'
import { Modal } from '../../../components/overlay'
import { icons as fonts } from '../../../render'
import { FormContext } from '../form'
import './iconSelect.scss'

const Icon = ({ font, name, size = 24 }) => {
  if (typeof name === 'object') {
    font = name[0]
    name = name[1]
  }
  return <Text
    style={{ fontSize: Taro.pxTransform(size) }}
    className={classNames(font, fonts[font]?.prefix + name)}
  />
}

const Select = ({ onSelect }) => {

  const fontKeys = useMemo(() => Object.keys(fonts), [])

  const [hover, setHover] = useState(fontKeys[0] || '')
  const [keyword, setKeyword] = useState('')
  const [show, setShow] = useState(false)

  !show && setTimeout(() => {
    !show && setShow(true)
  }, 200)

  const icons = useMemo(() => {
    return show && keyword
      ? Object.keys(fonts[hover]?.list || {}).filter(item => item.indexOf(keyword) >= 0)
      : show
        ? Object.keys(fonts[hover]?.list || {})
        : []
  }, [show, keyword, hover])

  return <View className='form-icon-select-pull'>
    {fontKeys.length > 1 && <ScrollView scrollX className='form-icon-select-pull__cate'>
      {fontKeys.map(key => <View
        className={`form-icon-select-pull__cate__item${hover === key ? ' form-icon-select-pull__cate__item--hover' : ''}`}
        key={key}
        onClick={() => setHover(key)}
      >
        <Text className='form-icon-select-pull__cate__item__text'>{key}</Text>
      </View>)}
    </ScrollView>}
    <View className='form-icon-select-pull__search'>
      <Input className='form-icon-select-pull__search__input' placeholder='搜索图标' value={keyword} onInput={e => setKeyword(e.target.value)} />
    </View>
    <ScrollView scrollY className='form-icon-select-pull__scroll'>
      {show && <View className='form-icon-select-pull__icons'>
        {
          icons.map(name => <View
            key={name}
            className='form-icon-select-pull__icons__item'
            onClick={() => onSelect([hover, name])}
          >
            <Icon font={hover} name={name} size={48} />
            <Text className='form-icon-select-pull__icons__item__name'>{name}</Text>
          </View>)
        }
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
        <View className='form-icon-select-pull__icons__item--empty' />
      </View>}
    </ScrollView>
  </View>
}

export default ({ name }) => {

  const { updataValue, formValue } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, formValue) || '', [name, formValue])

  const callback = useRef([])

  const submit = useCallback(val => {
    setSelectShow(false)
    callback.current[0](val)
  }, [])

  const [selectShow, setSelectShow] = useState(false)

  const close = useCallback(() => {
    setSelectShow(false)
    callback.current[1]()
  }, [])

  // 选择图标
  const select = useCallback(() => {
    setSelectShow(true)
    return new Promise((resolve, reject) => {
      callback.current = [resolve, reject]
    })
  }, [])

  // 点击选择图标
  const click = useCallback(() => {
    select().then(res => {
      updataValue(name, res)
    }).catch(() => { })
  }, [name, updataValue, select])

  return <View className='form-icon-select' onClick={click} >
    <View className='form-icon-select__icon'>
      <Icon name={value} size={24} />
    </View>
    <Modal show={selectShow} onClose={close}>
      <Select onSelect={submit} />
    </Modal>
  </View>

}
