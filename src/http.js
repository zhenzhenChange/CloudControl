import Vue from "vue"
import axios from "axios"

const http = axios.create({ baseURL: process.env.VUE_APP_AXIOS_BASE_URL })

const excludeUrl = [
  "/getHomeData",
  "/home/getHomeOrderData",
  "/home/getHomeFriendData",
  "/account/getAccountInfo"
]

// 生产环境替换API地址
const root = process.env.NODE_ENV === "production" ? process.env.VUE_APP_PRODUCTION_API_URL : ""

http.interceptors.request.use(
  config => {
    const url = config.url
    config.url = root + config.url
    if (excludeUrl.includes(url)) return config
    else {
      Vue.prototype.$Loading.start()
      return config
    }
  },
  err => Promise.reject(err)
)

http.interceptors.response.use(
  res => {
    const resUrl = res.config.url
    const data = res.data ? res.data : res
    if (excludeUrl.includes(resUrl)) return data
    else {
      Vue.prototype.$Loading.finish()
      return data
    }
  },
  err => {
    Vue.prototype.$Loading.error()
    const status = err.response.status
    const msg = `服务器错误！错误代码：${status}`
    if (status) Vue.prototype.$Message.error(msg)
    return Promise.reject(err)
  }
)

export default http
