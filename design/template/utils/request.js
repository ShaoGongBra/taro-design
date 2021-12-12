import { request as oldRequest, throttleRequest as oldThrottleRequest } from 'taro-tools'
import { userInfo } from './user'


const config = {
  /**
   * 请求配置
   * 请求支持json及form格式
   */
  request: {
    // 请求域名及端口号 请勿以/结尾
    origin: 'https://taro-design.platelet.xyz',
    // 公共请求路径
    path: 'api',
    /**
     * Content-Type 请求媒体类型 有效值如下
     * 设置这个值将用户post请求的时候设置请求body类型
     * application/json
     * application/x-www-form-urlencoded
     */
    contentType: 'application/json',
    /**
     * 公共请求header
     * 可以传入函数或者对象 函数需要返回一个对象
     */
    header: () => {
      const header = {
        Accept: 'application/json',
        Token: userInfo.get().token || ''
      }
      return header
    },
    /**
     * 要携带在请求上的参数
     * 根据method请求类型 参数自动设置在GET或者POST
     * 可以传入函数或者对象 函数需要返回一个对象
     */
    data: {

    },
    /**
     * 要携带在请求url上的参数
     * 即使使用POST请求时 也在GET参数上
     * 可以传入函数或者对象 函数需要返回一个对象
     */
    getData: {

    }
  },
  /**
   * 返回结果配置
   * 返回结果仅支持JSON格式数据
   */
  result: {
    /**
     * 成功的code
     * code对不上，请求将会走catch方法
     */
    succesCode: 1,
    /**
     * 请求失败的标准code
     * 这个code将用于内部使用
     */
    errorCode: 0,
    /**
     * 返回值获取code字段
     * 多级请用数组表示
     * 可以传入函数处理数据
     */
    code: ['data', 'code'],
    /**
     * 返回值获取提示信息的字段
     * 多级请用数组表示
     * 可以传入函数处理数据
     */
    message: ['data', 'msg'],
    /**
     * 要返回到请求结果的字段
     * 当code对比成功时返回此值
     * 多级请用数组表示
     * 可以传入函数处理数据
     */
    data: ['data', 'data'],
  }
}

/**
 * 封装当前模块请求
 */
const request = params => oldRequest({ config, ...params })

// 请求封装
const throttleRequest = (params, mark) => oldThrottleRequest({ config, ...params }, mark)

export {
  request,
  throttleRequest
}
