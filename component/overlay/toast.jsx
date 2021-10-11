import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { event, currentPage, asyncTimeOut } from 'taro-tools'
import { Icon } from '../base'
import './toast.scss'

const defaultConfig = {
  content: '', // 展示内容
  icon: null, // 展示图标
  iconColor: '#fff', // 图标颜色
  showTime: 2000, // 默认展示时间 2000ms
}

export default class Toast extends Component {

  /**
   * 显示提示
   * @param {object} config 参数
   * @returns
   */
  static show(config = defaultConfig) {
    const path = currentPage()
    if (typeof config === 'string') {
      config = { content: config }
    }
    event.emit(path + '-loading-hide')
    event.emit(path + '-toast-show', { ...defaultConfig, ...config })
  }

  /**
   * 隐藏提示
   */
  static hide() {
    const path = currentPage()
    event.emit(path + '-toast-hide')
  }

  /**
   * 显示成功提示
   * @param {string} content 提示内容
   */
  static success(content = '成功') {
    this.show({
      content,
      icon: 'xuanzhongduihao'
    })
  }

  /**
   * 显示错误提示
   * @param {string} content 提示内容
   */
  static error(content = '错误') {
    this.show({
      content,
      icon: 'shanchu4',
      iconColor: 'red'
    })
  }

  constructor(props) {
    super(props)
    const path = currentPage()
    this.showName = path + '-toast-show'
    this.hideName = path + '-toast-hide'

    event.add(this.showName, this.show)
    event.add(this.hideName, this.hide)
  }

  state = {
    show: false,
    icon: null,
    iconColor: '#fff',
    content: '', // 展示内容
  }

  componentWillUnmount() {
    event.remove(this.showName, this.show)
    event.remove(this.hideName, this.hide)
    this.clean()
  }

  show = config => {
    this.setState({
      ...defaultConfig,
      ...config,
      show: true
    })
    this.clean()
    if (typeof config.showTime === 'number') {
      const time = config.showTime | 0
      this.timer = asyncTimeOut(time)
      this.timer.then(() => {
        this.setState({
          show: false
        })
      }).catch(() => { })
    }

  }

  hide = () => {
    this.setState({
      show: false
    })
  }

  clean() {
    if (this.timer) {
      this.timer.clear()
      this.timer = null
    }
  }

  render() {
    const { show, content, icon, iconColor } = this.state
    return show
      ? <View className='overlay-toast'>
        {!!icon && <Icon name={icon} size={96} color={iconColor} style={{ marginBottom: Taro.pxTransform(20) }} />}
        <Text className='overlay-toast__content'>{content}</Text>
      </View>
      : null
  }

}
