import { event, noop } from "taro-tools"

const userInfo = {
  get() {
    const data = localStorage.getItem('template_user')
    if (data) {
      return JSON.parse(data)
    }
    return {}
  },
  set(val) {
    const user = this.get()
    localStorage.setItem('template_user', JSON.stringify({ ...user, ...val }))
  },
  clear() {
    localStorage.removeItem('template_user')
  }
}

const isLogin = (openLogin, callback = noop) => {
  const status = !!userInfo.get().token
  if (!status && openLogin) {
    login().then(callback).catch(noop)
  }
  return status
}

/**
 * 调用登录
 * @returns
 */
const login = () => {
  return new Promise((resolve, reject) => {
    event.emit('template-auth-show')
    const callback = status => {
      event.remove('template-auth-callback', callback)
      status ? resolve() : reject()
    }
    event.add('template-auth-callback', callback)
  })
}

/**
 * 退出登录
 */
const loginOut = () => {
  userInfo.clear()
}

export {
  isLogin,
  login,
  loginOut,
  userInfo
}
