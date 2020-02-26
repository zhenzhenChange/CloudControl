import Vue from "vue"
import ViewUI from "view-design"
import VueRouter from "vue-router"

import Login from "../views/Login.vue"

Vue.use(ViewUI)
Vue.use(VueRouter)

const routes = [
  { path: "/", name: "login", component: Login, meta: { isPublic: true } },
  {
    path: "/home",
    name: "首页",
    component: () => import("../views/Home.vue"),
    children: [
      { path: "/data", name: "数据报表", component: () => import("../views/Data.vue") },
      {
        path: "/group",
        name: "账号 & & 分组",
        component: () => import("../views/Account/Group.vue")
      },
      {
        path: "/m-account",
        name: "空闲账号管理",
        component: () => import("../views/Account/MAccount.vue")
      },
      {
        path: "/s-account",
        name: "账号资料设置",
        component: () => import("../views/Account/SAccount.vue")
      },
      {
        path: "/friends",
        name: "添加好友",
        component: () => import("../views/MailList/Friends.vue")
      },
      { path: "/mail", name: "加粉管理", component: () => import("../views/MailList/MailSet.vue") },
      {
        path: "/pull-group",
        name: "拉群任务",
        component: () => import("../views/MailList/PullGroup.vue")
      },
      { path: "/task", name: "加粉任务", component: () => import("../views/MailList/TaskAdd.vue") },
      { path: "/space", name: "发朋友圈", component: () => import("../views/Marketing/Space.vue") },
      {
        path: "/material",
        name: "素材管理",
        component: () => import("../views/Marketing/Material.vue")
      },
      {
        path: "/SetShreshold",
        name: "阈值设置",
        component: () => import("../views/SetShreshold.vue")
      }
    ]
  }
]

const router = new VueRouter({ base: "./", mode: "history", routes })

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.getItem("user_id")) {
    Vue.prototype.$Message.error("请先登录~")
    return next("/")
  }
  ViewUI.LoadingBar.start()
  next()
})

router.afterEach(() => ViewUI.LoadingBar.finish())

export default router
