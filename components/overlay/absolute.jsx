import { useEffect, useRef } from 'react'
import TopView from './top_view'

export default ({ children }) => {
  const key = useRef(null)

  useEffect(() => {
    return () => {
      TopView.remove(key.current)
    }
  }, [])

  useEffect(() => {
    if (key.current) {
      TopView.update(key.current, children)
    } else {
      key.current = TopView.add(children)
    }
  }, [children])

  return <></>
}
