
import React, { useContext, useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { objectToString, toast } from 'taro-tools'
import { Icon, PullView } from '../../component'
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

export default () => {

  const [simplifyList, setSimplifyList] = useState([])

  const { nodes, showExport, setShowExport } = useContext(Context)

  const [jsonType, setJsonType] = useState('Object')

  const [componentCate, setComponentCate] = useState('jsx')

  useEffect(() => {
    showExport && setSimplifyList(comp.simplifyNodes(nodes))
  }, [showExport, nodes])


  return <PullView side='top' onClose={() => setShowExport('')}>
    <View className='json'>
      <View className='head'>
        <Text className={`item${showExport === 'json' ? ' select' : ''}`} onClick={() => setShowExport('json')}>JSON</Text>
        <Text className={`item${showExport === 'component' ? ' select' : ''}`} onClick={() => setShowExport('component')}>JSX</Text>
      </View>
      {showExport === 'json' && <View className='main'>
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
      {showExport === 'component' && <View className='main'>
        <ScrollView scrollY scrollX className='scroll'>
          <Code>
            {nodeToJsx(nodes)}
          </Code>
        </ScrollView>
        {/* <View className='type'>
          <Text className={`item${componentCate === 'jsx' ? ' select' : ''}`} onClick={() => setComponentCate('jsx')}>JSX</Text>
          <Text className={`item${componentCate === 'scss' ? ' select' : ''}`} onClick={() => setComponentCate('scss')}>SCSS</Text>
          <Text className={`item${componentCate === 'css' ? ' select' : ''}`} onClick={() => setComponentCate('css')}>CSS</Text>
        </View> */}
        <View
          className='copy'
          onClick={async () => {
            try {
              await Taro.setClipboardData({ data: nodeToJsx(nodes) })
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
  </PullView>
}
