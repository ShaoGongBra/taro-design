import React, { useContext, useMemo, useCallback, useEffect, useState, useRef } from 'react'
import { ScrollView, TopView } from '../../component'
import { currentPage } from 'taro-tools'
import Context from '../util/context'
import { PageUrlContext, Create } from '../../render'
import Form from '../attrForm/form'
import './attrForm.scss'
import comp from '../util/comp'

export default () => {

  const { hover, setNodeData } = useContext(Context)

  // 属性编辑表单
  const [form, setForm] = useState([])
  const [formValue, setFormValue] = useState({})

  const change = useCallback(value => {
    setNodeData(hover?.key, value)
  }, [hover, setNodeData])

  /**
   * 获取编辑表单
   */
  const getEditForm = useCallback(() => {
    if (hover) {
      const data = comp.getEditForm(hover.nodeName)
      setForm(data.form)
      const value = { ...hover }
      delete value.child
      delete value.parentNode
      setFormValue(value)
    }
  }, [hover])



  /**
   * 记录历史数据，防止重复获取表单
   */
  const getFormOldData = useRef({
    hover: '-1'
  })

  /**
   * 监听什么时候重新生成表单
   */
  useEffect(() => {
    const hoverString = hover?.key
    if (getFormOldData.current.hover !== hoverString) {
      getEditForm()
      getFormOldData.current.hover = hoverString
    }
  }, [hover, getEditForm])

  // 组件页面
  const page = useMemo(() => currentPage() + '/attr-form', [])

  return <TopView pageUrl={page}>
    <ScrollView>
      <PageUrlContext.Provider value={page}>
        <Form defauleValue={formValue} onChange={change}>
          <Create nodes={form} />
        </Form>
      </PageUrlContext.Provider>
    </ScrollView>
  </TopView>
}
