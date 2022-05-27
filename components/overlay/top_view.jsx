import React, { Component, useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { event, isIphoneX, currentPage, currentPageAsync } from 'taro-tools'
import { KeyboardAvoiding } from '../base'
import Create from '../../render/Create'
import Status from './status'
import './top_view.scss'

const Position = ({ children }) => {
  return process.env.TARO_ENV === 'rn'
    ? children
    : <View className='position'>
      {children}
    </View>
}

const Diy = () => {

  const [nodes, setNodes] = useState([])

  useEffect(() => {
    const keyIndex = {}
    const cb = ({
      key,
      node
    }) => {
      const index = keyIndex[key]
      if (node) {
        // 新增或者更新
        if (~index) {
          setNodes(old => {
            keyIndex[key] = old.length
            old.push(node)
            return [...old]
          })
        } else {
          setNodes(old => {
            old[index] = node
            return [...old]
          })
        }
      } else {
        // 删除
        ~index && setNodes(old => {
          old.splice(index, 1)
          // 让大于这个index的index -1，保证索引位置正确
          Object.keys(keyIndex).forEach(key => {
            if (keyIndex[key] > index) {
              keyIndex[key]--
            }
          })
          return [...old]
        })
      }
    }
    const name = currentPage() + '-diyChange'

    event.add(name, cb)
    return () => event.remove(name, cb)
  }, [])

  return nodes.length ?
    <Create nodes={nodes} />
    : null
}

class CreateEle extends Component {
  state = {
    elements: [
      {
        key: 'diy',
        element: <Diy />
      }
    ]
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
    return <Position>
      {
        elements.map(item => <React.Fragment key={'topView-' + item.key}>
          {item.element}
        </React.Fragment>)
      }
    </Position>
  }
}


let diyKeyValue = 0
let keyValue = 0
export default class TopView extends Component {

  static addDiy(node) {
    const key = diyKeyValue++
    event.emit(currentPage() + '-diyChange', { key, node })
    return key
  }

  static updateDiy(key, node) {
    ~key && event.emit(currentPage() + '-diyChange', { key, node })
  }

  static removeDiy(key) {
    ~key && event.emit(currentPage() + '-diyChange', { key })
  }

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
