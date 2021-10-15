import Taro from '@tarojs/taro'
import { getKey } from 'taro-tools'
import { getPublicAttr, getPublicAttrForm, getBaseAttrForm, FormCreate, componentCate, styleNode } from '../../design/min'
import { nodeCreate, componentList } from '../../render'

const commonForm = (form = [], style) => getBaseAttrForm(style, [
  FormCreate.input('数据库名', 'name'),
  FormCreate.switch('禁用', 'disabled'),
  ...form
])

export default {
  form: {
    nodeName: 'form',
    text: '表单',
    cate: componentCate.form,
    attr() {
      return {
        itemStyle: {},
        textStyle: {},
        tipStyle: {}
      }
    },
    form() {
      return getBaseAttrForm([
        {
          text: '项目样式',
          name: 'itemStyle',
          styles: styleNode.view
        },
        {
          text: '标题样式',
          name: 'textStyle',
          styles: styleNode.text
        },
        {
          text: '提示文字样式',
          name: 'tipStyle',
          styles: styleNode.text
        }
      ], [

      ])
    },
    child: {}
  },
  'form-item': {
    nodeName: 'form-item',
    text: '表单项',
    cate: componentCate.form,
    attr() {
      return {
        text: '',
        tip: ''
      }
    },
    form() {
      return getBaseAttrForm(null, [
        FormCreate.input('字段名', 'text'),
        FormCreate.input('字段提示', 'tip'),
      ])
    },
    child: {
      max: 1
    }
  },
  input: {
    nodeName: 'input',
    text: '输入框',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
    // 支持的公共属性
    attr() {
      return {
        ...getPublicAttr.call(this),
        type: 'text', // 绑定在组件上的弹出键盘类型
        placeholder: '请输入',
        password: false, // 密码框
        multiline: false, // 多行文本
        maxLength: 140, // 最大文本数
        leftIcon: [], // 左侧图标
        focus: false, // 是否获得焦点 每个页面的所有表单中只能设置一个input获得焦点
      }
    },
    form() {
      return commonForm([
        FormCreate.switch('多行文本', 'multiline'),
        FormCreate.input('键盘类型', 'type', 'select', [{ text: '文本', value: 'text' }, { text: '数字', value: 'number' }]),
        FormCreate.input('为空提示', 'placeholder'),
        FormCreate.switch('密码框', 'password'),
        FormCreate.switch('自动聚焦', 'focus'),
        FormCreate.input('最大文本数', 'maxLength'),
        FormCreate.icon('左侧图标', 'leftIcon'),
      ])
    }
  },
  select: {
    nodeName: 'select',
    text: '选择框',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
    attr() {
      return {
        ...getPublicAttr.call(this),
        type: 'radio', // radio 单选 checkbox 多选
        mode: 'show', // show 直接展示显示 select下拉选择
        theme: 'text', // 主题  text文本形式 button按钮形式 card卡片形式 image图片 color颜色
        option: [
          { text: '选项1', value: '1' },
          { text: '选项2', value: '2' },
          { text: '选项3', value: '3' }
        ]
      }
    },
    form() {
      return commonForm([
        FormCreate.input('选择类型', 'type', 'select', [{ text: '单选', value: 'radio' }, { text: '多选', value: 'checkbox' }]),
        FormCreate.input('是否弹出', 'mode', 'select', [{ text: '直接展示', value: 'show' }, { text: '弹出展示', value: 'picker' }]),
        FormCreate.input('样式', 'theme', 'select', [
          { text: '文本形式', value: 'text', image: '' },
          { text: '按钮形式', value: 'button', image: '' },
          { text: '卡片形式', value: 'card', image: '' },
          { text: '图片', value: 'image', image: '' },
          { text: '颜色', value: 'color', image: '' }
        ]),
        nodeCreate('view', {
          style: { padding: 20 }
        }, nodeCreate('array-two', {
          style: { flexDirection: 'column', alignItems: 'stretch' },
          compTextStyle: { textAlign: 'left' },
          name: 'option'
        }, [
          nodeCreate('array-two-item', { text: '文本', style: { width: 200 } }, nodeCreate('input', { name: 'text' })),
          nodeCreate('array-two-item', { text: '值', style: { width: 200 } }, nodeCreate('input', { name: 'value' })),
          nodeCreate('array-two-item', { text: '图片', style: { width: 200 } }, nodeCreate('input', { name: 'image' })),
          nodeCreate('array-two-item', { text: '描述', style: { width: 200 } }, nodeCreate('input', { name: 'desc' })),
          nodeCreate('array-two-item', { text: '颜色', style: { width: 200 } }, nodeCreate('color', { name: 'color' }))
        ]))
      ])

      // const key = getKey()
      // return [
      //   ...getPublicAttrForm.call(this),
      //   FormCreate.init('panel').panel(this.text + '属性').child([
      //     FormCreate.init('select', '选择类型', 'type').select([{ text: '单选', value: 'radio' }, { text: '多选', value: 'checkbox' }]).get(),
      //     FormCreate.init('select', '是否弹出', 'mode').select([{ text: '直接展示', value: 'show' }, { text: '弹出展示', value: 'picker' }]).get(),
      //     FormCreate.init('select', '样式', 'theme', key).select([
      //       { text: '文本形式', value: 'text', image: '' },
      //       { text: '按钮形式', value: 'button', image: '' },
      //       { text: '卡片形式', value: 'card', image: '' },
      //       { text: '图片', value: 'image', image: '' },
      //       { text: '颜色', value: 'color', image: '' }
      //     ], 'radio', 'show', 'text').get(),
      //     FormCreate.init('array-two', '选项', 'option').style({ flexDirection: 'column', alignItems: 'stretch' }).option({ compTextStyle: { textAlign: 'left' } }).child([
      //       FormCreate.init('input', '文本', 'text').option({ parentAttr: { style: { width: 200 } } }).where(key, '!=', 'color').get(),
      //       FormCreate.init('input', '值', 'value').option({ parentAttr: { style: { width: 150 } } }).get(),
      //       FormCreate.init('upload', '图片', 'image').option({ parentAttr: { style: { width: 200 } }, max: 1, type: 'media', mediaType: 'image' }).where(key, '==', ['card', 'image', 'button']).get(),
      //       FormCreate.init('input', '描述', 'desc').option({ parentAttr: { style: { width: 200 } } }).where(key, '==', ['card', 'text', 'image']).get(),
      //       FormCreate.init('color', '颜色', 'color').option({ parentAttr: { style: { width: 200 } } }).where(key, '==', 'color').get()
      //     ]).get()
      //   ]).get()
      // ]
    }
  },
  switch: {
    nodeName: 'switch',
    text: '开关',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
    attr() {
      return getPublicAttr.call(this)
    },
    form() {
      return commonForm()
    }
  },
  check: {
    nodeName: 'check',
    text: '验证',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
    attr() {
      return {
        ...getPublicAttr.call(this),
        title: '请同意验证'
      }
    },
    form() {
      return commonForm([
        FormCreate.input('选框提示', 'title')
      ])
    }
  },
  steep: {
    nodeName: 'steep',
    text: '进步器',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
    attr() {
      return {
        ...getPublicAttr.call(this),
        min: 0, // 最小值
        max: 10, // 最大值
        step: 1, // 步长
      }
    },
    form() {
      return commonForm([
        FormCreate.input('最小值', 'min'),
        FormCreate.input('最大值', 'max'),
        FormCreate.input('步长', 'step')
      ])
    }
  },
  slider: {
    nodeName: 'slider',
    text: '滑块',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
    attr() {
      return {
        ...getPublicAttr.call(this),
        min: 0, // 最小值
        max: 10, // 最大值
        step: 1, // 步长
      }
    },
    form() {
      return commonForm([
        FormCreate.input('最小值', 'min'),
        FormCreate.input('最大值', 'max'),
        FormCreate.input('步长', 'step')
      ])
    }
  },
  rate: {
    nodeName: 'rate',
    text: '评分',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
    attr() {
      return {
        ...getPublicAttr.call(this),
        rule: 100, // 计算规则 给出满分将按照满分计算value对应的分数
      }
    },
    form() {
      return commonForm([
        FormCreate.input('满分', 'rule')
      ])
    }
  },
  date: {
    nodeName: 'date',
    text: '日期选择',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
    attr() {
      return {
        ...getPublicAttr.call(this),
        start: '', // 开始日期
        end: '', // 结束日期
        fields: 'day', // 有效值 year,month,day，表示选择器的粒度
      }
    },
    form() {
      // 需要加一个日期选择器
      return commonForm([
        FormCreate.input('开始日期', 'start'),
        FormCreate.input('结束日期', 'end'),
        FormCreate.input('粒度', 'fields', 'select', [
          { text: '年选择', value: 'year' },
          { text: '年月选择', value: 'month' },
          { text: '年月日选择', value: 'day' }
        ])
      ])
    }
  },
  time: {
    nodeName: 'time',
    text: '时间选择',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
    attr() {
      return {
        ...getPublicAttr.call(this),
        start: '', // 开始时间
        end: '', // 结束时间
      }
    },
    form() {
      return commonForm([
        FormCreate.input('开始时间', 'start'),
        FormCreate.input('结束时间', 'end')
      ])
    }
  },
  color: {
    nodeName: 'color',
    text: '颜色选择',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
    attr() {
      return getPublicAttr.call(this)
    },
    form() {
      return commonForm()
    }
  },
  upload: {
    nodeName: 'upload',
    text: '上传',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'verify', 'showWhere'],
    attr() {
      return {
        ...getPublicAttr.call(this),
        max: 1, // 最大文件数
        type: 'media', // 上传类型 media媒体 file文件
        mediaType: 'image', // image 图片 video 视频
        exts: [], // 支持的文件扩展名 当选择文件时有效
      }
    },
    form() {
      return commonForm([
        FormCreate.input('最大文件数', 'max'),
        FormCreate.input('上传类型', 'mediaType', 'select', [
          { text: '图片', value: 'image' },
          { text: '视频', value: 'video' },
          { text: '图片和视频', value: 'all' }
        ]),
      ])
      return [
        ...getPublicAttrForm.call(this),
        FormCreate.init('panel').panel(this.text + '属性').child([
          FormCreate.init('input', '最大文件数', 'max').inputNumber().get(),
          // FormCreate.init('select', '上传类型', 'type', key).select([
          //   { text: '影音', value: 'media' },
          //   { text: '普通文件', value: 'file' }
          // ]).get(),
          FormCreate.init('select', '上传类型', 'mediaType').select([
            { text: '图片', value: 'image' },
            { text: '视频', value: 'video' },
            { text: '图片和视频', value: 'all' }
          ]).get(),
          // FormCreate.init('array-one', '扩展名', 'exts').where(key, '==', 'file').child([
          //   FormCreate.init('input', '扩展名', '0').get(),
          // ]).get(),
        ]).get()
      ]
    }
  },
  object: {
    nodeName: 'object',
    text: '对象表单',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'showWhere', 'child'],
    attr() {
      return getPublicAttr.call(this)
    },
    form() {
      return commonForm()
      return [
        ...getPublicAttrForm.call(this)
      ]
    },
    child: {
      disable: {

      }
    }
  },
  array: {
    nodeName: 'array',
    text: '数组表单',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'showWhere', 'child'],
    attr() {
      return getPublicAttr.call(this)
    },
    form() {
      return commonForm([
        nodeCreate('view', { style: { padding: 20 } }, [
          nodeCreate('text', {
            style: {
              fontSize: Taro.pxTransform(28),
              fontWeight: 'bold'
            },
            text: '组件说明'
          }),
          nodeCreate('text', {
            style: {
              fontSize: Taro.pxTransform(24),
              lineHeight: 1.5
            },
            text: '1、数组表单内添加的表单组件设置name属性无效，会被重置\n2、数组表单内可以添加高级表单'
          }),
        ])
      ])
    },
    child: {
      disable: {

      }
    }
  },
  'array-one': {
    nodeName: 'array-one',
    text: '一维数组',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'showWhere', () => ['child', [], { max: 1 }]],
    attr() {
      return getPublicAttr.call(this)
    },
    form() {
      return commonForm([
        nodeCreate('view', { style: { padding: 20 } }, [
          nodeCreate('text', {
            style: {
              fontSize: Taro.pxTransform(28),
              fontWeight: 'bold'
            },
            text: '组件说明'
          }),
          nodeCreate('text', {
            style: {
              fontSize: Taro.pxTransform(24),
              lineHeight: 1.5
            },
            text: '1、一维数组内添加的表单组件设置name属性无效，会被重置\n2、一维数组内仅可添加基础表单\n3、一维数组内仅可添加一个表单'
          }),
        ])
      ])
    },
    child: {
      disable: nodeName => !componentList[nodeName]?.designConfig?.isForm,
      max: 1
    }
  },
  'array-two': {
    nodeName: 'array-two',
    text: '二维数组',
    cate: componentCate.form,
    publicAttr: ['name', 'text', 'tip', 'disabled', 'showWhere', 'child'],
    attr() {
      return getPublicAttr.call(this)
    },
    form() {
      return commonForm()
    },
    child: {
      disable: {
        // 组件
        comp: ['array-two-item'],
        // 组件判断是否是包含这些组件还是不包含这些组件
        contain: true
      }
    },
  },
  'array-two-item': {
    nodeName: 'array-two-item',
    text: '二维数组项',
    cate: componentCate.form,
    attr() {
      return {
        child: [],
        style: {
          width: 150
        },
        text: '项目',
        tip: ''
      }
    },
    form() {
      return getBaseAttrForm({
        text: '样式',
        name: 'style',
        styles: ['width']
      }, [
        FormCreate.input('名称', 'text'),
        FormCreate.input('提示', 'tip')
      ])
    },
    child: {
      max: 1,
      disable: nodeName => !componentList[nodeName]?.designConfig?.isForm
    },
    parent: {
      disable: {
        // 组件
        comp: ['array-two'],
        // 组件判断是否是包含这些组件还是不包含这些组件
        contain: true,
      }
    }
  },
  button: {
    nodeName: 'button',
    text: '按钮',
    cate: componentCate.form,
    publicAttr: ['disabled', 'showWhere'],
    attr() {
      return {
        ...getPublicAttr.call(this),
        text: '按钮',
        color: '#333',
        plain: false,
        size: 'm',
        radiusType: 'fillet'
      }
    },
    form() {
      return getBaseAttrForm(null, [
        FormCreate.switch('禁用', 'disabled'),
        FormCreate.input('按钮文字', 'text'),
        FormCreate.input('按钮文字', 'color', 'color'),
        FormCreate.switch('是否镂空', 'plain'),
        FormCreate.input('按钮尺寸', 'size', 'select', [
          { text: '小号', value: 's' },
          { text: '中号', value: 'm' },
          { text: '大号', value: 'l' },
          { text: '一加', value: 'xl' },
          { text: '二加', value: 'xxl' },
          { text: '三加', value: 'xxxl' }
        ]),
        FormCreate.input('圆角类型', 'radiusType', 'select', [
          { text: '圆角', value: 'fillet' },
          { text: '直角', value: 'right-angle' },
          { text: '较小的圆角', value: 'fillet-min' }
        ])
      ])
    }
  },
}
