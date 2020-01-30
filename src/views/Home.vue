<template>
  <div class="layout">
    <Sider class="sider">
      <Menu
        ref="show"
        theme="dark"
        width="auto"
        @on-select="selectMenu"
        :active-name="$route.path"
      >
        <Submenu
          :key="index"
          :name="index"
          v-for="(subMenu, index) in subMenuList"
        >
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
          <CommonPoptipQRCode class="float-left mr-30" />
          <Poptip
            transfer
            width="400"
            offset="20"
            padding="20px"
            class="login-poptip"
            placement="right-start"
          >
            <Button type="error" icon="md-link">代理验证</Button>
            <div slot="content">
              <Card>
                <Input clearable v-model="secret" placeholder="请输入密钥">
                  <span slot="prepend">密钥</span>
                </Input>
                <Input
                  clearable
                  class="mt-10"
                  v-model="orderno"
                  placeholder="请输入订单号"
                >
                  <span slot="prepend">订单</span>
                </Input>
                <div class="mt-10">
                  <Button
                    long
                    type="success"
                    icon="md-git-commit"
                    @click="IPChecking"
                  >
                    提交
                  </Button>
                </div>
              </Card>
            </div>
          </Poptip>
        </div>
        <div class="float-left">云控营销管理平台</div>
        <Button
          type="info"
          @click="logout"
          icon="md-log-out"
          class="float-right"
        >
          退出登录
        </Button>
      </Header>
      <Content class="content">
        <Breadcrumb class="breadcrumb">
          <BreadcrumbItem
            replace
            :key="index"
            :to="item.path === '/home' ? '/data' : item.path"
            v-for="(item, index) in routeList"
          >
            {{ item.name }}
          </BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div class="card-div">
            <keep-alive><router-view /></keep-alive>
          </div>
        </Card>
      </Content>
      <Footer class="footer">&copy; Cloud</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      secret: "",
      orderno: "",
      routeList: [],
      activeName: "",
      subMenuList: [
        {
          title: "账户",
          type: "md-person",
          menuItem: [
            { name: "分组管理", path: "/grouping" },
            { name: "标签管理", path: "/tag" },
            { name: "账号管理", path: "/m-account" },
            { name: "账号设置", path: "/s-account" }
          ]
        },
        {
          title: "群聊通讯",
          type: "md-call",
          menuItem: [
            { name: "通讯管理", path: "/mail" },
            { name: "好友管理", path: "/friends" },
            { name: "群聊管理", path: "/pull-group" }
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
      ]
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
          if (ref[i].active) {
            ref[i].$parent.opened = true
          }
        }
      })
    },
    logout() {
      this.$router.push("/")
      localStorage.removeItem("user_id")
      localStorage.removeItem("TagData")
      localStorage.removeItem("GroupData")
    },
    async IPChecking() {}
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
</style>
