import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './group.scss'

export default ({ name, children }) => {

  const [unfold, setUnfold] = useState(true)

  return <View className='attr-form-group'>
    <View className='nav'>
      <View className={classNames('more', { unfold })} onClick={() => setUnfold(!unfold)} />
      <Text className='text'>{name}</Text>
    </View>
    {unfold && children}
  </View>
}
