import React, { useEffect, useState, useCallback, useContext } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { useDrag } from 'react-dnd'
import { searchQuick } from 'taro-tools'
import { Icon } from '../../component'
import { Create } from '../../render'
import Context from '../util/context'
import EditTypes from '../util/editTypes'
import './list.scss'

const Item = ({ item, onCateSearch }) => {

  const { selectNode } = useContext(Context)

  const [, drag] = useDrag({
    type: EditTypes.TEMPLATE_ADD,
    item: () => {
      selectNode()
      return { template: item.content }
    }
  })

  const click = useCallback(() => {
    onCateSearch(item)
  }, [onCateSearch, item])

  return <View ref={drag} className='item'>
    <Context.Provider value={{ config: {} }}>
      <Create form={item.content} values={{}} />
    </Context.Provider>
    <View className='title'>
      <Text className='name'>{item.name}</Text>
      <Text className='cate' onClick={click}>{item.project_name}</Text>
    </View>
  </View>

}

export default ({ show }) => {

  const [keyword, setKeyword] = useState('')


  const [list, setList] = useState([])

  useEffect(() => {
    searchQuick({
      url: 'designService/template/list',
      data: {
        keyword
      }
    }).then(res => {
      setList(res.list.map(item => {
        item.content = JSON.parse(item.content)
        if (!(item.content instanceof Array)) {
          item.content = [item.content]
        }
        return item
      }))
    }).catch(() => {

    }).finally(() => {

    })
  }, [keyword])

  const search = useCallback(e => {
    setKeyword(e.detail.value)
  }, [])

  const cateSearch = useCallback(e => {
    setKeyword(`project:${e.project_id}`)
  }, [])

  return show
    ? <View className='temp-list'>
      <View className='search'>
        <Icon name='sousuo2' />
        <Input value={keyword} placeholder='模板搜索' onInput={search} />
      </View>
      {
        list.map(item => <Item key={item.id} item={item} onCateSearch={cateSearch} />)
      }
    </View>
    : null
}
