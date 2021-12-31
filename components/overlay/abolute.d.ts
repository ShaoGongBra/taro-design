import { LegacyRef, ComponentType } from 'react'

interface AboluteProps {
  /** 引用 */
  ref?: LegacyRef<any>
}

/**
 * 将内容添加到顶层
 * 此组件需要配合TopView组件使用
 * @example
 * ```jsx
 * <Abolute>
 *   <Text>此处的内容将会添加在和TopView组件相同的位置上</Text>
 * </Abolute>
 * ```
 */
export const Abolute: ComponentType<AboluteProps>
