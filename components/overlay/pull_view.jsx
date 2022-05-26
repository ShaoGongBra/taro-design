import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Absolute from './absolute'
import './pull_view.scss'

export default class PullView extends Component {

  state = {

  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true
      })
    }, 100)
  }

  overlayCilck = () => {
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
    const { show } = this.state
    const { side = 'bottom', style = {}, overlayOpacity = 0.5, children } = this.props
    return <Absolute>
      <View
        className='pull-view'
        style={{ backgroundColor: show ? `rgba(0, 0, 0, ${overlayOpacity})` : 'rgba(0, 0, 0, 0)' }}
        onClick={e => e.stopPropagation && e.stopPropagation()}
      >
        <View className='pull-view__other' onClick={this.overlayCilck}></View>
      </View>
      <View
        className={`pull-view__main pull-view__main--${side}${show ? ' pull-view__main--show' : ''}`}
        style={style}
      >
        {children}
      </View>
    </Absolute>
  }
}
