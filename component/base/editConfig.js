import { getBaseAttrForm, FormCreate, styleNode, componentCate } from '../../design/min'

export default {
  view: {
    nodeName: 'view',
    text: '弹性布局',
    cate: componentCate.base,
    attr() {
      return {
        child: [],
        style: {}
      }
    },
    form() {
      return getBaseAttrForm({
        text: '样式',
        name: 'style',
        styles: styleNode.view
      })
    },
    child: {}
  },
  text: {
    nodeName: 'text',
    text: '文本',
    cate: componentCate.base,
    attr() {
      return {
        style: {},
        text: '文本内容',
        numberOfLines: ''
      }
    },
    form() {
      return getBaseAttrForm({
        text: '样式',
        name: 'style',
        styles: styleNode.text
      }, [
        FormCreate.input('文本内容', 'text', 'textarea'),
        FormCreate.input('溢出隐藏', 'numberOfLines', 'select', [
          { text: '不隐藏', value: '' },
          { text: '1行', value: 1 },
          { text: '2行', value: 2 },
          { text: '3行', value: 3 },
          { text: '4行', value: 4 },
          { text: '5行', value: 5 },
          { text: '10行', value: 10 },
          { text: '20行', value: 20 }
        ])
      ])
    }
  },
  image: {
    nodeName: 'image',
    text: '图片',
    cate: componentCate.base,
    attr() {
      return {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHHRSTlMAgEDfx2Mp5MTUmTnbzLAzEuzAUCAK9rhdSTsZZXKUYgAAAKpJREFUOMu9k9kKwyAQRV2TWLMvXc//f2dLaFIftFIouQ8y4MHrjFdxkKQmIi33fRLaiBIlIlKU7wrizvAbYCsq+wVQAKg0YJBCYhJAsORPyN8h30Vx0vpUpOcwO4CmTwEPQ+19zZgA+pGhE6IraQPg47tc4L4+1UAI9AbACdHundzOIdDivHfUDUyb2RQCuileNhVg43OY12K52i6bhz8D2dBmY5/9OMfoCXLCGxzKO9XVAAAAAElFTkSuQmCC',
        mode: 'scaleToFill'
      }
    },
    form() {
      return getBaseAttrForm({
        text: '样式',
        name: 'style',
        styles: styleNode.image
      }, [
        // FormCreate.init('upload', '图片', 'src').option({ max: 1, type: 'media', mediaType: 'image' }).get(),
        FormCreate.input('裁剪', 'mode', 'select', [
          { text: '缩放', value: 'scaleToFill' },
          { text: '缩放显示长边', value: 'aspectFit' },
          { text: '缩放显示短边', value: 'aspectFill' },
          { text: '自动高度', value: 'widthFix' },
          { text: '自动宽度', value: 'heightFix' }
        ])
      ])
    }
  },
  icon: {
    nodeName: 'icon',
    text: '图标',
    cate: componentCate.base,
    attr() {
      return {
        style: {},
        name: ['icon', 'bangzhu1'],
        size: 32,
        color: '#333'
      }
    },
    form() {
      return getBaseAttrForm({
        text: '样式',
        name: 'style',
        styles: styleNode.text
      }, [
        FormCreate.icon('图标', 'name'),
        FormCreate.input('字号', 'size'),
        FormCreate.input('颜色', 'color', 'color')
      ])
    }
  },
  video: {
    nodeName: 'video',
    text: '视频',
    cate: componentCate.base,
    attr() {
      return {
        objectFit: 'contain',
      }
    },
    form() {
      return getBaseAttrForm({
        text: '样式',
        name: 'style',
        styles: ['width', 'height', 'backgroundColor']
      }, [
        // FormCreate.init('upload', '视频', 'src').option({ max: 1, type: 'media', mediaType: 'video' }).get(),
        FormCreate.switch('显示控件', 'controls'),
        FormCreate.switch('显示控件', 'controls'),
        FormCreate.switch('自动播放', 'autoplay'),
        FormCreate.switch('循环播放', 'loop'),
        FormCreate.switch('静音播放', 'muted'),
        FormCreate.switch('全屏播放按钮', 'showFullscreenBtn'),
        FormCreate.switch('显示底部播放按钮', 'showPlayBtn'),
        FormCreate.switch('显示中间播放按钮', 'showCenterPlayBtn'),
        FormCreate.switch('开启手势控制进度条', 'enableProgressGesture'),

        FormCreate.input('裁剪模式', 'objectFit', 'select', [
          { text: '包含', value: 'contain' },
          { text: '填充', value: 'fill' },
          { text: '覆盖', value: 'cover' }
        ]),
      ])
    }
  },
  swiper: {
    nodeName: 'swiper',
    text: '幻灯片',
    cate: componentCate.base,
    attr() {
      return {
        child: [],
        style: {},
        displayMultipleItems: 1,
        easingFunction: 'default'
      }
    },
    form() {
      return getBaseAttrForm({
        text: '样式',
        name: 'style',
        styles: ['width', 'height', 'backgroundColor', 'borderRadius', 'position', 'overflow']
      }, [
        FormCreate.switch('显示指示点', 'indicatorDots'),
        FormCreate.input('指示点颜色', 'indicatorColor', 'color'),
        FormCreate.input('选中指示点颜色', 'indicatorActiveColor', 'color'),
        FormCreate.switch('自动切换', 'autoplay'),
        FormCreate.input('默认指示点', 'current'),
        FormCreate.input('自动切换时间间隔', 'interval'),
        FormCreate.input('滑动动画时长', 'duration'),
        FormCreate.switch('衔接滑动', 'circular'),
        FormCreate.switch('纵向滚动', 'vertical'),
        FormCreate.input('同时显示数量', 'displayMultipleItems'),
        FormCreate.input('动画类型', 'easingFunction', 'select', [
          { text: '默认缓动函数', value: 'default' },
          { text: '线性动画', value: 'linear' },
          { text: '缓入动画', value: 'easeInCubic' },
          { text: '缓出动画', value: 'easeOutCubic' },
          { text: '缓入缓出动画', value: 'easeInOutCubic' }
        ])
      ])
    },
    child: {
      disable: {
        // 组件
        comp: ['swiper-item'],
        // 组件判断是否是包含这些组件还是不包含这些组件
        // 为true表示白名单机制，否则是黑名单机制
        contain: true
      }
    },
  },
  'swiper-item': {
    nodeName: 'swiper-item',
    text: '幻灯片项',
    cate: componentCate.base,
    // 在编辑模式下要加在 拖拽组件上的样式
    designItemStyle() {
      return {
        width: '100%',
        height: '100%',
        position: 'absolute'
      }
    },
    attr() {
      return {
        child: [],
        style: {},
      }
    },
    form() {
      return getBaseAttrForm([])
    },
    child: {
      disable: {
        // 组件
        comp: ['swiper-item'],
        // 组件判断是否是包含这些组件还是不包含这些组件
        contain: false,
      }
    },
    parent: {
      disable: {
        // 组件
        comp: ['swiper'],
        // 组件判断是否是包含这些组件还是不包含这些组件
        contain: true,
      }
    }
  },


}
