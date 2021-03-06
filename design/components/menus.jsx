import React, { useCallback, useContext, useState } from 'react'
import { useDrag } from 'react-dnd'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import TemplateList from '../template/list'
import Context from '../util/context'
import comp from '../util/comp'
import EditTypes from '../util/editTypes'
import { NodePosition } from '../util/edit'
import './menus.scss'

const Module = ({ item }) => {
  const { selectNode, moveNode, nodes } = useContext(Context)

  const [, drag] = useDrag({
    type: EditTypes.FORM_ADD,
    item: () => {
      selectNode()
      return { nodeName: item.nodeName }
    }
  })

  const add = useCallback(() => {
    moveNode(item.nodeName, new NodePosition('__root__', nodes.length))
  }, [item.nodeName, moveNode, nodes.length])

  return <View ref={drag} className='item' onClick={add}>
    <Text className='text'>{item.text}</Text>
  </View>
}

export default ({
  templateOpen
}) => {

  const [cates] = useState(comp.getCates())
  const [cateName, setCateName] = useState('base')

  const [module] = useState(comp.getComps())

  return <View className='menu'>
    <View className='level-1'>
      {
        cates.map(cate => <View
          className={`cate${cate.name === cateName ? ' hover' : ''}`}
          key={cate.name}
          onClick={() => setCateName(cate.name)}
        >
          <Text className='cate-name'>{cate.text}</Text>
        </View>)
      }
      {templateOpen && <View
        className={classNames('cate', { hover: '_template_' === cateName })}
        onClick={() => setCateName('_template_')}
      >
        <Text className='cate-name'>模板</Text>
      </View>}
    </View>
    {!!cateName && <View className='level-2'>
      <View className='child-cate'>
        {
          module.filter(item => item.cate?.name === cateName).map(child => <Module key={child.nodeName} item={child} />)
        }
      </View>
      {templateOpen && <TemplateList show={cateName === '_template_'} />}
    </View>}
  </View>
}
