
import { getKey } from 'taro-tools'
import { nodeCreate } from '../../render'

export default class FormCreate {

  static group(name, child) {
    return nodeCreate('edit-group', { name }, child)
  }

  static input(text, name, type = 'text', option) {
    return nodeCreate('edit-item', { name: text }, nodeCreate('edit-input', { text, name, type, option }))
  }

  static switch(text, name) {
    return nodeCreate('edit-item', { name: text }, nodeCreate('edit-switch', { text, name }))
  }

  static icon(text, name) {
    return nodeCreate('edit-item', { name: text }, nodeCreate('edit-icon', { text, name }))
  }

  static init(...props) {
    return new this(...props)
  }

  constructor(nodeName, text, name, key) {
    this.form = {
      key: key || getKey(),
      name,
      nodeName,
      text
    }
    return this
  }

  // 表单数据
  form = {}

  // 提示
  tip(tip) {
    this.form.tip = tip
    return this
  }

  // 输入框提示
  placeholder(placeholder) {
    this.form.placeholder = placeholder
    return this
  }

  // 输入框类型
  inputType(inputType) {
    this.form.type = inputType
    return this
  }

  // 输入框类型为数字
  inputNumber() {
    this.form.valueType = 'number'
    this.form.type = 'number'
    return this
  }

  // 数据类型
  valueType(valueType) {
    this.form.valueType = valueType
    return this
  }

  // 字符串数据类型
  valueString() {
    this.form.valueType = 'string'
    return this
  }

  // 数字串数据类型
  valueNumber() {
    this.form.valueType = 'number'
    return this
  }

  // 布尔值数据类型
  valueBoolean() {
    this.form.valueType = 'boolean'
    return this
  }

  // 设置style
  style(style) {
    this.form.style = style
    return this
  }

  // 设置option通用参数
  option(data) {
    this.form = { ...this.form, ...data }
    return this
  }

  // 单选多选用的参数
  select(option, type = 'radio', mode = 'show', theme = 'text') {
    this.form = {
      ...this.form,
      type,
      mode,
      theme,
      option
    }
    return this
  }

  // 配置局部布局参数 覆盖全局参数
  config(config) {
    this.form.config = config
    return this
  }

  // 子内容
  child(child = []) {
    this.form.child = child
    return this
  }

  // 子表单宽度
  childWidth(width) {
    this.form.width = width
    return this
  }

  // 指定显示条件
  where(key, judge, value) {
    this.form.showWhere = {
      key,
      judge,
      value
    }
    return this
  }

  // 面板组件参数
  panel(title, defaultShow = true) {
    this.form = {
      ...this.form,
      title,
      open: defaultShow
    }
    return this
  }

  /*  设置表单验证
    * {
    *  reg: 'required|phone-tel|l5_8',
    *  emptyMsg: '为空提示',
    *  errMsg: '验证错误提示',
    *  lengthErrMsg: '长度错误提示'
    * }
   */

  verify(verify) {
    this.form.verify = verify
    return this
  }

  // 返回表单数据
  get() {
    return this.form
  }
}
