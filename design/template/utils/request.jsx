import md5 from 'crypto-js/md5'

import { request as oldRequest, searchQuick as oldSearchQuick } from 'taro-tools'

const config = {
  /**
   * 请求配置
   * 请求支持json及form格式
   */
  request: {
    // 请求域名及端口号 请勿以/结尾
    origin: 'http://192.168.50.31',
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
    header: ({ url }) => {

      const signString = [`url=${url}`]


      // 时间戳
      const timestamp = Date.now() / 1000 | 0
      signString.push(`timestamp=${timestamp}`)

      // SECRET_KEY
      signString.push('key=jjpR3m8Gh46kZ9nJd6fAQK8Iedvvq1iQ')

      // 用户tokan
      const { token } = global.userInfo

      const header = {
        Accept: 'application/json',
        'Content-MD5': md5(signString.join('&')).toString().toUpperCase(),
        'Content-Date': timestamp.toString(),
        AccessKey: '20388049'
      }
      if (token) {
        header.Authorization = 'Bearer ' + token
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
    succesCode: 200,
    /**
     * 请求失败的标准code
     * 这个code将用于内部使用
     */
    errorCode: 500,
    /**
     * 返回值获取code字段
     * 多级请用数组表示
     * 可以传入函数处理数据
     */
    code: 'statusCode',
    /**
     * 返回值获取提示信息的字段
     * 多级请用数组表示
     * 可以传入函数处理数据
     */
    message: ['data', 'message'],
    /**
     * 要返回到请求结果的字段
     * 当code对比成功时返回此值
     * 多级请用数组表示
     * 可以传入函数处理数据
     */
    data: ['data', 'data'],
  },
  /**
   * 上传配置
   * 上传的请求头将强制设置为 文件流
   */
  upload: {
    // 上传api api后可以携带参数
    api: 'member/Upload/index',
    // 上传文件时的字段名
    requestField: 'file',
    // 返回值的图片路径的url 如果有多级可以配置数组 如[0, url]
    resultField: ['data', 'result', 0, 'url'],
  }
}

/**
 * 封装当前模块请求
 */
const request = params => oldRequest({ config, ...params })

// 请求封装
const searchQuick = (params, mark) => oldSearchQuick({ config, ...params }, mark)

export {
  request,
  searchQuick
}
