import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from 'react'
import { View } from '@tarojs/components'
import { stopPropagation } from 'taro-tools'
import classNames from 'classnames'
import TopView from './top_view'
import './modal.scss'

const ModalContent = forwardRef(({ children, animation, overlayOpacity = 0.2, onClose }, ref) => {
  const [show, setShow] = useState(!animation)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 50)
  }, [])

  useImperativeHandle(ref, () => ({
    hide() {
      setShow(false)
    }
  }))

  return <View onClick={onClose} className='modal-view' style={{ backgroundColor: show ? `rgba(0, 0, 0, ${overlayOpacity})` : 'rgba(0, 0, 0, 0)' }}>
    <View
      className={classNames('modal-view__main', {
        'modal-view__main--show': show
      })}
      onClick={stopPropagation}
    >
      {children}
    </View>
  </View>
})

export default ({ children, show, animation = true, maskClosable = true, overlayOpacity, onClose }) => {
  const key = useRef(null)

  const ref = useRef(null)

  const close = useCallback(() => {
    if (maskClosable) {
      if (animation) {
        ref.current.hide()
        setTimeout(() => {
          onClose?.()
          TopView.remove(key.current)
          key.current = null
        }, 200)
      } else {
        onClose?.()
        TopView.remove(key.current)
        key.current = null
      }
    }
  }, [maskClosable, animation, onClose])

  useEffect(() => {
    return () => {
      TopView.remove(key.current)
    }
  }, [])

  useEffect(() => {
    if (show) {
      const ele = <ModalContent ref={ref} animation={animation} onClose={close} overlayOpacity={overlayOpacity}>{children}</ModalContent>
      if (key.current) {
        TopView.update(key.current, ele)
      } else {
        key.current = TopView.add(ele)
      }
    } else if (!show && key.current) {
      if (animation) {
        ref.current.hide()
        setTimeout(() => {
          TopView.remove(key.current)
          key.current = null
        }, 200)
      } else {
        TopView.remove(key.current)
        key.current = null
      }
    }
  }, [children, show, animation, overlayOpacity, close])

  return <></>
}
