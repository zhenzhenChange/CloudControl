import Vue from "vue"
import http from "./http"
import App from "./App.vue"
import store from "./store"
import router from "./router"
import DayFormat from "dayjs"
import ViewUI from "view-design"

import "./assets/css/style.scss"
import "view-design/dist/styles/iview.css"

Vue.use(ViewUI)

Vue.prototype.$http = http

Vue.config.productionTip = false

Vue.filter("date", value => DayFormat(value).format("YYYY-MM-DD HH:MM:ss"))

const componentsContext = require.context("./components", true, /.vue$/)
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component).default
  Vue.component(componentConfig.name, componentConfig)
})

new Vue({ store, router, render: h => h(App) }).$mount("#app")
