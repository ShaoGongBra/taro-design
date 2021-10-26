
import React, { useContext, useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { objectToString, toast } from 'taro-tools'
import { Icon, Modal } from '../../component'
import Context from '../util/context'
import { nodeToJsx } from '../util/node'
import comp from '../util/comp'
import './export.scss'

const Code = ({ children, lang = 'json' }) => {
  return <SyntaxHighlighter
    language={lang}
  >
    {children.replace(/^\s+|\s+$/g, '')}
  </SyntaxHighlighter>
}

const Export = ({ nodes, onClose }) => {

  const [simplifyList, setSimplifyList] = useState([])

  const [type, setType] = useState('json')

  const [jsonType, setJsonType] = useState('Object')

  const [componentCate, setComponentCate] = useState('function')

  useEffect(() => {
    setSimplifyList(comp.simplifyNodes(nodes))
  }, [nodes])


  return <View className='json'>
    <View className='head'>
      <View className='type'>
        <Text className={`item${type === 'json' ? ' select' : ''}`} onClick={() => setType('json')}>JSON</Text>
        <Text className={`item${type === 'component' ? ' select' : ''}`} onClick={() => setType('component')}>组件</Text>
      </View>
      <Icon name='cuo' size={42} onClick={onClose} />
    </View>
    {type === 'json' && <View className='main'>
      <ScrollView scrollY scrollX className='scroll'>
        <Code>
          {objectToString(simplifyList, null, 2, jsonType === 'Object')}
        </Code>
      </ScrollView>
      <View className='type'>
        <Text className={`item${jsonType === 'Object' ? ' select' : ''}`} onClick={() => setJsonType('Object')}>Object</Text>
        <Text className={`item${jsonType === 'JSON' ? ' select' : ''}`} onClick={() => setJsonType('JSON')}>JSON</Text>
      </View>
      <View
        className='copy'
        onClick={async () => {
          try {
            await Taro.setClipboardData({ data: objectToString(simplifyList, null, 2, jsonType === 'Object') })
            Taro.showToast({ title: '复制成功' })
          } catch (error) {
            toast('复制失败')
          }
        }}
      >
        <Icon name='wenjian' color='#666' size={24} />
        <Text className='text'>复制</Text>
      </View>
    </View>}
    {type === 'component' && <View className='main'>
      <ScrollView scrollY scrollX className='scroll'>
        <Code lang='jsx'>
          {nodeToJsx(simplifyList, componentCate)}
        </Code>
      </ScrollView>
      <View className='type'>
        <Text className={`item${componentCate === 'function' ? ' select' : ''}`} onClick={() => setComponentCate('function')}>函数组件</Text>
        <Text className={`item${componentCate === 'class' ? ' select' : ''}`} onClick={() => setComponentCate('class')}>类组件</Text>
      </View>
      <View
        className='copy'
        onClick={async () => {
          try {
            await Taro.setClipboardData({ data: nodeToJsx(simplifyList, componentCate) })
            Taro.showToast({ title: '复制成功' })
          } catch (error) {
            toast('复制失败')
          }
        }}
      >
        <Icon name='wenjian' color='#666' size={24} />
        <Text className='text'>复制</Text>
      </View>
    </View>}
  </View>
}

export default () => {

  const { nodes, showExport, setShowExport } = useContext(Context)

  return <Modal show={!!showExport} onClose={() => setShowExport('')}>
    <Export nodes={nodes} onClose={() => setShowExport(false)} />
  </Modal>
}
