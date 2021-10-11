import React, { useState, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './item.scss'

export default ({ name, children, renderMore }) => {

  const [unfold, setUnfold] = useState(false)

  const itemClick = useCallback(e => {
    if (e.path.slice(0, e.path.findIndex(item => item.classList.contains('attr-form-item'))).every(item => !item.classList.contains('item-child'))) {
      renderMore && setUnfold(!unfold)
    }
  }, [unfold, renderMore])

  return <>
    <View className='attr-form-item' onClick={itemClick}>
      <View className='left'>
        <View className={classNames('more', { hide: !renderMore, unfold })} />
        <Text className={classNames('name', { child: children })}>{name}</Text>
      </View>
      {children}
    </View>
    {unfold && <View className='attr-form-item-more'>
      {renderMore}
    </View>}
  </>
}
