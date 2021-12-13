import React, { useState, useRef, useMemo, useCallback, useContext } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { recursionGetValue, getContrastYIQ } from 'taro-tools'
import { Icon, Button } from '../base'
import { PullView, TopView } from '../overlay'
import { FormContext } from './form'
import './select.scss'

// 判断当前项目是否选中
const isSelect = (item, type, value = '') => {
  if (type === 'radio') {
    if (typeof item.value === 'object') {
      return item.value[0] === value
    }
    return item.value === value
  } else {
    return (typeof value === 'string' ? value.split(',') : value).includes(item.value)
  }
}

const RenderItemIcon = ({ item, type = 'radio', value }) => {

  const icon = type === 'radio'
    ? (isSelect(item, type, value) ? 'fuhao-zhuangtai-chenggong' : 'danxuan-weixuan')
    : (isSelect(item, type, value) ? 'duoxuan-yixuan' : 'duoxuan-weixuan')

  return <Icon name={icon} size={42} style={{ marginRight: Taro.pxTransform(12) }} />
}

const RenderText = ({ item, onInput, type, value }) => {
  return <View className='form-select__item-text' onClick={() => onInput(item)}>
    <RenderItemIcon item={item} type={type} value={value} />
    <View className='form-select__item-text__right'>
      <Text className='form-select__item-text__name'>{item.text}</Text>
      {!!item.desc && <Text className='form-select__item-text__desc'>{item.desc}</Text>}
    </View>
  </View>
}

const RenderButton = ({ item, onInput, type, value }) => {
  return <Button
    text={item.text}
    size='m'
    disabled={!!item.disabled}
    plain={!isSelect(item, type, value)}
    beforeImage={item.image}
    style={{
      marginRight: Taro.pxTransform(10),
      marginBottom: Taro.pxTransform(10)
    }}
    onClick={() => onInput(item)}
  />
}

const RenderCard = ({ item, onInput, type, value }) => {
  return <View className='form-select__item-card' onClick={() => onInput(item)}>
    <RenderItemIcon item={item} type={type} value={value} />
    {item.image && <Image className='form-select__item-card__image' src={item.image} />}
    <View className='form-select__item-card__right'>
      <Text className='form-select__item-card__name'>{item.text}</Text>
      {!!item.desc && <Text className='form-select__item-card__desc'>{item.desc}</Text>}
    </View>
  </View>
}

const RenderImage = ({ item, onInput, type, value }) => {

  return <View className='form-select__item-image' onClick={() => onInput(item)}>
    <View className='form-select__item-image__btn'>
      <RenderItemIcon item={item} type={type} value={value} />
    </View>
    <Image className='form-select__item-image__image' src={item.image} />
    {!!item.text && <View className='form-select__item-image__bottom'>
      <Text className='form-select__item-image__name'>{item.text}</Text>
      {!!item.desc && <Text className='form-select__item-image__desc'>{item.desc}</Text>}
    </View>}
  </View>
}

const RenderColor = ({ item, onInput, type, value }) => {
  return <View
    className='form-select__item-color'
    style={{ backgroundColor: item.color }}
    onClick={() => onInput(item)}
  >
    {isSelect(item, type, value) && <Icon name='duihao2' color={getContrastYIQ(item.color)} />}
  </View>
}


const renderItems = {
  text: RenderText,
  button: RenderButton,
  card: RenderCard,
  image: RenderImage,
  color: RenderColor
}

const RenderOption = ({ onlySelect, data = {}, value = [], onInput }) => {
  if (!data.option) {
    data.option = []
  }

  const list = onlySelect ? data.option.filter(item => isSelect(item, data.type, value)) : data.option
  const input = (item) => {
    if (data.type === 'radio') {
      onInput(item.value)
    } else {
      const valueType = typeof value
      if (valueType === 'string') {
        value = value.split(',')
      }
      value = [...value]
      if (value.includes(item.value)) {
        value.splice(value.indexOf(item.value), 1)
      } else {
        value.push(item.value)
      }
      onInput(valueType === 'string' ? value.join(',') : value)
    }
  }


  const Item = useMemo(() => renderItems[data.theme], [data.theme])

  if (!Item) {
    return null
  }

  return <View className={`form-select form-select--row form-select--${data.theme}`}>
    {
      list.map(item => <Item key={item.value} item={item} onInput={input} value={value} type={data.type} />)
    }
  </View>
}

const Picker = ({ attr, onInput, onClose, value }) => {

  const pullView = useRef(null)
  const [item, setItem] = useState(null)
  // 弹出框value不更新 使用本地value
  const [localValue, setLocalValue] = useState(value)

  const submit = () => {
    pullView.current.close()
    item && onInput(item)
  }
  return <PullView
    ref={pullView}
    style={{ backgroundColor: '#fff', padding: Taro.pxTransform(20) }}
    onClose={onClose}
  >
    <View className='form-select__pull__head'>
      <Text className='form-select__pull__head__title'>选择</Text>
    </View>
    <ScrollView scrollY className='form-select__pull__scroll'>
      <RenderOption
        data={attr}
        value={localValue}
        onInput={e => {
          if (attr.type === 'radio') {
            pullView.current.close()
            onInput(e)
          } else {
            setItem(e)
            setLocalValue(e.value)
          }
        }}
      />
    </ScrollView>
    {attr.type === 'checkbox' && <Button text='确定' onClick={submit} />}
  </PullView>
}

export const SelectForm = attr => {

  const { values, updateValue } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(attr.name, values), [attr.name, values])

  const pullKey = useRef(null)

  const input = useCallback(val => {
    if (attr._edit) {
      return
    }
    updateValue(attr.name, val)
  }, [attr.name, attr._edit, updateValue])

  const picker = useCallback(() => {
    if (attr._edit) {
      return
    }
    pullKey.current = TopView.add(<Picker attr={attr} value={value} onInput={input} onClose={() => TopView.remove(pullKey.current)} />)
  }, [attr, value, input])

  const isEmpty = attr.mode === 'picker' && attr.option.filter(item => isSelect(item, attr.type, value)).length === 0

  return attr.mode === 'picker' ?
    <View className='form-select__value'>
      <RenderOption data={attr} value={value} onlySelect onInput={picker} />
      {isEmpty && <Text
        className='form-select__value__select'
        onClick={picker}
      >点击选择</Text>}
    </View> :
    <RenderOption data={attr} value={value} onInput={input} />

}

SelectForm.designConfig = {
  defaultValue: item => {
    if (item.type === 'radio') {
      return item.option[0]?.value || ''
    } else {
      return []
    }
  },
  isForm: true
}

export default SelectForm
