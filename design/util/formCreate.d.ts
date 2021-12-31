import { design } from '../components/edit'

export class FormCreate {
  /**
   * 创建一个表单的分组
   * @param name 分组名称
   * @param child 分组内容
   */
  static group(name: string, child: design.Node[]): design.Node

  /**
   * 创建一个输入框 选择框 颜色选择框
   * @param text 显示名称
   * @param name 提交name
   * @param type 类型 text输入框 select选择框（必须设置option参数） color颜色选择 textarea多行文本
   * @param option 提供的下拉选项 当你你同此选项是则则是为此输入框提供几个快捷选项
   */
  static input(
    text: string,
    name: string,
    type?: keyof { text, select, color, textarea },
    option?: Array<{
      /** 选项文本 */
      text: string
      /** 选项value */
      value: string | number
    } | string> | {
      /** 由key value 组成的对象 */
      [propName: string]: string | number
    }): design.Node

  /**
   * 创建一个开关表单
   * @param text 显示名称
   * @param name 提交name
   */
  static switch(text: string, name: string): design.Node

  /**
   * 创建一个图标选择器
   * @param text 显示名称
   * @param name 提交name
   */
  static icon(text: string, name: string): design.Node
}
