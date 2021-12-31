import { ComponentType } from 'react'

interface KeyboardAvoidingProps {
  /** 引用 */
  ref?: string | ((node: any) => any)
}

/**
 * 键盘弹起时将会把键盘的部分排除在外 某些页面需要输入框在底部固定的将页面放在此组件内会自动弹起输入框
 * @example
 * <KeyboardAvoiding>
 *  <Text>内容不会被渲染在全面屏的底部操作部分</Text>
 *  <Input />
 * </KeyboardAvoiding>
 */
export const KeyboardAvoiding: ComponentType<KeyboardAvoidingProps>
