declare namespace styled {
  interface StyleGroupItem {
    /** 分组中文名称 */
    name: string
    /** 分组包含的style */
    styles: string[]
  }
}

/**
 * 定义了样式的分组信息
 */
export const styleGroup: styled.StyleGroupItem[]

/**
 * 定义了某个组件支持的样式列表
 */
export const styleNode: {
  /** View组件支持的style */
  view: string[]
  /** Text组件支持的style */
  text: string[]
  /** Image组件支持的style */
  image: string[]
  /** 定义的其他组件支持的style */
  [propName: string]: string[]
}
