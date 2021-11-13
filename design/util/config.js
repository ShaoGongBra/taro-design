import { getKey } from 'taro-tools'
import Create from './formCreate'

/**
 * 创建表单的名称索引 防止重复
 */
let nameIndex = 1

/**
 * 获取公共属性
 */
export const getPublicAttr = function (noSetKey = false) {
  const data = {}
  if (!noSetKey) {
    data.key = getKey()
  }
  for (let i = 0; i < this.publicAttr.length; i++) {
    const item = this.publicAttr[i]
    if (typeof item === 'function') {
      const res = item()
      data[res[0]] = res[1]
      continue
    }
    if (typeof item === 'object') {
      if (item[0] === 'style' || item[0].endsWith('Style')) {
        // data[item[0]] = style.getAttr(item[1])
      }
      continue
    }
    switch (item) {
      case 'name':
        data.name = `${this.nodeName}_${nameIndex}`
        nameIndex++
        break
      case 'text':
        data.text = this.text
        break
      case 'tip':
        data.tip = ''
        break
      case 'disabled':
        data.disabled = false
        break
      case 'child':
        data.child = []
        break
      case 'verify':
        data.verify = {
          required: false,
          reg: [],
          lenType: '',
          len: 0,
          lenMin: 0,
          lenMax: 0,
          emptyMsg: '',
          errMsg: '',
          lengthErrMsg: ''
        }
        break
      case 'showWhere':
        data.showWhere = {
          key: '', // 通过哪个key控制
          judge: '==', //  == | != | > | < | >= | <=
          value: [''], // 判断值
        }
        break
      default:
        break
    }
  }
  return data
}

/**
 * 获取公共属性的表单
 */
export const getPublicAttrForm = function () {
  if (this.publicAttr.length === 0) {
    return []
  }
  const data = [
    // Create.init('panel').panel('公共属性', true).child([]).get(),
    // {
    //   nodeName: 'tab',
    //   position: 'top',
    //   key: getKey(),
    //   child: [
    //     {
    //       nodeName: 'view',
    //       key: getKey(),
    //       parentAttr: {
    //         tabName: '属性'
    //       }
    //     }
    //   ]
    // }
  ]
  for (let i = 0, l = this.publicAttr.length; i < l; i++) {
    const item = this.publicAttr[i]
    // if (typeof item === 'object') {
    //   if (item[0] === 'style' || item[0].endsWith('Style')) {
    //     data[0].child.push({
    //       nodeName: 'edit-style',
    //       key: getKey(),
    //       styles: item[1],
    //       parentAttr: {
    //         tabName: item[2] || '样式'
    //       },
    //     })
    //     // const names = { style: '样式', textStyle: '文本样式', compStyle: '表单样式', compTextStyle: '表单字段名样式', compTipStyle: '表单提示样式' }
    //     // data.push(Create.init('panel').panel(names[item[0]] || '样式').child([
    //     //   Create.init('object', '', item[0]).child(style.getForm(item[1])).get()
    //     // ]).get())
    //   }
    //   continue
    // }
    switch (item) {
      // case 'name':
      //   data[0].child.push(Create.init('input', '字段名', 'name').get())
      //   break
      // case 'text':
      //   data[0].child.push(Create.init('input', '标题', 'text').get())
      //   break
      // case 'tip':
      //   data[0].child.push(Create.init('input', '提示信息', 'tip').get())
      //   break
      // case 'disabled':
      //   data[0].child.push(Create.init('switch', '是否禁用', 'disabled').valueBoolean().get())
      //   break
      // case 'verify':
      //   const verifyKeys = [getKey(), getKey(), getKey()]
      //   data.push(Create.init('panel').panel('字段验证', false).child([
      //     Create.init('object', '', 'verify').child([
      //       Create.init('switch', '开启验证', 'open', verifyKeys[0]).get(),
      //       Create.init('column').where(verifyKeys[0], '==', true).child([
      //         Create.init('switch', '是否必填', 'required', verifyKeys[1]).get(),
      //         Create.init('input', '为空提示', 'emptyMsg').where(verifyKeys[1], '==', true).get(),
      //         Create.init('select', '验证规则', 'reg').select([
      //           { text: '手机号', value: 'phone' },
      //           { text: '邮箱', value: 'email' },
      //           { text: '金钱', value: 'money' },
      //           { text: '身份证', value: 'idcard' },
      //           { text: '密码', value: 'password' },
      //           { text: 'url', value: 'url' },
      //           { text: '数字', value: 'number' }
      //         ], 'checkbox').tip('多选表示符合其中任意一个则验证通过').get(),
      //         Create.init('input', '错误提示', 'errMsg').get(),
      //         Create.init('select', '长度验证', 'lenType', verifyKeys[2]).select([
      //           { text: '不验证', value: '' },
      //           { text: '等于', value: '==' },
      //           { text: '大于等于', value: '>=' },
      //           { text: '小于等于', value: '<=' },
      //           { text: '介于', value: 'between' }
      //         ]).get(),
      //         Create.init('input', '等于', 'len').where(verifyKeys[2], '==', '==').inputNumber().get(),
      //         Create.init('input', '大于等于', 'lenMin').where(verifyKeys[2], '==', ['>=', 'between']).inputNumber().get(),
      //         Create.init('input', '小于等于', 'lenMax').where(verifyKeys[2], '==', ['<=', 'between']).inputNumber().get(),
      //         Create.init('input', '长度提示', 'lengthErrMsg').where(verifyKeys[2], '!=', '').get(),
      //       ]).get()
      //     ]).get()
      //   ]).get())
      //   break
      // case 'showWhere':
      //   data.push(Create.init('panel').panel('显示条件', false).child([
      //     Create.init('object', '', 'showWhere').child([
      //       Create.init('node-select', '控制表单', 'key').tip('要通过哪个表单控制此组件显示').option({ type: 'where' }).get(),
      //       Create.init('select', '判断规则', 'judge').select([
      //         { text: '等于', value: '==' },
      //         { text: '不等于', value: '!=' },
      //         { text: '大于', value: '>' },
      //         { text: '小于', value: '<' },
      //         { text: '大于等于', value: '>=' },
      //         { text: '小于等于', value: '<=' }
      //       ]).get(),
      //       Create.init('array-one', '判断值', 'value').tip('当规则为等于或者不等于时可以设置多个值，否则只有第一个值有效').child([
      //         Create.init('input', '', 0).inputNumber().get(),
      //       ]).get()
      //     ]).get()
      //   ]).get())
      //   break

      default:
        break
    }
  }
  // if (data[0].child.length === 0) {
  //   data.splice(0, 1)
  // }
  return data
}

/**
 * 获取表单
 * @param {*} styles styles 样式单独处理
 * @param {*} attr 属性的表单
 */
export const getBaseAttrForm = (styles, attr) => {
  if (typeof attr === 'object' && !Array.isArray(attr)) {
    attr = [attr]
  }
  const tabs = []
  if (attr && attr.length) {
    tabs.push({
      nodeName: 'view',
      key: getKey(),
      tabName: '属性',
      child: attr
    })
  }
  if (styles) {
    if (!Array.isArray(styles)) {
      styles = [styles]
    }
    tabs.push(...styles.map(item => ({
      nodeName: 'edit-style',
      key: getKey(),
      tabName: item.text,
      name: item.name,
      styles: item.styles,
    })))
  }

  return [
    {
      nodeName: 'form',
      key: getKey(),
      child: [
        {
          nodeName: 'edit-tab',
          position: 'top',
          key: getKey(),
          child: tabs
        }
      ]
    }
  ]
}

/**
 * 返回表单name的Index
 * @returns
 */
export const getNameIndex = () => ++nameIndex

export const componentCate = {
  base: {
    text: '基础',
    name: 'base'
  },
  form: {
    text: '表单',
    name: 'form'
  }
}

export const componentList = {
  root: {
    text: '根节点',
    attr() {
      return {
        width: 750
      }
    },
    form() {
      return getBaseAttrForm({
        name: 'style',
        text: '样式',
        styles: ['backgroundColor']
      }, [
        Create.init('input', '页面宽', 'width', '页面宽度').tip('1、仅在编辑时有效\n2、输入数字表示相对页面宽度，适用于移动端（750代表100%宽度）\n3、可以输入100%表示全部宽度').get()
      ])
    },
    child: {}
  }
}

const config = {
  // 组件分类
  cate: [
    { text: '内容', name: 'view' },
    { text: '容器', name: 'layout' },
    { text: '表单', name: 'form' }
  ],
  // 组件列表
  list: {
    root: {
      text: '根节点',
      publicAttr: [
        'child'
      ],
      attr() {
        return {
          ...getPublicAttr.call(this),
          width: 750
        }
      },
      form() {
        return getBaseAttrForm({
          name: 'style',
          text: '样式',
          styles: ['backgroundColor']
        }, [
          Create.init('input', '页面宽', 'width', '页面宽度').tip('1、仅在编辑时有效\n2、输入数字表示相对页面宽度，适用于移动端（750代表100%宽度）\n3、可以输入100%表示全部宽度').get()
        ])
      }
    },

  }
}

export default config

/**
 * 定义一个组件标识
 * @param {*} name 英文标识 唯一标识
 * @param {*} text 分类名称
 */
export const defineComponentCate = (name, text) => {
  if (componentCate[name]) {
    console.warn(name + '分类已定义')
    return
  }
  componentCate[name] = {
    name,
    text
  }
}

/**
 * 定义一个组件配置
 * @param {String} key 组件标识
 * @param {Component} value 组件
 */
export const defineComponentConfig = (key, value) => {
  if (key === 'root') {
    console.warn('不能定义根节点属性')
    return
  }
  value.nodeName = key
  componentList[key] = value
}

/**
 * 定义多个组件配置
 * @param {Object} data 一个由key: 组件组成的对象
 */
export const defineComponentConfigs = data => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      defineComponentConfig(key, data[key])
    }
  }
}
