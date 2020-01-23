<template>
  <div class="layout">
    <Sider class="sider">
      <!-- :open-names="['Account']" -->
      <Menu :active-name="show" ref="show" theme="dark" width="auto">
        <Submenu name="Account">
          <template slot="title"><Icon type="md-person" />账户</template>
          <MenuItem name="grouping" to="/grouping">分组管理</MenuItem>
          <MenuItem name="tag" to="/tag">标签管理</MenuItem>
          <MenuItem name="m-account" to="/m-account">账号管理</MenuItem>
          <MenuItem name="s-account" to="/s-account">账号设置</MenuItem>
        </Submenu>
        <Submenu name="MailList">
          <template slot="title"><Icon type="md-call" />通讯录</template>
          <MenuItem name="mail-set" to="/mail">通讯录管理</MenuItem>
          <MenuItem name="friends" to="/friends">好友管理</MenuItem>
        </Submenu>
        <Submenu name="Group">
          <template slot="title"><Icon type="ios-people" />群管理</template>
          <MenuItem name="pull-group" to="/pull-group">群拉好友</MenuItem>
        </Submenu>
        <Submenu name="Marketing">
          <template slot="title"><Icon type="md-settings" />营销管理</template>
          <MenuItem name="space" to="/space">发朋友圈</MenuItem>
          <MenuItem name="material" to="/material">素材管理</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout class="layout">
      <Header class="header"
        >Cloud Platform Control ★ Your Can Really Code</Header
      >
      <Content class="content">
        <Breadcrumb class="breadcrumb">
          <!-- <BreadcrumbItem
            :to="path(index)"
            v-for="(item, index) in routes"
            :key="index"
            replace
          >{{ item }}</BreadcrumbItem>-->
        </Breadcrumb>
        <Card>
          <div class="card-div">
            <keep-alive>
              <router-view />
            </keep-alive>
          </div>
        </Card>
      </Content>
      <Footer class="footer">2019-12-27 &copy; Cloud Platform Control</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      show: "grouping"
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.show = this.$route.path.slice(1)
      this.$refs.show.updateActiveName()
    })
  }
  /* data() {
    return {
      routes: this.$route.meta.name
    }
  },
  computed: {
    path() {
      return function(index) {
        return this.$route.meta.path[index]
      }
    }
  } */
}
</script>

<style lang="scss" scoped>
.layout {
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  background: #f5f7f9;
  border: 1px solid #d7dde4;
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
