import { CSSProperties, Component } from 'react'
import { design } from '../components/edit'

declare namespace config {
  interface ComponentCateItem {
    /** 唯一标识 */
    name: string
    /** 名称 */
    text: string
  }
  interface ComponentListItem {
    /** 节点名称 */
    text: string
    /** 组件分类 */
    cate: string,
    /** 返回默认节点属性 */
    attr?: () => {
      /** 组件样式 */
      style?: CSSProperties,
      /** 其他属性 */
      [propName: string]: any
    }
    /** 返回编辑节点的表单组成的nodeList */
    form?: () => design.Node[]
    /**
     * 在编辑模式下要加在 拖拽组件上的样式
     * 因为编辑模式再每个组件外围添加了一个View组件，这个组件可能会影响到布局，当出现这个情况的时候，你可以添加一些样式到这个View上还原你原本的效果
     */
    designItemStyle?: () => CSSProperties
    /**
     * 子组件相关配置
     * 当你的节点需要使用了children这个props，也就是能进行嵌套时，请添加此字段，不添加此字段则不能将其他组件拖动到此组件内部
     */
    child?: {
      /**
       * 配置能添加到组件内的组件，不配置则所有组件都能添加为此组件的子组件
       * 你也可以传入一个函数，函数的参数是待验证的子节点标识，返回true标示禁用
       */
      disable?: (childNodeName: string) => boolean | {
        /** 组件列表 */
        comp: string[]
        /**
         * 组件判断是否是包含这些组件还是不包含这些组件
         * 为true表示白名单机制，否则是黑名单机制
         */
        contain: boolean
      }
      /** 最多能放多少个子节点 不配置则不限制 */
      max?: number
    }
    /**
     * 父组件相关配置
     * 一般用来配置字组件只能放在某些父组件里面
     */
    parent?: {
      /**
       * 配置字组件在哪些父组件中被禁用，也就是说不能放在这些父组件中
       * 你也可以传入一个函数，函数的参数是待验证的父节点标识，返回true标示禁用
       */
      disable?: (childNodeName: string) => boolean | {
        /** 组件列表 */
        comp: string[]
        /**
         * 组件判断是否是包含这些组件还是不包含这些组件
         * 为true表示白名单机制，否则是黑名单机制
         */
        contain: boolean
      }
    }
  }
}

/**
 * 获取表单
 * @param styles styles 样式单独处理
 * @param attr 属性的表单
 */
export function getBaseAttrForm(styles: object, attr: object): void

/**
 * 返回表单name的Index
 */
export function getNameIndex(): number

/**
 * 组件分类
 */
export const componentCate: {
  /** 基础组件 */
  base: config.ComponentCateItem
  /** 表单组件 */
  form: config.ComponentCateItem
  /** 其他定义的分类 */
  [propName: string]: config.ComponentCateItem
}

/**
 * 节点表单相关配置
 */
export const componentList: {
  /** 根节点 */
  root: config.ComponentListItem
  /** 其他定义的组件配置 */
  [propName: string]: config.ComponentListItem
}

/**
 * 定义一个组件分类
 * @param name 英文标识 唯一标识
 * @param text 分类名称
 */
export function defineComponentCate(name: string, text: string): void

/**
 * 定义一个组件配置
 * @param key 组件标识
 * @param component 组件
 */
export function defineComponentConfig(key: string, component: Component): void

/**
 * 定义多个组件配置
 * @param  data 一个由key: 组件组成的对象
 */
export function defineComponentConfigs(data: {
  [propName: string]: Component
}): void
