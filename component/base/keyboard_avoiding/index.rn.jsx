import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import './index.scss'

export default ({ children, isForm }) => {
  return isForm ?
    <KeyboardAvoidingView className='keyboard-avoiding' behavior={Platform.OS !== 'android' ? 'padding' : ''} enabled>
      {children}
    </KeyboardAvoidingView>
    : <>{children}</>
}
