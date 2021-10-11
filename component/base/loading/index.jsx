import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Loading extends Component {

  state = {
    lines: [],
    width: 0,
    r: 0
  }

  componentDidMount() {
    const { size = 52 } = this.props
    this.getList(size)
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

  render() {
    const { style = {}, color = 'dark' } = this.props
    const { lines, width, r } = this.state
    const colors = {
      dark: '#7a7a7a',
      blank: '#fff'
    }
    return (
      <View className='loading' style={{
        ...style,
        width: Taro.pxTransform(width),
        height: Taro.pxTransform(width),
      }}
      >
        {
          lines.map((item, index) => {
            return <View
              key={'item' + index}
              className={`child child-${index + 1}`}
              style={{
                marginTop: Taro.pxTransform(- r),
                height: Taro.pxTransform(r * 2),
                transform: 'rotate(' + (index * 45 + 90) + 'deg)',
                left: Taro.pxTransform(item.left),
                top: Taro.pxTransform(item.top),
                backgroundColor: colors[color] || colors.dark
              }}
            />
          })
        }
      </View>
    )
  }
}
