<template>
  <div class="layout">
    <Sider class="sider">
      <Menu ref="show" theme="dark" width="auto" @on-select="selectMenu" :active-name="$route.path">
        <Submenu :key="index" :name="index" v-for="(subMenu, index) in subMenuList">
          <template slot="title">
            <Icon ref="Icon" :type="subMenu.type" />{{ subMenu.title }}
          </template>
          <MenuItem
            :key="index"
            ref="menuItem"
            :to="menuItem.path"
            :name="menuItem.path"
            v-for="(menuItem, index) in subMenu.menuItem"
          >
            {{ menuItem.name }}
          </MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout class="layout">
      <Header class="header">
        <div>
          <Button icon="md-log-out" type="warning" @click="logout" class="mr-10">
            退出登录
          </Button>
          <Button icon="md-open" type="info" @click="isShow = true" class="mr-10">
            开启代理
          </Button>
          <Button icon="md-create" type="info" @click="isShowChangePwd = true">
            修改密码
          </Button>
        </div>
        <div>
          <h1><Icon type="md-cloud-circle" class="mr-10" />云控营销管理平台</h1>
        </div>
      </Header>
      <Content class="content">
        <Breadcrumb class="breadcrumb">
          <BreadcrumbItem
            replace
            :key="index"
            v-for="(item, index) in routeList"
            :to="item.path === '/home' ? '/data' : item.path"
          >
            {{ item.name }}
          </BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div class="card-div">
            <keep-alive :exclude="['taskAdd', 'homeData']">
              <router-view />
            </keep-alive>
          </div>
        </Card>
      </Content>
      <Footer class="footer">&copy; Cloud 2.0</Footer>
    </Layout>
    <Drawer width="20" :closable="false" v-model="isShowChangePwd">
      <div slot="header" class="header-drawer">
        <div><Icon class="mr-10" color="#2D8CF0" type="md-create" />修改密码</div>
        <div>
          <Button type="success" icon="md-checkmark" @click="changePwd">立即提交</Button>
        </div>
      </div>
      <Row>
        <Col span="24">
          <Input v-model="oldPwd" clearable placeholder="请输入原密码">
            <span slot="prepend">原密码</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input v-model="newPwd" clearable placeholder="请输入新密码">
            <span slot="prepend">新密码</span>
          </Input>
        </Col>
      </Row>
    </Drawer>
    <Drawer width="20" :closable="false" v-model="isShow" @on-visible-change="onShowDrawer">
      <div slot="header" class="header-drawer">
        <div><Icon class="mr-10" color="#2D8CF0" type="md-fastforward" />代理验证</div>
        <div>
          <Button type="success" icon="md-checkmark" @click="IPChecking">立即验证</Button>
        </div>
      </div>
      <Row>
        <Col span="24">
          <Input clearable v-model="secret" placeholder="请输入密钥">
            <span slot="prepend">密钥</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input clearable class="mt-10" v-model="orderno" placeholder="请输入订单号">
            <span slot="prepend">订单</span>
          </Input>
        </Col>
      </Row>
    </Drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "home",
  data() {
    return {
      isShow: false,
      isShowChangePwd: false,
      secret: "",
      orderno: "",
      routeList: [],
      IPloading: false,
      activeName: "",
      subMenuList: [
        {
          title: "账户管理",
          type: "md-person",
          menuItem: [
            { name: "账号 & & 分组", path: "/group" },
            { name: "空闲账号管理", path: "/m-account" },
            { name: "账号资料设置", path: "/s-account" }
          ]
        },
        {
          title: "群聊通讯",
          type: "md-call",
          menuItem: [
            { name: "加粉管理", path: "/mail" },
            { name: "添加好友", path: "/friends" },
            { name: "拉群任务", path: "/pull-group" },
            { name: "加粉任务", path: "/task" }
          ]
        },
        {
          title: "营销管理",
          type: "md-settings",
          menuItem: [
            { name: "发朋友圈", path: "/space" },
            { name: "素材管理", path: "/material" }
          ]
        }
      ],
      oldPwd: "",
      newPwd: ""
    }
  },
  mounted() {
    this.routeList = this.$route.matched
    this.iviewMenuChange()
  },
  watch: {
    $route() {
      this.routeList = []
      this.routeList = this.$route.matched
      this.iviewMenuChange()
    }
  },
  computed: {
    ...mapGetters(["user_id"])
  },
  methods: {
    selectMenu(name) {
      this.activeName = name
    },
    iviewMenuChange() {
      this.$nextTick(() => {
        this.$refs.show.updateOpened()
        const ref = this.$refs.menuItem
        const length = ref.length
        for (let i = 0; i < length; i++) {
          if (ref[i].active) ref[i].$parent.opened = true
        }
      })
    },
    logout() {
      this.$router.push("/")
      localStorage.clear()
    },
    async IPChecking() {
      if (!this.secret) {
        this.$Message.error("请输入密钥~")
        return
      }
      if (!this.orderno) {
        this.$Message.error("请输入订单号~")
        return
      }
      this.IPloading = true
      const params = { orderno: this.orderno, secret: this.secret }
      const res = await this.$http.get("/proxyInfo", { params })
      this.IPloading = false
      if (res.Success === false) {
        this.$Message.error("验证失败~")
        return
      }
      if (res.Success === true) {
        this.$Message.error("验证成功~")
        return
      }
      this.$Message.info(res)
    },
    async onShowDrawer(value) {
      let msg
      if (value) {
        await this.$http.get("openProxy", { params: { isOpen: 0 } })
        msg = "已开启"
      } else {
        await this.$http.get("openProxy", { params: { isOpen: 1 } })
        msg = "已关闭"
      }
      this.$Message.info(msg)
    },
    async changePwd() {
      if (!this.oldPwd) {
        this.$Message.error("原密码不能为空！")
        return
      }
      if (!this.newPwd) {
        this.$Message.error("新密码不能为空！")
        return
      }
      const args = { oldPwd: this.oldPwd, newPwd: this.newPwd, userId: this.user_id }
      const { msg } = await this.$http.post("/account/updatePassword", args)
      this.$Message.info(msg)
      this.oldPwd = this.newPwd = ""
      this.$router.push("/")
      localStorage.clear()
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  padding-top: 3px;
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  background: #f5f7f9;
  .sider {
    left: 0;
    height: 100vh;
    overflow: auto;
    position: fixed;
  }
  .layout {
    margin-left: 200px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      background: #fff;
      padding: 0 33px;
      box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1);
    }
    .content {
      padding: 0 16px 16px;
      .breadcrumb {
        margin: 16px 0;
      }
      .card-div {
        height: auto;
      }
    }
    .footer {
      text-align: center;
      padding: 0 50px 10px 50px;
    }
  }
}

.header-drawer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
