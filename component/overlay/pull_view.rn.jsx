import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { findNodeHandle, UIManager, Animated, StyleSheet } from 'react-native'
import './pull_view.scss'

export default class PullView extends Component {

  constructor(...props) {
    super(...props)
    if (process.env.TARO_ENV === 'rn') {
      this.state.animationRoot = new Animated.Value(0)
      this.state.styleRn = StyleSheet.create({
        position: {},
        other: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'transparent'
        },
      })
    }
  }

  state = {
    animationMain: null,
    animationRoot: null,
    position: {},
    positionOther: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    styleRn: null
  }

  componentDidMount() {
    const { side = 'bottom', overlayOpacity = 0.5 } = this.props
    const position = {}
    const { positionOther } = this.state
    if (process.env.TARO_ENV === 'rn') {
      // RN端动画
      setTimeout(() => {
        const handle = findNodeHandle(this.anRef)
        UIManager.measureInWindow(handle, (x, y, width, height) => {
          const { animationRoot } = this.state
          switch (side) {
            case 'left':
              position.top = 0
              position.bottom = 0
              positionOther.left = width
              break
            case 'right':
              position.top = 0
              position.bottom = 0
              positionOther.right = width
              break
            case 'top':
              position.left = 0
              position.right = 0
              positionOther.top = height
              break
            case 'bottom':
              position.left = 0
              position.right = 0
              positionOther.bottom = height
              break
          }

          this.setState({
            styleRn: StyleSheet.create({
              position,
              other: positionOther
            })
          })
          Animated.timing(
            animationRoot,
            {
              toValue: 1,
              duration: this.animatedTime,
              useNativeDriver: false
            }
          ).start()
        })
      }, 100)
    } else {
      // 小程序和h5动画
      this.animated = Taro.createAnimation({
        transformOrigin: "50% 50%",
        duration: this.animatedTime,
        timingFunction: "ease-out",
        delay: 0
      })
      this.query = Taro.createSelectorQuery().in(process.env.TARO_ENV === 'h5' ? this : this.$scope)
      this.query.select('.pull-view__main').boundingClientRect(res => {
        switch (side) {
          case 'left':
            position.top = 0
            position.bottom = 0
            positionOther.left = res.width + "px"
            break
          case 'right':
            position.top = 0
            position.bottom = 0
            positionOther.right = res.width + "px"
            break
          case 'top':
            position.left = 0
            position.right = 0
            positionOther.top = res.height + "px"
            break
          case 'bottom':
            position.left = 0
            position.right = 0
            positionOther.bottom = res.height + "px"
            break
        }
        this.setState({
          position,
          positionOther
        }, () => {
          this.setState({
            animationMain: this.animated[side](0).opacity(1).step().export(),
            animationRoot: this.animated.backgroundColor(`rgba(0, 0, 0, ${overlayOpacity})`).step().export()
          })
        })
      }).exec()
    }
  }

  static options = {
    // 组件使用全局样式
    addGlobalClass: true
  }

  // 动画时间
  animatedTime = 200

  overlayCilck() {
    const { modal } = this.props
    if (modal) return
    this.close()
  }

  close() {
    const { side = 'bottom' } = this.props
    if (process.env.TARO_ENV === 'rn') {
      const { animationRoot } = this.state
      Animated.timing(
        animationRoot,
        {
          toValue: 0,
          duration: this.animatedTime,
          useNativeDriver: false
        }
      ).start()
    } else {
      this.setState({
        animationMain: this.animated[side](-200).opacity(0).step().export(),
        animationRoot: this.animated.backgroundColor(`rgba(0,0,0,0)`).step().export()
      })
    }
    setTimeout(() => this.props.onClose && this.props.onClose(), this.animatedTime)
  }

  render() {
    const { animationRoot, animationMain, position, positionOther, styleRn } = this.state
    const { side = 'bottom', style = {}, overlayOpacity = 0.5 } = this.props
    return process.env.TARO_ENV === 'rn' ?
      <Animated.View
        className='pull-view'
        style={{
          backgroundColor: animationRoot.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', `rgba(0, 0, 0, ${overlayOpacity})`]
          })
        }}
      >
        <Animated.View
          ref={ref => this.anRef = ref}
          className='pull-view__main'
          style={{
            ...styleRn.position,
            ...style,
            ...{
              opacity: animationRoot.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              }),
              [side]: animationRoot.interpolate({
                inputRange: [0, 1],
                outputRange: [-200, 0]
              })
            }
          }}
        >
          {this.props.children}
        </Animated.View>
        <View className='app-touch pull-view__other' style={styleRn.other} onClick={this.overlayCilck.bind(this)}></View>
      </Animated.View>
      : <View className='pull-view' animation={animationRoot}>
        <View
          className={`pull-view__main pull-view__main--${side}`}
          style={{ ...position, ...style }}
          animation={animationMain}
        >
          {this.props.children}
        </View>
        <View className='app-touch pull-view__other' style={{ ...positionOther }} onClick={this.overlayCilck.bind(this)}></View>
      </View>
  }
}
