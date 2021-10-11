import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { RefreshControl } from 'react-native'
import Icon from '../icon'
import Button from '../button'
import './index.scss'

export default class Scroll extends Component {

  state = {
    reloadShow: !1
  }

  componentDidMount() {
    this.setState({
      reloadShow: this.props.emptyShow
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.emptyShow != this.props.emptyShow) {
      if (!!nextProps.emptyShow) {
        this.timer && clearTimeout(this.timer)
        this.setState({
          reloadShow: !0
        })
      } else {
        this.timer = setTimeout(() => {
          this.setState({
            reloadShow: !1
          })
        }, 300)
      }
    }
  }

  scroll(e) {
    this.props.onScroll && this.props.onScroll(e)
  }

  scrollToLower(e) {
    this.props.onScrollToLower && this.props.onScrollToLower(e)
  }

  reload() {
    this.props.onReload && this.props.onReload()
  }

  render() {
    const {
      style = {},
      refresh = false,
      emptyIcon = 'info',
      emptyTitle = '什么都没有',
      emptyDesc,
      emptyBttton,
      emptyShow = false,
      scrollWithAnimation = true,
      scrollTop,
      flip = false,
      showsVerticalScrollIndicator = true,
      contentContainerStyle = {},
      flatListParams
    } = this.props
    const { reloadShow } = this.state
    return (
      <View style={{ flex: 1, transform: flip ? [{ rotate: '180deg' }] : [] }} >
        {reloadShow && <View
          className={'app-touch scroll-info' + (emptyShow ? ' scroll-info--show' : '')}
          onClick={this.reload.bind(this)}
          style={(!!emptyBttton ? { zIndex: 1 } : {})}
        >
          <Icon name={emptyIcon} size={90} color='#333' />
          {!!emptyTitle && <Text className='scroll-info__title'>{emptyTitle}</Text>}
          {!!emptyDesc && <Text className='scroll-info__desc'>{emptyDesc}</Text>}
          {!!emptyBttton && <Button size='m' text={emptyBttton} style={{ marginTop: Taro.pxTransform(20) }} onClick={() => this.props.onEmptyButtonCilck && this.props.onEmptyButtonCilck()} />}
        </View>}
        <ScrollView
          scrollY
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          contentContainerStyle={contentContainerStyle}
          {...{
            refreshControl: this.props.onRefresh && <RefreshControl
              refreshing={refresh}
              onRefresh={this.props.onRefresh}
              colors={['rgb(217, 51, 58)']}
            />
          }}
          {...flatListParams}
          style={[{ height: 1 }, style]}
          onScroll={this.scroll.bind(this)}
          onScrollToLower={this.scrollToLower.bind(this)}
          scrollWithAnimation={scrollWithAnimation}
          scrollTop={scrollTop}
          scrollIndicatorInsets={{ right: 1 }}
        >
          {!emptyShow && this.props.children}
        </ScrollView>
      </View>

    )
  }
}
