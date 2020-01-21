import Vue from "vue"
import axios from "axios"

import API from "./api"

const instance = axios.create({
  baseURL: "/",
  timeout: 5000
})

const http = {}

// 循环遍历 API 对象，取 url, method
for (let key in API) {
  const { url, method } = API[key]
  http[key] = async (params, config = {}) => {
    let response = {}
    if (method === "get") {
      config.params = params
      try {
        response = await instance[method](url, config)
      } catch (error) {
        response = error
      }
    }
    if (method === "post") {
      try {
        response = await instance[method](url, params, config)
      } catch (error) {
        response = error
      }
    }
    return response
  }
}

instance.interceptors.request.use(
  config => config,
  err => Promise.reject(err)
)

instance.interceptors.response.use(
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
