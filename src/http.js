import Vue from "vue"
import axios from "axios"

const http = axios.create({ baseURL: "/cloud-api" })

http.interceptors.request.use(
  config => {
    if (
      config.url === "/common/getInit" ||
      config.url === "/account/getAccountInfo" ||
      config.url === "/contact/getAddFriendCount" ||
      config.url === "/group/getEnterGroupCount"
    ) {
      return config
    } else {
      Vue.prototype.$Loading.start()
      return config
    }
  },
  err => Promise.reject(err)
)

http.interceptors.response.use(
  res => {
    if (
      res.config.url === "/common/getInit" ||
      res.config.url === "/account/getAccountInfo" ||
      res.config.url === "/contact/getAddFriendCount" ||
      res.config.url === "/group/getEnterGroupCount"
    ) {
      return res.data ? res.data : res
    } else {
      Vue.prototype.$Loading.finish()
      return res.data ? res.data : res
    }
  },
  err => {
    Vue.prototype.$Loading.error()
    const status = err.response.status
    const msg = `服务器错误，请稍后重试！错误代码：${status}`
    if (status) Vue.prototype.$Message.error(msg)
    return Promise.reject(err)
  }
)

export default http
