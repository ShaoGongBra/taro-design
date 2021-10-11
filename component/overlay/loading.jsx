import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { event, currentPage, asyncTimeOut } from 'taro-tools'
import { Loading } from '../base'
import './loading.scss'

const defaultConfig = {
  title: '请稍后', // 展示标题
  mask: true, // 是否遮住页面
  showTime: null, // 默认展示时间 null不自动关闭
}

export default class Alert extends Component {

  /**
   * 显示加载动画
   * @param {object} config 参数
   * @returns
   */
  static show(config = defaultConfig) {
    if (typeof config === 'string') {
      config = { title: config }
    }
    const path = currentPage()
    event.emit(path + '-toast-hide')
    event.emit(path + '-loading-show', { ...defaultConfig, ...config })
  }

  static hide() {
    const path = currentPage()
    event.emit(path + '-loading-hide')
  }

  constructor(props) {
    super(props)
    const path = currentPage()
    this.showName = path + '-loading-show'
    this.hideName = path + '-loading-hide'

    event.add(this.showName, this.show)
    event.add(this.hideName, this.hide)
  }

  state = {
    show: false,
    title: '请稍后', // 展示标题
    mask: true, // 遮罩
  }

  componentWillUnmount() {
    event.remove(this.showName, this.show)
    event.remove(this.hideName, this.hide)
    this.clean()
  }

  show = config => {
    this.setState({
      title: config.title,
      mask: config.mask,
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

  renderMain() {
    const { title } = this.state
    return <View className='overlay-loading__main'>
      <Loading size={64} color='blank' />
      {!!title && <Text className='overlay-loading__text'>{title}</Text>}
    </View>
  }

  render() {
    const { show, mask } = this.state
    return show
      ? (mask
        ? <View className='overlay-loading'>
          {this.renderMain()}
        </View>
        : this.renderMain())
      : null
  }

}
