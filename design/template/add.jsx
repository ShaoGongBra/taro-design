import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Input } from '@tarojs/components'
import classNames from 'classnames'
import { toast, request } from 'taro-tools'
import { Icon, ScrollView, Loading, Button } from '../../component'
import './add.scss'

export default ({ onClose, nodes }) => {


  const [load, setLoad] = useState(false)
  const [loadSubmit, setLoadSubmit] = useState(false)

  const [id, setId] = useState('')
  const [name, setName] = useState('')

  const [editId, setEditId] = useState('')
  const [editName, setEditName] = useState('')

  const [list, setList] = useState([])

  useEffect(() => {
    setLoad(true)
    request({
      url: 'designService/project/list'
    }).then(res => {
      setList(res.list)
    }).finally(() => {
      setLoad(false)
    })
  }, [])

  const editProjectName = useCallback(() => {
    setEditId('')
    if (!editName) {
      return
    }
    request({
      url: 'designService/project/save',
      method: 'POST',
      data: {
        id: editId,
        name: editName
      }
    }).then(() => request({
      url: 'designService/project/list'
    })).then(res => {
      setList(res.list)
    }).catch(err => {
      toast(err.message)
    })
  }, [editId, editName])

  const submit = useCallback(() => {
    if (loadSubmit) {
      return
    }
    setLoadSubmit(true)
    request({
      url: 'designService/template/save',
      method: 'POST',
      data: {
        content: JSON.stringify(nodes),
        name,
        project: id
      }
    }).then(() => {
      onClose()
    }).finally(() => {
      setLoadSubmit(false)
    })
  }, [nodes, name, id, loadSubmit, onClose])

  return <View className='temp-add'>
    <View className='main'>
      <View className='head'>
        <Text className='title'>添加至模板</Text>
        <Icon name='guanbi2' color='#666' size={24} onClick={onClose} />
      </View>
      <ScrollView>
        {load && <View className='load'>
          <Loading size={36} />
        </View>}
        {
          list.map(item => <View key={item.id} className={classNames('item', { select: item.id === id && editId !== item.id })} onClick={() => setId(item.id)}>
            {editId === item.id ?
              <Input className='input' value={item.project_name} autoFocus focus onInput={e => setEditName(e.detail.value)} onBlur={editProjectName} /> :
              <Text className='name'>{item.project_name || '未知项目'}</Text>
            }
            {editId !== item.id && <View className='icon'
              onClick={() => {
                setEditId(item.id)
                setEditName('')
              }}
            >
              <Icon name='shezhi1' size={24} color='#999' />
            </View>}
          </View>)

        }
        {!load && <View className='item'>
          <Input
            placeholder='新建项目'
            onFocus={() => {
              setEditName('')
              setEditId('')
            }}
            className='input'
            onInput={e => setEditName(e.detail.value)}
            onBlur={editProjectName}
          />
        </View>}
      </ScrollView>
      <View className='btn'>
        <Input className='name' placeholder='模板名称' onInput={e => setName(e.detail.value)} />
        <Button text='确定' loading={loadSubmit} disabled={!setId || !name} size='s' radiusType='fillet-min' onClick={submit} />
      </View>
    </View>
  </View>
}
