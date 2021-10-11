import React from 'react'
import { View } from '@tarojs/components'
import Group from './common/group'
import Input from './common/input'
import Item from './common/item'
import { styleGroup } from '../util/styled'
import { styled, styleConfig, styleType } from '../../render'
import './style.scss'

const StyleItem = ({ name, renderMore }) => {

  const item = styleConfig[name[1]]
  if (!item) {
    console.log('不支持编辑的样式:' + name[1])
    return null
  }
  const commonProsp = {
    text: item.text,
    name
  }
  if (item.type === styleType.enum) {
    return <Item name={item.text} renderMore={renderMore}>
      <Input {...commonProsp} type='select' option={item.values} disableInput />
    </Item>
  } else if (item.type === styleType.color) {
    return <Item name={item.text} renderMore={renderMore}>
      <Input {...commonProsp} type='color' option={item.values} />
    </Item>
  } else {
    let option = null
    if (item.valueClassData && item.valueClassData instanceof Array) {
      option = item.valueClassData
    } else if (item.valueClassData && item.valueClassData instanceof Object) {
      option = Object.keys(item.valueClassData)
    }
    return <Item name={item.text} renderMore={renderMore}>
      <Input {...commonProsp} option={option} />
    </Item>
  }
}


export default ({ styles = [], name = 'style' }) => {

  return <View className='attr-form-style'>
    {/* <View className='group'>
      <Box />
    </View> */}
    {
      styleGroup.map(group => {
        const list = group.styles.filter(v => {
          if (typeof v === 'string') {
            return styles.includes(v)
          } else if (styled.isStyleName(v[0])) {
            return styles.includes(v[0])
          } else {
            return v.slice(1).some(i => styles.includes(i))
          }
        }).map(v => {
          if (typeof v === 'object' && !styled.isStyleName(v[0])) {
            return v.filter((i, index) => index === 0 || styles.includes(i))
          }
          return v
        })

        if (!list.length) {
          return null
        }

        return <Group key={group.name} name={group.name}>
          {
            list.map(item => {
              if (typeof item === 'string') {
                return <StyleItem key={item} name={[name, item]} />
              } else {
                if (styled.isStyleName(item[0])) {
                  return <StyleItem
                    key={item[0]}
                    name={[name, item[0]]}
                    renderMore={item.slice(1).map(more => <StyleItem key={more} name={[name, more]} />)}
                  />
                } else {
                  return <Item
                    key={item[0]}
                    name={item[0]}
                    renderMore={item.slice(1).map(more => <StyleItem key={more} name={[name, more]} />)}
                  />
                }
              }
            })
          }
        </Group>
      })
    }
  </View>
}
