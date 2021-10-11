import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from 'react'
import { View } from '@tarojs/components'
import { TopView } from 'taro-design/component'
import { stopPropagation } from 'taro-tools'
import classNames from 'classnames'
import './modal.scss'

const ModalContent = forwardRef(({ children, overlayOpacity = 0.2, onClose }, ref) => {
  const [show, setShow] = useState(false)

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

export default ({ children, show, maskClosable = true, overlayOpacity, onClose }) => {
  const key = useRef(null)

  const ref = useRef(null)

  const close = useCallback(() => {
    if (maskClosable) {
      ref.current.hide()
      setTimeout(() => {
        onClose?.()
        TopView.remove(key.current)
        key.current = null
      }, 200)
    }
  }, [maskClosable, onClose])

  useEffect(() => {
    if (show && !key.current) {
      key.current = TopView.add(<ModalContent ref={ref} onClose={close} overlayOpacity={overlayOpacity}>{children}</ModalContent>)
    } else if (!show && key.current) {
      ref.current.hide()
      setTimeout(() => {
        TopView.remove(key.current)
        key.current = null
      }, 200)
    }
  }, [children, show, overlayOpacity, close])

  return <></>
}
