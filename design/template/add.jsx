import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Input } from '@tarojs/components'
import classNames from 'classnames'
import { toast, event, noop } from 'taro-tools'
import { Icon, ScrollView, Loading, Button, Modal } from '../../component'
import { request } from './utils/request'
import { openMenu } from '../util/util'
import { getNodesNames } from '../util/node'
import './add.scss'

const Add = ({ setShow, nodes }) => {

  const [load, setLoad] = useState(false)
  const [loadSubmit, setLoadSubmit] = useState(false)

  const [id, setId] = useState('')
  const [name, setName] = useState('')

  const [editId, setEditId] = useState('')
  const [editName, setEditName] = useState('')

  const [list, setList] = useState([])

  useEffect(() => {
    request({
      url: 'designservice/Project/userList'
    }).then(res => {
      setList(res.list)
    }).finally(() => {
      setLoad(false)
    })
  }, [])

  const close = useCallback(() => {
    setShow(false)
    event.emit('template-add-callback', false)
  }, [setShow])

  const editProjectName = useCallback(() => {
    setEditId('')
    if (!editName) {
      return
    }
    request({
      url: 'designservice/project/save',
      method: 'POST',
      data: {
        id: editId,
        name: editName
      }
    }).then(() => request({
      url: 'designservice/project/userList'
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
    const nodesList = Array.isArray(nodes) ? nodes : [nodes]
    request({
      url: 'designservice/Template/save',
      method: 'POST',
      data: {
        content: JSON.stringify(nodesList),
        name,
        project: id,
        components: getNodesNames(nodesList).toString()
      }
    }).then(() => {
      setShow(false)
      event.emit('template-add-callback', true)
    }).catch(err => {
      toast(err.message)
    }).finally(() => {
      setLoadSubmit(false)
    })
  }, [name, id, loadSubmit, setShow, nodes])

  return <View className='temp-add'>
    <View className='head'>
      <Text className='title'>添加至模板</Text>
      <Icon name='guanbi2' color='#666' size={24} onClick={close} />
    </View>
    <ScrollView>
      {load && <View className='load'>
        <Loading size={36} />
      </View>}
      {
        list.map(item => <View key={item.id} className={classNames('item', { select: item.id === id && editId !== item.id })} onClick={() => setId(item.id)}>
          {editId === item.id ?
            <Input className='input' value={item.name} autoFocus focus onInput={e => setEditName(e.detail.value)} onBlur={editProjectName} /> :
            <Text className='name'>{item.name || '未知项目'}{item.public === 1 && <Text className='public'>公开</Text>}</Text>
          }
          {editId !== item.id && <View className='icon'
            onClick={e => {
              const menu = [
                {
                  text: '修改名称',
                  value: () => {
                    setEditId(item.id)
                    setEditName('')
                  }
                },
                {
                  text: '设置为' + (item.public ? '私人项目' : '公开项目'),
                  value: () => {
                    request({
                      url: 'designservice/Project/setPublic',
                      method: 'POST',
                      data: {
                        id: item.id
                      }
                    }).then(() => {
                      item.public = item.public ? 0 : 1
                      setList([...list])
                    }).catch(err => toast(err.message))
                  }
                }
              ]
              openMenu({ list: menu, event: e }).then(res => {
                res.item.value()
              }).catch(noop)
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
}

export default () => {

  const [show, setShow] = useState(false)
  const [nodes, setNodes] = useState([])

  const close = useCallback(() => {
    setShow(false)
    event.emit('template-add-callback', false)
  }, [])

  useEffect(() => {
    const callback = data => {
      setNodes(data)
      setShow(true)
    }
    event.add('template-add-show', callback)
    return () => {
      event.remove('template-add-show', callback)
    }
  }, [setShow])

  return <Modal show={show} onClose={close}>
    <Add setShow={setShow} nodes={nodes} />
  </Modal>
}
