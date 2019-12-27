<template>
  <div class="layout">
    <Sider class="sider">
      <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
        <Submenu name="1">
          <template slot="title"><Icon type="md-contact" />账户</template>
          <MenuItem name="1-1">
            <router-link to="/grouping" tag="div">分组管理</router-link>
          </MenuItem>
          <MenuItem name="1-2">
            <router-link to="/m-account" tag="div">账号管理</router-link>
          </MenuItem>
          <MenuItem name="1-3">
            <router-link to="/s-account" tag="div">账号设置</router-link>
          </MenuItem>
          <MenuItem name="1-4">
            <router-link to="/tag" tag="div">标签管理</router-link>
          </MenuItem>
          <MenuItem name="1-5">
            <router-link to="/trumpet" tag="div">小号互聊</router-link>
          </MenuItem>
          <MenuItem name="1-6">
            <router-link to="/passive" tag="div">被动请求</router-link>
          </MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-phone-portrait" />通讯录
          </template>
          <MenuItem name="2-1">
            <router-link to="/friends" tag="div">好友管理</router-link>
          </MenuItem>
          <MenuItem name="2-2">
            <router-link to="/fans" tag="div">加粉订单</router-link>
          </MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title"><Icon type="ios-people" />群管理</template>
          <MenuItem name="3-1">
            <router-link to="/group-chat" tag="div">群聊列表</router-link>
          </MenuItem>
          <MenuItem name="3-2">
            <router-link to="/pull-group" tag="div">拉群订单</router-link>
          </MenuItem>
          <MenuItem name="3-3">
            <router-link to="/inter-chat" tag="div">群互聊</router-link>
          </MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-settings-outline" />营销管理
          </template>
          <MenuItem name="4-1">
            <router-link to="/space" tag="div">发朋友圈</router-link>
          </MenuItem>
          <MenuItem name="4-2">
            <router-link to="/material" tag="div">素材管理</router-link>
          </MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout class="layout">
      <Header class="header">Cloud → Your Can Really Code</Header>
      <Content class="content">
        <Breadcrumb class="breadcrumb">
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>组件</BreadcrumbItem>
          <BreadcrumbItem>布局</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div class="card-div">
            <router-view />
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "home"
}
</script>

<style lang="scss" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .sider {
    position: fixed;
    height: 100vh;
    left: 0;
    overflow: auto;
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
        height: 650px;
      }
    }
  }
}
</style>
