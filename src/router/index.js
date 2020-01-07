import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
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
        path: "/trumpet",
        name: "Trumpet",
        component: () => import("../views/Account/Trumpet.vue")
      },
      {
        path: "/passive",
        name: "Passive",
        component: () => import("../views/Account/Passive.vue")
      },
      {
        path: "/friends",
        name: "Friends",
        component: () => import("../views/MailList/Friends.vue")
      },
      {
        path: "/fans",
        name: "Fans",
        component: () => import("../views/MailList/Fans.vue")
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
        path: "/inter-chat",
        name: "InterChat",
        component: () => import("../views/Group/InterChat.vue")
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
  base: "/CloudControl/",
  mode: "history",
  routes
})

export default router
