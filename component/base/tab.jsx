import React, { useState, useCallback, useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './tab.scss'

const Tab = ({ attr, hover, change, child }) => <View className={`form-tab__nav${['top', 'bottom'].includes(attr.position) ? ' form-tab__nav--row' : ''}`}>
  {child.map((item, index) => <View
    className={`form-tab__nav__item${hover === index ? ' form-tab__nav__item--hover' : ''}`}
    key={item.key}
    onClick={e => {
      e.stopPropagation && e.stopPropagation()
      change(index)
    }}
  >
    <Text className='form-tab__nav__item__txt'>{item.tabName || 'tab'}</Text>
  </View>)}
</View>

const TabLayout = ({ children, onEvent, _childNodes, ...attr }) => {

  const [hover, setHover] = useState(0)

  const change = useCallback((i) => {
    setHover(i)
  }, [])

  const tabStart = useMemo(() => ['left', 'top'].includes(attr.position), [attr])

  const row = useMemo(() => ['left', 'right'].includes(attr.position), [attr])

  const nodes = useMemo(() => {
    _childNodes.map(item => {
      item.hidden = true
      return item
    })
    if (_childNodes[hover]) {
      _childNodes[hover].hidden = false
    }
    return _childNodes
  }, [_childNodes, hover])

  return <View className={classNames(attr.className, 'form-tab', { 'form-tab--row': row })} style={attr.style}>
    {tabStart && <Tab attr={attr} child={_childNodes} hover={hover} change={change} />}
    <View className='form-tab__child'>
      {children({ nodes })}
    </View>
    {!tabStart && <Tab attr={attr} child={_childNodes} hover={hover} change={change} />}
  </View>

}

TabLayout.designConfig = {
  childFunc: true
}

const TabItemLayout = ({ children }) => children

export {
  TabLayout,
  TabItemLayout
}
