import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import Icon from '../icon'
import Button from '../button'
import './index.scss'

export default class Scroll extends Component {

  static options = {
    // 组件使用全局样式
    addGlobalClass: true
  }

  scroll(e) {
    this.props.onScroll && this.props.onScroll(e)
  }

  scrollToLower(e) {
    this.props.onScrollToLower && this.props.onScrollToLower(e)
  }

  refresh() {
    const { refresh } = this.props
    !refresh && this.props.onRefresh && this.props.onRefresh(this)
  }

  refreshReset() {
  }

  reload() {
    this.props.onReload && this.props.onReload()
  }

  render() {
    const {
      style = {},
      refresh,
      emptyIcon = 'info',
      emptyTitle = '什么都没有',
      emptyDesc,
      emptyBttton,
      emptyShow = false,
      scrollWithAnimation = true,
      scrollTop,
      flip = false
    } = this.props
    return (
      <View className='scroll-root'>
        <ScrollView
          scrollY
          className={`scroll-auto-height-weapp scroll ${flip ? 'scroll-flip' : ''}`}
          style={style}
          onScroll={this.scroll.bind(this)}
          onScrollToLower={this.scrollToLower.bind(this)}
          scrollWithAnimation={scrollWithAnimation}
          scrollTop={scrollTop}
          refresherEnabled={refresh !== undefined}
          refresherThreshold={50}
          onRefresherrefresh={this.refresh.bind(this)}
          onRefresherrestore={this.refreshReset.bind(this)}
          refresherTriggered={!!refresh}
        >
          {!emptyShow && this.props.children}
        </ScrollView>
        {emptyShow && <View className={'scroll-info' + (emptyShow ? ' scroll-info--show' : '')} onClick={this.reload.bind(this)}>
          <Icon name={emptyIcon} size={90} color='#333' />
          {!!emptyTitle && <Text className='scroll-info__title'>{emptyTitle}</Text>}
          {!!emptyDesc && <Text className='scroll-info__desc'>{emptyDesc}</Text>}
          {!!emptyBttton && <Button size='m' text={emptyBttton} style={{ marginTop: Taro.pxTransform(20) }} onClick={() => this.props.onEmptyButtonCilck && this.props.onEmptyButtonCilck()} />}
        </View>}
      </View>
    )
  }
}
