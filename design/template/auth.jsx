import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { event, toast } from 'taro-tools'
import { Icon, Modal, Button } from '../../components'
import { request } from './utils/request'
import { userInfo } from './utils/user'
import './auth.scss'

const Login = ({ onLogin }) => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const [load, setLoad] = useState(false)

  const login = useCallback(() => {
    setLoad(true)
    request({
      url: 'User/login',
      method: 'POST',
      data: {
        account,
        password
      },
      toastError: true
    }).then(res => {
      userInfo.set(res.userinfo)
      event.emit('template-auth-callback', true)
      onLogin()
    }).catch(err => {
      toast(err.message)
    }).finally(() => {
      setLoad(false)
    })
  }, [account, password, onLogin])

  return <View className='template-auth__login'>
    <Input className='template-auth__login__input' placeholder='用户名' onInput={e => setAccount(e.detail.value)} />
    <Input className='template-auth__login__input' placeholder='密码' onInput={e => setPassword(e.detail.value)} password />
    <Button text='登录' size='s' loading={load} disabled={!account || !password} onClick={login} />
    <Text className='template-auth__login__reg'>去注册</Text>
  </View>
}

export default () => {
  const [show, setShow] = useState(false)

  const close = useCallback(() => {
    setShow(false)
    event.emit('template-auth-callback', false)
  }, [])

  useEffect(() => {
    const func = () => setShow(true)
    event.add('template-auth-show', func)
    return () => {
      event.remove('template-auth-show', func)
    }
  }, [])

  return <Modal show={show} onClose={close}>
    <View className='template-auth'>
      <View className='template-auth__head'>
        <Text className='template-auth__head__title'>登录</Text>
        <Icon name='cuo' size={46} onClick={close} />
      </View>
      <Login onLogin={close} />
    </View>
  </Modal>
}
