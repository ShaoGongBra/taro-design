import { useEffect, useRef } from 'react'
import TopView from './top_view'

export default ({ children }) => {
  const key = useRef(null)

  useEffect(() => {
    key.current = TopView.add(children)
    return () => {
      TopView.remove(key.current)
    }
  }, [children])

  return <></>
}
