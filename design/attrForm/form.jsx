import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { recursionSetValue } from 'taro-tools'
import './style.scss'

export const FormContext = React.createContext({})

const noop = () => { }

export default ({ onChange = noop, defauleValue, children }) => {

  const [formValue, setFormValue] = useState({
    style: {}
  })

  const updataValue = useCallback((name, value) => {
    recursionSetValue(name, formValue, value)
    setFormValue({ ...formValue })
    onChange({ ...formValue })
  }, [formValue, onChange])

  useEffect(() => {
    setFormValue(defauleValue)
  }, [defauleValue])

  const context = useMemo(() => ({
    updataValue,
    formValue
  }), [updataValue, formValue])

  return <FormContext.Provider value={context}>
    {children}
  </FormContext.Provider>
}
