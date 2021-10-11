import React, { useCallback, useMemo, useContext } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { recursionGetValue, upload, toast } from 'taro-tools'
import { Icon } from '../base'
import { FormContext } from './form'
import './upload.scss'

const Upload = ({ name, _edit, ...attr }) => {
  const { updateValue, values } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, values), [name, values]) || []

  const valueRes = useMemo(() => {
    if (typeof value === 'string') {
      // 处理base64图片
      const text = /;base64,/g
      const mark = ';base64;'
      const newVal = value.replace(text, mark)
      return !newVal ? [] : newVal.split(',').map(v => v.replace(mark, ';base64,'))
    }
    return value
  }, [value])

  const getValue = useCallback(val => {
    if (typeof value === 'string') {
      return val.join(',')
    }
    return val
  }, [value])

  const add = useCallback(() => {
    if (_edit) {
      return
    }
    if (valueRes.length >= attr.max) {
      return toast('最多上传' + attr.max)
    }
    if (attr.type === 'media') {
      upload(attr.max - valueRes.length, attr.mediaType).then(res => {
        console.log(res)
        valueRes.push(...res)
        updateValue(name, getValue(valueRes))
      })
    }
  }, [name, updateValue, valueRes, attr, _edit, getValue])

  const del = useCallback(index => {
    valueRes.splice(index, 1)
    updateValue(name, getValue(valueRes))
  }, [valueRes, name, updateValue, getValue])

  const icons = useMemo(() => ({
    'media-image': 'tupian1',
    'media-video': 'shipindefuben',
    'media-all': 'duomeitiwenjian',
    'file-': 'wenjianjia'
  }), [])
  const texts = useMemo(() => ({
    'media-image': '添加图片',
    'media-video': '添加视频',
    'media-all': '添加图片视频',
    'file-': '添加文件'
  }), [])

  const iconName = useMemo(() => (`${attr.type}-${attr.type === 'media' ? attr.mediaType : ''}`), [attr])

  return <View className='form-upload'>
    {
      valueRes.map((item, index) => <View key={item} className='form-upload__item'>
        <Image className='form-upload__item__image' src={item} />
        {!attr.disabled && <View className='form-upload__item__close'>
          <Icon
            name='guanbi2'
            size={30}
            color='#fff'
            onClick={() => del(index)}
          />
        </View>}
      </View>)
    }
    {!attr.disabled && <View activeOpacity={1} className='form-upload__add' onClick={add}>
      <Icon name={icons[iconName]} size={60} color='#AAAAAA' />
      <Text className='form-upload__add__text'>{texts[iconName]}</Text>
    </View>}
  </View>
}

Upload.designConfig = {
  defaultValue: () => [],
  isForm: true
}

export default Upload
