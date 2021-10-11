import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Animated, Easing, StyleSheet } from 'react-native'

export default class Loading extends Component {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(1)
  }

  state = {
    lines: [],
    width: 0,
    r: 0
  }

  componentDidMount() {
    const { size = 52 } = this.props
    this.getList(Taro.pxTransform(size))
    this.animate()
  }

  animate() {
    this.animatedValue.setValue(1)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 8,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => this.animate())
  }

  // 获取直角三角形两直角边宽度
  getTriangleWidth(hypotenuse, angle = 0) {
    return {
      opposite: hypotenuse * Math.cos(angle * 2 * Math.PI / 360), // 对边
      frontier: hypotenuse * Math.sin(angle * 2 * Math.PI / 360) //  临边
    }
  }

  // 获取每个线条的位置
  getList(size) {
    const halfSize = size / 2 // 正方形的一半长
    const r = size / 6 //空心圆的半径
    const l = (size - r * 2) / 2 // 线的长度
    const halfL = l / 2 // 线一半的长度
    const centerR = halfL + r // 定位中心点的圆的半径
    let lines = []
    for (let i = 0; i < 8; i++) {
      const { opposite: left, frontier: top } = this.getTriangleWidth(centerR, i * 45)
      lines.push({
        left: halfSize + left,
        top: halfSize + top
      })
    }
    this.setState({
      width: size,
      r: halfL,
      lines
    })
  }

  getAnimated(index) {
    let out = [0.125 * 1, 0.125 * 2, 0.125 * 3, 0.125 * 4, 0.125 * 5, 0.125 * 6, 0.125 * 7, 0.125 * 8]
    out = [...out.splice(out.length - index), ...out]
    return this.animatedValue.interpolate({
      inputRange: [1, 2, 3, 4, 5, 6, 7, 8],
      outputRange: out
    })
  }

  render() {
    const { style = {}, color = 'dark' } = this.props
    const { lines, width, r } = this.state
    const colors = {
      dark: '#7a7a7a',
      blank: '#fff'
    }
    return (
      <View style={[style, {
        width: width,
        height: width,
      }]}
      >
        {
          lines.map((item, index) => {
            return <Animated.View
              key={'item' + index}
              style={[
                styles.child,
                {
                  marginTop: - r,
                  height: r * 2,
                  transform: [{ rotate: (index * 45 + 90) + 'deg' }],
                  ...item,
                  opacity: this.getAnimated(index),
                  backgroundColor: colors[color] || colors.dark
                }
              ]}
            />
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  child: {
    width: 3,
    borderRadius: 1.5,
    position: 'absolute',
    marginLeft: -1.5
  },
})
