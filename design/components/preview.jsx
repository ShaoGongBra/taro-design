
import React, { useContext, useState, useMemo } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { currentPage } from 'taro-tools'
import { Icon, PullView, TopView } from '../../component'
import Context from '../util/context'
import { PageUrlContext, Create, styled } from '../../render'
import './preview.scss'

export default () => {

  const { nodes, setPreview } = useContext(Context)

  const [previewPhone] = useState([
    { name: '手机', icon: 'shiwu-shouji', width: 480 },
    { name: '平板', icon: 'shouji', width: 750 },
    { name: '电脑', icon: 'dianshi', width: 1280 }
  ])
  const [previewPhoneHover, setPreviewPhoneHover] = useState(1)

  // 组件页面
  const page = useMemo(() => currentPage() + '/preview', [])

  return <PullView side='top' onClose={() => setPreview(false)}>
    <View className='preview'>
      <View className='head'>
        {
          previewPhone.map((item, index) => <View
            key={item.name}
            className={`item${index === previewPhoneHover ? ' hover' : ''}`}
            onClick={() => setPreviewPhoneHover(index)}
          >
            <Icon name={item.icon} size={36} color='#333' />
          </View>)
        }
      </View>
      <View
        className='mobile'
        style={styled.styleTransform({
          width: previewPhone[previewPhoneHover].width
        }).style}
      >
        <TopView pageUrl={page}>
          <ScrollView className='scroll' scrollY>
            <PageUrlContext.Provider value={page}>
              <Create nodes={nodes} />
            </PageUrlContext.Provider>
          </ScrollView>
        </TopView>
      </View>
    </View>
  </PullView>
}
