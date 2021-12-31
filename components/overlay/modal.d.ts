import { LegacyRef, ComponentType } from 'react'

interface ModalProps {
  /**
   * 控制Modal是否显示
   */
  show: boolean
  /** 引用 */
  ref?: LegacyRef<any>
}

/**
 * 全局Modal弹窗
 * 此组件需要配合TopView组件使用
 * @example
 * ```jsx
 * <Modal show>
 *   <Text>此处的内容将会以动画的方式展示在页面中央</Text>
 * </Modal>
 * ```
 */
export const Modal: ComponentType<ModalProps>
