import React, { useContext } from 'react'
import { View, Text } from '@tarojs/components'
import { useDrop } from 'react-dnd'
import EditTypes from '../util/editTypes'
import { Icon } from '../../component'
import Context from '../util/context'

import './del.scss'

export default () => {

  const { moveNode } = useContext(Context)

  /**
   * 放开到删除
   */
  const [{ deleteShow, deleteOver }, dropDelete] = useDrop({
    accept: [EditTypes.FORM_MOVE, EditTypes.FORM_MOVE_NODE],
    drop(item) {
      moveNode(item.position)
    },
    collect: monitor => ({
      deleteShow: monitor.canDrop(),
      deleteOver: monitor.isOver()
    })
  })


  return <View className={`delete${deleteShow ? ' delete-show' : ''}${deleteOver ? ' delete-over' : ''}`} ref={dropDelete}>
    <View className='info'>
      <Icon name='shanchu3' size={52} color={deleteOver ? '#e2e2e2' : '#202020'} style={{ transition: 'color 0.1s' }} />
      <Text className='text'>{deleteOver ? '放开删除' : '拖到这里删除'}</Text>
    </View>
  </View>
}
