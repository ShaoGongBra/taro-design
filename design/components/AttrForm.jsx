import React, { useContext, useMemo, useCallback, useEffect, useState, useRef } from 'react'
import { currentPage, deepCopy } from 'taro-tools'
import { ScrollView, TopView } from '../../component'
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

  const updateValue = useCallback(({ values }) => {
    setNodeData(hover?.key, values)
  }, [hover, setNodeData])

  /**
   * 获取编辑表单
   */
  const getEditForm = useCallback((valueOnly) => {
    if (hover) {
      const data = comp.getEditForm(hover.nodeName)

      const value = deepCopy(hover)
      delete value.child
      delete value.parentNode
      delete value.forceUpdate
      delete value.key
      delete value.nodeName
      // 绑定节点事件和表单值
      const [formNode] = data.form
      formNode.onUpdateValue = updateValue
      formNode.defaultValues = value

      !valueOnly && setForm(data.form)
      setFormValue(value)
    } else {
      setForm([])
      setFormValue({})
    }
  }, [hover, updateValue])



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
    } else {
      // 重新获取value
      getEditForm(true)
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
