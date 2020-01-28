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
        <span>云控营销管理平台</span>
        <CommonPoptipQRCode class="float-left" />
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
            <keep-alive>
              <router-view />
            </keep-alive>
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
      activeName: "",
      routeList: [],
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
          title: "通讯录",
          type: "md-call",
          menuItem: [
            { name: "通讯录管理", path: "/mail" },
            { name: "好友管理", path: "/friends" }
          ]
        },
        {
          title: "群管理",
          type: "md-people",
          menuItem: [{ name: "群拉好友", path: "/pull-group" }]
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
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  background: #f5f7f9;
  padding-top: 3px;
  .sider {
    left: 0;
    height: 100vh;
    overflow: auto;
    position: fixed;
  }
  .layout {
    margin-left: 200px;
    .header {
      text-align: center;
      background: #fff;
      padding-left: 33px;
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
