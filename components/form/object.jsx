import React from 'react'

const ObjectForm = ({ children }) => {
  return <>{children}</>
}

ObjectForm.designConfig = {
  defaultValue: () => ({}),
  isForm: true
}

export default ObjectForm
