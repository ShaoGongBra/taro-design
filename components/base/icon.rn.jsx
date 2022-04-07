import Taro from '@tarojs/taro'
import { Text } from 'react-native'
import { styles } from '../../render'
import { icons } from '../../render/util/icon'
import './icon.scss'

export default ({ font = 'icon', name, style, color, size = 32, onClick }) => {
  if (typeof name === 'object') {
    font = name[0]
    name = name[1]
  }
  if (!icons[font]) {
    console.log(font + ' 图标库未定义')
    return null
  }
  if (!icons[font].list?.[name]) {
    console.log(font + ' 图标库下的 ' + name + ' 图标未定义')
    return null
  }

  return <Text
    onPress={onClick}
    style={styles({ color, fontSize: Taro.pxTransform(size) }, style, { fontFamily: font })}
  >{String.fromCharCode(icons[font].list[name])}</Text>
}


