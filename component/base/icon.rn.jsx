import React from 'react'
import Taro from '@tarojs/taro'
import { Text } from 'react-native'
import icon from '../../static/fonts/icon'
import './icon.scss'

const icons = { icon }

export default ({ font = 'icon', name, style, color, size = 32, onClick }) => {
  if (typeof name === 'object') {
    font = name[0]
    name = name[1]
  }
  if (!icons[font]) {
    console.warn(font + ' 图标库未定义')
    return null
  }
  if (!icons[font].list?.[name]) {
    console.warn(font + ' 图标库下的 ' + name + ' 图标未定义')
    return null
  }

  return <Text
    onPress={onClick}
    style={[{ color, fontSize: Taro.pxTransform(size) }, style, { fontFamily: font }]}
  >{String.fromCharCode(icons[font][name])}</Text>
}


