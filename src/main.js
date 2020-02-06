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

const GlobalClick = () => {
  console.log(1)
}

// document.onclick = GlobalClick

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$GlobalClick = GlobalClick
Vue.prototype.$Loading.config({ height: 3 })

const componentsContext = require.context("./components", true, /.vue$/)
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component).default
  Vue.component(componentConfig.name, componentConfig)
})

Vue.filter("date", value => DayFormat(value).format("YYYY-MM-DD HH:MM:ss"))

new Vue({ store, router, render: h => h(App) }).$mount("#app")
