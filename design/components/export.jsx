
import React, { useContext, useState, useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, ScrollView, CheckboxGroup, Checkbox } from '@tarojs/components'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { objectToString, toast } from 'taro-tools'
import { Icon, Modal } from '../../component'
import Context from '../util/context'
import { nodeToJsx } from '../util/node'
import comp from '../util/comp'
import './export.scss'

const Check = ({ children, check, onChange }) => {

  const change = useCallback(({ detail: { value } }) => {
    onChange(!!value.length)
  }, [onChange])

  return <CheckboxGroup onChange={change}>
    <Checkbox value={1} checked={check}>{children}</Checkbox>
  </CheckboxGroup>
}

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

  const [componentData, setComponentData] = useState({ jsx: '', css: '' })

  const [componentCate, setComponentCate] = useState('function')
  // 全局样式
  const [globalClass, setGlobalClass] = useState(false)
  // 样式分离
  const [cssSeparate, setCssSeparate] = useState(false)

  useEffect(() => {
    setSimplifyList(comp.simplifyNodes(nodes))
  }, [nodes])

  useEffect(() => {
    setComponentData(nodeToJsx(simplifyList, componentCate, globalClass, cssSeparate))
  }, [simplifyList, componentCate, globalClass, cssSeparate])

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
        <Code lang={componentCate === 'css' ? 'css' : 'jsx'}>
          {componentCate === 'css' ? componentData.css : componentData.jsx}
        </Code>
      </ScrollView>
      <View className='type'>
        <Text className={`item${componentCate === 'function' ? ' select' : ''}`} onClick={() => setComponentCate('function')}>函数组件</Text>
        <Text className={`item${componentCate === 'class' ? ' select' : ''}`} onClick={() => setComponentCate('class')}>类组件</Text>
        <Text className={`item${componentCate === 'css' ? ' select' : ''}`} onClick={() => setComponentCate('css')}>样式</Text>
        <Check check={globalClass} onChange={setGlobalClass}>使用全局样式</Check>
        <Check check={cssSeparate} onChange={setCssSeparate}>样式分离</Check>
      </View>
      <View
        className='copy'
        onClick={async () => {
          try {
            await Taro.setClipboardData({ data: componentCate === 'css' ? componentData.css : componentData.jsx })
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
