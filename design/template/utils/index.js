import { event } from 'taro-tools'
import { isLogin } from './user'

/**
 * 添加值模板
 * @param {*} nodes
 * @returns
 */
export const addTemplate = nodes => {
  return new Promise((resolve, reject) => {
    if (isLogin(true, () => addTemplate(nodes).then(resolve).catch(reject))) {
      event.emit('template-add-show', nodes)
      const callback = status => {
        event.remove('template-add-callback', callback)
        status ? resolve() : reject()
      }
      event.add('template-add-callback', callback)
    }
  })
}
