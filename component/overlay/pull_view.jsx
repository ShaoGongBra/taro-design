import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './pull_view.scss'

export default class PullView extends Component {

  state = {
    positionOther: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  }

  componentDidMount() {
    const { side = 'bottom' } = this.props
    const { positionOther } = this.state
    // 小程序和h5动画
    setTimeout(() => {
      Taro.createSelectorQuery().select('.pull-view__main').boundingClientRect(res => {
        switch (side) {
          case 'left':
          case 'right':
            positionOther[side] = res.width + "px"
            break
          case 'top':
          case 'bottom':
            positionOther[side] = res.height + "px"
            break
        }
        this.setState({
          positionOther,
          show: true
        })
      }).exec()
    }, 100)
  }

  static options = {
    // 组件使用全局样式
    addGlobalClass: true
  }

  overlayCilck() {
    const { modal } = this.props
    if (modal) return
    this.close()
  }

  close() {
    this.setState({
      show: false
    })
    setTimeout(() => this.props.onClose && this.props.onClose(), 200)
  }

  render() {
    const { positionOther, show } = this.state
    const { side = 'bottom', style = {}, overlayOpacity = 0.5, children } = this.props
    return <View
      className='pull-view'
      style={{ backgroundColor: show ? `rgba(0, 0, 0, ${overlayOpacity})` : 'rgba(0, 0, 0, 0)' }}
      onClick={e => e.stopPropagation && e.stopPropagation()}
    >
      <View
        className={`pull-view__main pull-view__main--${side}${show ? ' pull-view__main--show' : ''}`}
        style={style}
      >
        {children}
      </View>
      <View className='pull-view__other' style={{ ...positionOther }} onClick={this.overlayCilck.bind(this)}></View>
    </View>
  }
}
