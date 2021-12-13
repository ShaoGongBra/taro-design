import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import { Icon } from '../../components'
import Node from './node'
import AttrForm from './AttrForm'
import './attr.scss'

const AttrItem = ({ name, status, children }) => {

  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(status)
  }, [status])

  return <View className={classNames('attr-item', { show })}>
    <View className='head' onClick={() => setShow(!show)}>
      <View className={classNames('icon', { show })}>
        <Icon name='you2' size={28} color='#333' />
      </View>
      <Text className='name'>{name}</Text>
    </View>
    {show && children}
  </View>
}

export default ({
  formRef
}) => {
  return <View className='attr-edit'>
    <AttrItem name='节点管理' status>
      <Node />
    </AttrItem>
    <AttrItem name='节点属性' status>
      <AttrForm formRef={formRef} />
    </AttrItem>
  </View>
}
