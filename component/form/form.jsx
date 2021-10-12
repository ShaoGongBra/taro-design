import React, { Component, useContext } from 'react'
import { View, Text } from '@tarojs/components'
import { verify, recursionSetValue, recursionGetValue, deepCopy } from 'taro-tools'
import { chechWhere, getFormDefaultValue } from './utils'

import './form.scss'

const noop = () => { }

export const FormContext = React.createContext({
  // 更新value
  updateValue: noop,
  // 验证字段
  checkVerify: noop,
  // 表单提交
  submit: noop
})

export default class FormComponent extends Component {

  state = {
    values: {}
  }

  componentDidMount() {
    const { _edit } = this.props
    !_edit && this.getForm()
  }

  static designConfig = {
    childFunc: true
  }

  // 上一个页面传递过来的参数将在提交表单的时候一起提交数据
  post = {}

  /**
   * 记录每个每个key 对应的index name 和 showWhere
   * {
   *  name: [ // key名称
   *    [0, undefined, undefined], // index索引 [序号, name, showWhere的key]
   *    [1, "input", "control1"], // 被嵌套的 index
   *  ]
   * }
   */
  formKeyIndex = {}

  /**
   * 记录每个name对应的key， 如果是数组子表单，则记录的是列的name, 子表单的name用,分割
   * {input: 'input', 'arr,input': 'arr_input'}
   */
  formNameKey = {}

  /**
   * 记录条件显示 这里记录的都是key
   * 下面的示例表示 control1这个key控制input这个key的显示和隐藏，control1这个key控制input2和input3这两个key的显示和隐藏
   * {control1: ['input'], control2: ['input2', 'input3']}
   */
  showWheresKey = {}

  getForm() {
    const { _childNodes, defaultValues } = this.props
    const child = deepCopy(_childNodes)
    this.formKeyIndex = {}
    // 获取key对应的index和name的位置
    const getFormKeyIndex = (form_1 = child, indexs = []) => {
      for (let i = 0, l = form_1.length; i < l; i++) {
        const item = form_1[i]
        const newIndex = [...indexs, [i, item.name, item.showWhere && item.showWhere.key]]
        this.formKeyIndex[item.key] = newIndex
        if (item.child) {
          getFormKeyIndex(item.child, newIndex)
        }
      }
    }
    getFormKeyIndex()
    // 记录表单控制显示隐藏
    this.showWheresKey = {}
    Object.keys(this.formKeyIndex).map(key => {
      const item_1 = this.formKeyIndex[key]
      const last = item_1[item_1.length - 1]
      if (last[2]) {
        this.showWheresKey[last[2]] = this.showWheresKey[last[2]] || []
        this.showWheresKey[last[2]].push(key)
      }
    })

    // 重置子组件表单的name
    const resetName = (nodes = child, names = []) => {
      nodes.forEach(item => {
        const currentName = item.name
        if (currentName && typeof item.name === 'string') {
          if (names.length) {
            item.name = [...names, currentName]
          }
        }
        if (item?.child?.length) {
          resetName(item.child, currentName ? [...names, currentName] : [...names])
        }
      })
    }
    resetName()

    this.setState({
      nodes: child,
      values: getFormDefaultValue(child, defaultValues),
    }, () => this.checkShow())
  }

  /**
   * 表单的事件
   * @param {onject} data {
   *  event: 事件标识,
   *  indexs: 触发事件的索引数组,
   *  keys: 触发事件的key数组,
   *  names: 触发事件的name数组,
   *  ... 其他
   * }
   */
  event(data) {
    // console.log('组件事件', data)
    switch (data.event) {
      case 'buttn-click':
        // 按钮点击事件
        if (data.button.type === 'submit') {
          this.submit()
        }
        break
      case 'input-blur':
        // input失去焦点事件
        this.checkVerify(data.keys[data.keys.length - 1])
        break
      case 'input':
        // 表单输入事件
        const { values } = this.state
        recursionSetValue(data.names, values, data.value)
        this.setState({
          values
        }, () => {
          const key = data.keys[data.keys.length - 1]
          this.checkVerify(key)
          this.checkShow(key)
          this.props.onInput && this.props.onInput(data)
        })
        break
    }
    this.props.onEvent && this.props.onEvent(data)
  }

  /**
   * 检查表单的显示控制
   * @param {string} key 要要检查的key 不传入检测所有的key
   * @param {string} superShow 递归检查被子项的显示隐藏条件 传入父级的显示状态
   */
  checkShow(key, superShow) {
    if (key !== undefined && !this.showWheresKey[key]) {
      // 没有被控制
      return
    }
    // 判断是否在递归中
    const child = superShow !== undefined

    const { nodes } = this.state
    // 获取要检查的项目
    const keys = key !== undefined ? { [key]: this.showWheresKey[key] } : { ...this.showWheresKey }

    for (const valueKey in keys) {
      if (keys.hasOwnProperty(valueKey)) {
        for (let i = 0; i < keys[valueKey].length; i++) {
          // 被控制的表单的key
          const whereKey = keys[valueKey][i]
          // 变化的value
          const value = this.getKeyValue(valueKey)
          // 被控制的表单项目
          const whereItem = this.getKeyComp(whereKey, nodes)
          // 计算显示结果 在子集中子元素的显示状态受到父元素的控制
          const show = child && !superShow ? false : chechWhere(value, whereItem.showWhere.value, whereItem.showWhere.judge)
          whereItem.hidden = !show
          // 检查关联控制
          if (this.showWheresKey[whereKey]) {
            // 不在下次检查中检查这一个子集
            delete keys[whereKey]
            // 去验证子集的显示情况
            this.checkShow(whereKey, show)
          }
        }
      }
    }

    // 不在递归里面的时候执行 setState
    !child && this.setState({
      nodes
    })
  }

  /**
   * 检查表单数据验证
   * @param {string} key 要检查的表单的key
   */
  checkVerify = key => {
    const { nodes } = this.state
    const compItem = this.getKeyComp(key, nodes)
    if (!compItem.verify || !compItem.verify.open) {
      return
    }
    const res = verify(this.getKeyValue(key), compItem.verify, {}, true)
    const verifyMsg = res === true ? false : res
    if (verifyMsg !== compItem.verifyMsg) {
      compItem.verifyMsg = verifyMsg
      this.setState({
        nodes
      })
    }

  }

  /**
   * 通过key获取表单中对应表单的value
   * @param {string} key
   */
  getKeyValue(key) {
    const { values } = this.state
    return recursionGetValue(this.formKeyIndex[key].filter(item => item[1] !== undefined).map(item => item[1]), values)
  }

  /**
   * 通过key获取到组件内容
   * @param {string} key
   * @param {object} nodes 表单组件 传入form返回的值是引用的， 可以在修改后直接 setState
   */
  getKeyComp(key, nodes = this.state.nodes) {
    return recursionGetValue(this.formKeyIndex[key].map(item => item[0]), nodes, 'child')
  }

  // 表单输入
  updateValue = (name, value) => {
    const { values } = this.state
    recursionSetValue(name, values, value)
    this.setState({
      values: { ...values }
    })
  }

  // 表单验证


  /**
   * 表单提交
   */
  submit = () => {

  }

  getContextData() {
    const { itemStyle, textStyle, tipStyle } = this.props
    const { values } = this.state
    return {
      updateValue: this.updateValue,
      submit: this.submit,
      checkVerify: this.checkVerify,
      values,
      itemStyle,
      textStyle,
      tipStyle
    }
  }

  render() {
    const { nodes } = this.state
    const { children, _edit, _childNodes } = this.props

    return <FormContext.Provider value={this.getContextData()}>
      {children({ nodes: _edit ? _childNodes : nodes })}
    </FormContext.Provider>
  }
}


export const FormItem = ({ children, text, tip }) => {

  const { textStyle, itemStyle, tipStyle } = useContext(FormContext)

  return <View className='form-item' style={itemStyle}>
    {!!text && <Text
      style={textStyle}
      className='form-item__text'
    >{text}</Text>}
    <View className='form-item__main'>
      {children}
      {/* {!!attr.verifyMsg && <Text className='form-item__verify'>{attr.verifyMsg}</Text>} */}
      {!!tip && <Text
        className='form-item__tip'
        style={tipStyle}
      >{tip}</Text>}
    </View>
  </View>
}
