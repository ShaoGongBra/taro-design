
import React, { useContext, useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { objectToString, toast } from 'taro-tools'
import { Icon, PullView } from '../../component'
import Context from '../util/context'
import comp from '../util/comp'
import './json.scss'


const Code = ({ children, lang = 'json' }) => {
  return <SyntaxHighlighter
    language={lang}
  >
    {children.replace(/^\s+|\s+$/g, '')}
  </SyntaxHighlighter>
}

export default () => {

  const [simplifyList, setSimplifyList] = useState([])

  const { nodes, config, showJson, setShowJson } = useContext(Context)

  const [jsonType, setJsonType] = useState('Object')

  useEffect(() => {
    showJson && setSimplifyList(comp.simplifyNodes(nodes))
  }, [showJson, nodes])

  return <PullView side='top' onClose={() => setShowJson('')}>
    <View className='json'>
      <View className='head'>
        <Text className={`item${showJson === 'form' ? ' select' : ''}`} onClick={() => setShowJson('form')}>Form</Text>
        <Text className={`item${showJson === 'config' ? ' select' : ''}`} onClick={() => setShowJson('config')}>Config</Text>
      </View>
      <View className='main'>
        <ScrollView scrollY scrollX className='scroll'>
          <Code>
            {objectToString(showJson === 'form' ? simplifyList : config, null, 2, jsonType === 'Object')}
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
              await Taro.setClipboardData({ data: objectToString(showJson === 'form' ? simplifyList : config, null, 2, jsonType === 'Object') })
              Taro.showToast({ title: '复制成功' })
            } catch (error) {
              toast('复制失败')
            }
          }}
        >
          <Icon name='wenjian' color='#666' size={24} />
          <Text className='text'>复制</Text>
        </View>
      </View>
    </View>
  </PullView>
}
