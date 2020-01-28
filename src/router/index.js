import Vue from "vue"
import ViewUI from "view-design"
import VueRouter from "vue-router"

import Login from "../views/Login.vue"

Vue.use(ViewUI)
Vue.use(VueRouter)

const routes = [
  { path: "/", name: "login", component: Login },
  {
    path: "/home",
    name: "首页",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/data",
        name: "数据可视化",
        component: () => import("../views/Data.vue")
      },
      {
        path: "/grouping",
        name: "分组管理",
        component: () => import("../views/Account/Grouping.vue")
      },
      {
        path: "/m-account",
        name: "账号管理",
        component: () => import("../views/Account/MAccount.vue")
      },
      {
        path: "/s-account",
        name: "账号设置",
        component: () => import("../views/Account/SAccount.vue")
      },
      {
        path: "/tag",
        name: "标签管理",
        component: () => import("../views/Account/Tag.vue")
      },
      {
        path: "/friends",
        name: "好友管理",
        component: () => import("../views/MailList/Friends.vue")
      },
      {
        path: "/mail",
        name: "通讯管理",
        component: () => import("../views/MailList/MailSet.vue")
      },
      {
        path: "/pull-group",
        name: "群拉好友",
        component: () => import("../views/MailList/PullGroup.vue")
      },
      {
        path: "/space",
        name: "发朋友圈",
        component: () => import("../views/Marketing/Space.vue")
      },
      {
        path: "/material",
        name: "素材管理",
        component: () => import("../views/Marketing/Material.vue")
      }
    ]
  }
]

const router = new VueRouter({
  base: "/cloud-control/",
  mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  next()
})

router.afterEach(() => {
  ViewUI.LoadingBar.finish()
})

export default router
