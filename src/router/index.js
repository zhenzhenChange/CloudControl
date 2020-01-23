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
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/main",
        name: "Main",
        component: () => import("../views/Main.vue"),
        meta: {
          name: ["首页", "分组管理", "账号管理"],
          path: ["/", "/grouping", "/m-account"]
        }
      },
      {
        path: "/grouping",
        name: "Grouping",
        component: () => import("../views/Account/Grouping.vue")
      },
      {
        path: "/m-account",
        name: "MAccount",
        component: () => import("../views/Account/MAccount.vue")
      },
      {
        path: "/s-account",
        name: "SAccount",
        component: () => import("../views/Account/SAccount.vue")
      },
      {
        path: "/tag",
        name: "Tag",
        component: () => import("../views/Account/Tag.vue")
      },
      {
        path: "/friends",
        name: "Friends",
        component: () => import("../views/MailList/Friends.vue")
      },
      {
        path: "/mail",
        name: "MailSet",
        component: () => import("../views/MailList/MailSet.vue")
      },
      {
        path: "/group-chat",
        name: "GroupChat",
        component: () => import("../views/Group/GroupChat.vue")
      },
      {
        path: "/pull-group",
        name: "PullGroup",
        component: () => import("../views/Group/PullGroup.vue")
      },
      {
        path: "/space",
        name: "Space",
        component: () => import("../views/Marketing/Space.vue")
      },
      {
        path: "/material",
        name: "Material",
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
