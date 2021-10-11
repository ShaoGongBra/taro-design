import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { currentPage, event } from 'taro-tools'
import './alert.scss'

const defaultConfig = {
  title: '提示',
  content: '',
  cancelText: '取消',
  confirmText: '确定',
  showCancel: true
}

export default class Alert extends Component {

  /**
   * 显示一个弹窗
   * @param {object} config 参数
   * @returns
   */
  static alert(config = defaultConfig) {
    const path = currentPage()
    event.emit(path + '-alert', config)
    return new Promise((resolve, reject) => {
      const callback = status => {
        event.remove(callback)
        typeof status === 'boolean' ? resolve(status) : reject({ message: 'alert异常关闭，可能是因为你关闭了页面' })
      }
      event.add(path + '-alert-callback', callback)
    })
  }

  constructor(props) {
    super(props)
    const path = currentPage()
    this.eventName = path + '-alert'
    this.eventCallbackName = path + '-alert-callback'

    event.add(this.eventName, this.show)
  }

  state = {
    show: false,
    ...defaultConfig
  }

  componentWillUnmount() {
    event.remove(this.eventName, this.show)
    event.emit(this.eventCallbackName)
  }

  show = config => {
    this.setState({
      ...defaultConfig,
      ...config,
      show: true
    })
  }

  cancel() {
    this.setState({
      show: false
    })
    event.emit(this.eventCallbackName, false)
  }

  confirm() {
    this.setState({
      show: false
    })
    event.emit(this.eventCallbackName, true)
  }

  render() {
    const { show, title, content, cancelText, confirmText, showCancel } = this.state
    return show
      ? <View className='overlay-alert'>
        <View className='overlay-alert__main'>
          <Text className='overlay-alert__title'>{title}</Text>
          <Text className='overlay-alert__content'>{content}</Text>
          <View className='overlay-alert__btns'>
            {showCancel && <Text className='overlay-alert__cancel' onClick={this.cancel.bind(this)}>{cancelText}</Text>}
            <Text className='overlay-alert__confirm' onClick={this.confirm.bind(this)}>{confirmText}</Text>
          </View>
        </View>
      </View>
      : null
  }

}
