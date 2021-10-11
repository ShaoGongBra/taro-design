import React from 'react'
import { View } from '@tarojs/components'
import { filterProps } from '../../render'
import './view.scss'

export default props => {

  return <View {...filterProps(props)}>
    {props.children}
  </View>
}
