import React, { useEffect, useState, useCallback, useContext, useMemo, useRef } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { useDrag } from 'react-dnd'
import { noop, stopPropagation } from 'taro-tools'
import { searchQuick } from './utils/request'
import { Icon, ScrollView } from '../../component'
import { Create, componentList } from '../../render'
import Context from '../util/context'
import EditTypes from '../util/editTypes'
import { isLogin, userInfo, login, loginOut } from './utils/user'
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

  const unInstallList = useMemo(() => {
    const list = []
    item.components.forEach(name => {
      if (!componentList[name]) {
        list.push(name)
      }
    })
    return list
  }, [item.components])

  return <View ref={drag} className='item'>
    <Context.Provider value={{ config: {} }}>
      <Create nodes={item.content} />
    </Context.Provider>
    <View className='title'>
      <Text className='name'>{item.name}</Text>
      <Text className='cate' onClick={click}>{item.project_name}</Text>
    </View>
    {unInstallList.length > 0 && <Text className='uninstall'>此模板中的 {unInstallList.join(' ')} 组件在你的项目未注册</Text>}
  </View>

}

const List = ({ srarchKey }) => {
  const [keyword, setKeyword] = useState('')

  const [page, setPage] = useState(1)

  const [list, setList] = useState([])

  const listRef = useRef([])

  useEffect(() => {
    setKeyword(srarchKey)
  }, [srarchKey])

  useEffect(() => {
    searchQuick({
      url: 'designservice/Template/list',
      method: 'POST',
      data: {
        keyword,
        page
      }
    }).then(res => {
      const listRes = res.list.map(item => {
        item.content = JSON.parse(item.content)
        if (!(item.content instanceof Array)) {
          item.content = [item.content]
        }
        item.components = item.components.split(',')
        return item
      })
      listRef.current = page === 1 ? listRes : [...listRef.current, ...listRes]
      setList(listRef.current)
    }).catch(() => {

    }).finally(() => {

    })
  }, [keyword, page])

  const search = useCallback(e => {
    setPage(1)
    setKeyword(e.detail.value)
  }, [])

  const cateSearch = useCallback(e => {
    setKeyword(`project:${e.project_id}`)
  }, [])

  return <View className='temp-list'>
    <View className='search'>
      <Icon name='sousuo2' />
      <Input value={keyword} placeholder='模板搜索' onInput={search} />
    </View>
    <ScrollView
      onScrollToLower={() => setPage(page + 1)}
    >
      {
        list.map(item => <Item key={item.id} item={item} onCateSearch={cateSearch} />)
      }
    </ScrollView>
  </View>
}

const Project = ({ setTempKeyword, setHover }) => {

  const [list, setList] = useState([])

  const [page, setPage] = useState(1)

  const [keyword, setKeyword] = useState('')

  const listRef = useRef([])

  useEffect(() => {
    searchQuick({
      url: 'designservice/Project/list',
      method: 'POST',
      data: {
        keyword,
        page
      }
    }).then(res => {
      listRef.current = page === 1 ? res.list : [...listRef.current, ...res.list]
      setList(listRef.current)
    }).catch(() => {

    }).finally(() => {

    })
  }, [keyword, page])

  const search = useCallback(e => {
    setKeyword(e.detail.value)
  }, [])

  const userSearch = useCallback((id, e) => {
    stopPropagation(e)
    setKeyword(`user:${id}`)
  }, [])

  return <View className='temp-list-project'>
    <View className='search'>
      <Icon name='sousuo2' />
      <Input value={keyword} placeholder='项目搜索' onInput={search} />
    </View>
    {
      list.map(item => <View
        key={item.id}
        className='temp-list-project__item'
        onClick={() => {
          setTempKeyword('project:' + item.id)
          setHover(0)
        }}
      >
        <Text className='temp-list-project__item__name'>{item.name} <Text className='temp-list-project__item__count'>{item.count}</Text></Text>
        <View className='temp-list-project__item__bottom'>
          <View className='temp-list-project__item__tips'>
            {item.public === 1 && <Text className='temp-list-project__item__public'>公开</Text>}
            {item.self && <Text className='temp-list-project__item__public'>我的</Text>}
          </View>
          <Text className='temp-list-project__item__user' onClick={userSearch.bind(null, item.user_id)}>
            {item.username}
            <Icon name='you2' size={24} color='#999' />
          </Text>
        </View>
      </View>)
    }
  </View>
}

const Nav = ({ children, select, onSelect, onReload }) => {
  const [hover, setHover] = useState(0)

  const nav = useMemo(() => ['模板', '项目'], [])

  const [init, setInit] = useState([0])

  const nvTo = useCallback((index) => {
    if (!init.includes(index)) {
      init.push(index)
      setInit([...init])
    }
    setHover(index)
    onSelect?.(index)
  }, [init, onSelect])

  useEffect(() => {
    setHover(select)
  }, [select])

  const toLogin = useCallback(() => {
    login().then(onReload).catch(noop)
  }, [onReload])

  const toOut = useCallback(() => {
    loginOut()
    onReload()
  }, [onReload])

  const user = userInfo.get()
  const loginStatus = isLogin()

  return <>
    <View className='temp-list-nav'>
      {
        nav.map((item, index) => <Text key={item} onClick={nvTo.bind(null, index)} className='temp-list-nav__item'>{item}</Text>)
      }
      <View
        className='temp-list-nav__line'
        style={{
          width: (1 / nav.length * 100) + '%',
          transform: `translate3d(${hover * 100}% , 0, 0)`
        }}
      />
    </View>
    <View className='temp-list-nav-main'>
      {
        children.map((item, index) => <View className='temp-list-nav-main__item' style={hover === index ? { zIndex: 1 } : {}} key={index + ''}>
          {init.includes(index) && item}
        </View>)
      }
    </View>
    <View className='temp-list-user'>
      {!loginStatus && <Text className='temp-list-user__tip'><Text className='temp-list-user__tip__login' onClick={toLogin}>登录</Text>后可查看自己的模板和项目</Text>}
      {loginStatus && <Text className='temp-list-user__name'>{user.username}</Text>}
      {loginStatus && <Text className='temp-list-user__out' onClick={toOut}>退出</Text>}
    </View>
  </>
}

export default ({ show }) => {

  const [reload, setReload] = useState(false)

  const [hover, setHover] = useState(0)

  const [tempKeyword, setTempKeyword] = useState('')

  const toReload = useCallback(() => {
    setReload(true)
  }, [])

  useEffect(() => {
    if (reload) {
      setReload(false)
    }
  }, [reload])

  return !reload && show
    ? <Nav select={hover} onSelect={index => setHover(index)} onReload={toReload}>
      <List srarchKey={tempKeyword} />
      <Project setTempKeyword={setTempKeyword} setHover={setHover} />
    </Nav>
    : null
}
