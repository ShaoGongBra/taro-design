import React, { useCallback, useContext, useMemo } from 'react'
import classNames from 'classnames'
import { recursionGetValue } from 'taro-tools'
import { FormContext } from '../form'
import './input.scss'

export default ({ name, text, type = 'text', option }) => {

  const { updataValue, formValue } = useContext(FormContext)

  const value = useMemo(() => recursionGetValue(name, formValue) || '', [name, formValue])

  const onUpdataValue = useCallback(e => {
    // color事件合成失败
    e.persist()
    updataValue?.(name, e.target.value)
  }, [updataValue, name])

  return <div className='attr-form-input--root item-child'>
    {type !== 'select' && <div className='input-width'>
      {type === 'text' && <input value={value} className='attr-form-input' placeholder={text} onChange={onUpdataValue} />}
      {type === 'color' && <input value={value} type='color' className='attr-form-input' onChange={onUpdataValue} />}
      {type === 'textarea' && <textarea value={value} className='attr-form-input' onChange={onUpdataValue} />}
    </div>}

    {option && <select
      value={value}
      className={classNames('attr-form-select', { 'disable-input': type === 'select' })}
      onChange={onUpdataValue}
    >
      {
        Array.isArray(option)
          ? option.map(item => <option key={item.value || item} value={item.value || item}>{item.text || item}</option>)
          : Object.keys(option).map(key => <option key={key} value={key}>{option[key]}</option>)
      }
    </select>}
  </div>
}
