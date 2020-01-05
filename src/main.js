import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ViewUI from "view-design"
import DayFormat from "dayjs"
import "view-design/dist/styles/iview.css"
import "./assets/css/style.scss"

Vue.use(ViewUI)

Vue.filter("date", value => {
  return DayFormat(value).format("YYYY-MM-DD HH:MM:ss")
})

Vue.config.productionTip = false

const componentsContext = require.context("./components", true, /.vue$/)
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component).default
  Vue.component(componentConfig.name, componentConfig)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
