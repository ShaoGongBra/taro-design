import { componentList } from '../../../design'

/**
 * 获取表单的默认值
 * @param {array} form 表单
 * @return {object} 表单值
 */
const getFormDefaultValue = (form, value = {}) => {
  for (let i = 0, l = form.length; i < l; i++) {
    const item = form[i]
    const config = componentList[item.nodeName]?.Item?.designConfig
    if (item.name !== undefined && value[item.name] !== undefined) {
      continue
    }
    if (config?.isForm) {
      const defaultValue = config?.defaultValue
      if (typeof defaultValue === 'function') {
        value[item.name] = defaultValue(item)
      } else if (typeof defaultValue !== 'undefined') {
        value[item.name] = defaultValue
      }
    }
    // 不是表单 去找子组件是否有表单
    if (item.child && !config?.isForm) {
      getFormDefaultValue(item.child, value)
    }
    // 是一个对象表单 给对象的内容赋值
    if (item.child && config?.isForm && typeof value[item.name] === 'objact' && !Array.isArray(value[item.name])) {
      getFormDefaultValue(item.child, value[item.name])
    }
  }
  return value
}

/**
 * 传入两个值 和判断条件 判断是否正确
 * @param {any} value 要判断的值
 * @param {any} beValue 被判断的值
 * @param {string} judge 判断条件 == | != | > | < | >= | <=
 * == | != 时：string| number | array, string | number将直接比较, array 将内容逐一比较 如果两边都是array只要其中有任何一个值相等,就通过验证（交集）
 * > | < | >= | <= 时：string | number 使用大小判断不支持数组，使用数组可能会得到不准确的结果
 * 所有的验证都是使用的非严格验证 如字符串和数组 '2' == 2 true, true == ''  true, true == '0' false
 * @return {boolean} 是否符合条件
 */
const chechWhere = (value, beValue, judge = '==') => {
  const types = [typeof value, typeof beValue]
  const getValue = () => {
    return typeof beValue === 'object' ? beValue[0] : beValue
  }
  switch (judge) {
    case '>':
      return value > getValue()
    case '<':
      return value < getValue()
    case '>=':
      return value >= getValue()
    case '<=':
      return value <= getValue()
    case '==':
    case '!=':
      let show = false
      if (types[0] !== 'object' && types[1] !== 'object') {
        show = value == beValue
      } else if (types[0] !== 'object') {
        show = beValue.some ? beValue.some(item => item == value) : false
      } else if (types[1] !== 'object') {
        show = value.some ? value.some(item => item == beValue) : false
      } else {
        if (!value.some || !beValue.some) {
          show = false
        } else {
          show = value.some(item => beValue.some(child => child == item))
        }
      }
      return judge === '==' ? show : !show
    default:
      return false
  }
}

export {
  getFormDefaultValue,
  chechWhere
}
