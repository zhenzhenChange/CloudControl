import Vue from "vue"
import axios from "axios"

const http = axios.create({
  baseURL: "/api",
  // baseURL: "/",
  timeout: 5000
})

http.interceptors.request.use(
  config => config,
  err => Promise.reject(err)
)

http.interceptors.response.use(
  res => res.data,
  err => {
    const status = err.response.status
    const msg = err.response.msg
    if (status) {
      Vue.prototype.$Message.error(
        `服务器错误，请稍后重试！错误代码：${status}`
      )
    }
    if (msg) {
      Vue.prototype.$Message.error(`${msg}`)
    }
    return Promise.reject(err)
  }
)

export default http
