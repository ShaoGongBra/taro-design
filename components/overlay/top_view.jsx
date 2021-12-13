import React, { Component } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { event, isIphoneX, currentPage, currentPageAsync } from 'taro-tools'
import { KeyboardAvoiding } from '../base'
import Status from './status'
import './top_view.scss'

let keyValue = 0

class CreateEle extends Component {
  state = {
    elements: []
  }

  componentDidMount() {
    let { page } = this.props
    if (!page) {
      page = currentPage()
    }

    this.page = page

    event.add(page + '-addOverlay', this.add)
    event.add(page + '-removeOverlay', this.remove)
    event.add(page + '-removeAllOverlay', this.removeAll)
  }

  componentWillUnmount() {
    const { page = this.page } = this.props
    event.remove(page + '-addOverlay', this.add)
    event.remove(page + '-removeOverlay', this.remove)
    event.remove(page + '-removeAllOverlay', this.removeAll);
  }

  add = e => {
    const { elements } = this.state
    const index = elements.findIndex(item => item.key === e.key)
    if (~index) {
      elements[index] = e
    } else {
      elements.push(e)
    }
    this.setState({ elements })
  }

  remove = e => {
    const { elements } = this.state
    for (let i = elements.length - 1; i >= 0; --i) {
      if (elements[i].key === e.key) {
        elements.splice(i, 1)
        break
      }
    }
    this.setState({ elements })
  }

  removeAll = () => {
    this.setState({ elements: [] })
  }

  render() {
    const { elements } = this.state
    return elements.map(item => <React.Fragment key={'topView-' + item.key}>
      {item.element}
    </React.Fragment>)
  }
}

export default class TopView extends Component {

  static add(element, page) {
    if (!page) {
      page = currentPage()
    }
    const key = ++keyValue
    event.emit(page + '-addOverlay', { key, element })
    return key
  }

  static async addAsync(element, page) {
    if (!page) {
      page = await currentPageAsync()
    }
    return this.add(element, page)
  }

  static update(key, element, page) {
    if (!page) {
      page = currentPage()
    }
    key && event.emit(page + '-addOverlay', { key, element })
  }

  static remove(key, page) {
    if (!page) {
      page = currentPage()
    }
    key && event.emit(page + '-removeOverlay', { key })
  }

  static removeAll(page) {
    if (!page) {
      page = currentPage()
    }
    event.emit(page + '-removeAllOverlay', {})
  }

  render() {
    const { children, isSafe, isForm, pageUrl, ...props } = this.props
    return <View {...props} className={classNames('top-view', { 'top-view--safe': isSafe && isIphoneX() })}>
      <Status barStyle='dark-content' />
      <KeyboardAvoiding isForm={isForm}>
        {children}
      </KeyboardAvoiding>
      <CreateEle page={pageUrl} />
    </View>
  }
}
