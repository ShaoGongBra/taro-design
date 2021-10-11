

import React from 'react'
import { View, Text } from '@tarojs/components'
import './box.scss'

export default () => {

  return <View className='attr-form-box'>
    <View className='grid position'>
      <Text contenteditable className='value' onInput={e => console.log(e.target.innerText)}>-</Text>
      <Text contenteditable className='value'>-</Text>
      <View className='grid margin'>
        <Text contenteditable className='value'>-</Text>
        <Text contenteditable className='value'>-</Text>
        <View className='grid border'>
          <Text contenteditable className='value'>-</Text>
          <Text contenteditable className='value'>-</Text>
          <View className='grid padding'>
            <Text contenteditable className='value'>-</Text>
            <Text contenteditable className='value'>-</Text>
            <View className='size'>
              <Text contenteditable>-</Text>
              <Text>x</Text>
              <Text contenteditable>-</Text>
            </View>
            <Text contenteditable className='value'>-</Text>
            <Text contenteditable className='value'>-</Text>
            <Text className='tip'>内边距</Text>
          </View>
          <Text contenteditable className='value'>-</Text>
          <Text contenteditable className='value'>-</Text>
          <Text className='tip'>边框</Text>
        </View>
        <Text contenteditable className='value'>-</Text>
        <Text contenteditable className='value'>-</Text>
        <Text className='tip'>外边距</Text>
      </View>
      <Text contenteditable className='value'>-</Text>
      <Text contenteditable className='value'>-</Text>
      <Text className='tip'>定位</Text>
    </View>
  </View>
}
