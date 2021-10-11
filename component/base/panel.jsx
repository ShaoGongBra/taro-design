import React, { useEffect, useState } from 'react'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { Icon } from '../../base'
import './panel.scss'

export default ({ children, title, open, className, style }) => {

  const [show, changeShow] = useState(true)

  useEffect(() => {
    changeShow(open)
  }, [open])

  return <View
    className={classNames(className, 'form-panel')}
    style={style}
  >
    <View
      className='form-panel__head'
      onClick={e => {
        e.stopPropagation && e.stopPropagation()
        changeShow(!show)
      }}
    >
      <Text className='form-panel__head__title'>{title}</Text>
      <Icon name={show ? 'shang2' : 'xia4'} />
    </View>
    {show && children}
  </View>
}
