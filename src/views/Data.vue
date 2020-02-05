<template>
  <div class="home-main">
    <div class="root-div">
      <Card class="root-card" v-for="(item, index) in dataCard" :key="index">
        <p slot="title">{{ item.title }}</p>
        <Card
          :key="sonIndex"
          class="son-card"
          v-for="(sonItem, sonIndex) in item.data"
        >
          <Tooltip slot="title" :content="sonItem.title">
            {{ sonItem.title }}
          </Tooltip>
          <div class="text-center">
            <h1 :class="sonItem.color">{{ sonItem.data }}</h1>
          </div>
        </Card>
      </Card>
    </div>
    <Divider dashed />
    <div class="mt-10 quick">
      <Card>
        <p slot="title">快捷方式</p>
        <div class="quick-card">
          <router-link
            tag="div"
            :key="index"
            :to="item.path"
            class="title-card"
            v-for="(item, index) in quickRouterLinks1"
          >
            <Card>
              <p slot="title">{{ item.title }}</p>
              <Icon class="title-icon" :type="item.type" />
            </Card>
          </router-link>
        </div>
        <Divider dashed />
        <div class="quick-card">
          <router-link
            tag="div"
            :key="index"
            :to="item.path"
            class="title-card"
            v-for="(item, index) in quickRouterLinks2"
          >
            <Card>
              <p slot="title">{{ item.title }}</p>
              <Icon class="title-icon" :type="item.type" />
            </Card>
          </router-link>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      dataCard: [
        {
          title: "微信账号统计",
          data: [
            { title: "账号总量", data: 0, color: "color-red" },
            { title: "在线账号总量", data: 0, color: "color-red" },
            { title: "离线账号总量", data: 0, color: "color-red" },
            { title: "异常账号总量", data: 0, color: "color-red" }
          ]
        },
        {
          title: "好友统计",
          data: [
            { title: "好友总量", data: 0, color: "color-red" },
            { title: "好友请求添加总量", data: 0, color: "color-blue" },
            { title: "好友请求失败总量", data: 0, color: "color-blue" },
            { title: "好友实时通过总量", data: 0, color: "color-blue" }
          ]
        },
        {
          title: "订单统计",
          data: [
            { title: "拉群订单总量", data: 0, color: "color-blue" },
            { title: "拉群订单执行中总量", data: 0, color: "color-blue" },
            { title: "加粉订单总量", data: 0, color: "color-blue" },
            { title: "加粉订单执行中总量", data: 0, color: "color-blue" }
          ]
        }
      ],
      quickRouterLinks1: [
        { path: "/s-account", title: "账号设置", type: "md-cog" },
        { path: "/group", title: "账号分组管理", type: "md-list" },
        { path: "/friends", title: "好友管理", type: "md-contacts" },
        { path: "/SetShreshold", title: "阈值设置", type: "md-arrow-up" }
      ],
      quickRouterLinks2: [
        { path: "/mail", title: "通讯管理", type: "md-contact" },
        { path: "/material", title: "素材管理", type: "md-book" },
        { path: "/pull-group", title: "群聊管理", type: "md-hand" },
        { path: "/space", title: "发朋友圈", type: "md-paper-plane" }
      ]
    }
  },
  created() {
    this.initData()
    if (this.user_id) {
      this.initGroupData()
    }
  },
  computed: {
    ...mapState({
      user_id: state => state.user_id,
      DataCount: state => state.DataCount
    })
  },
  methods: {
    async initData() {
      const { data, msg } = await this.$http.get("/common/getInit", {
        params: { user_id: this.user_id }
      })
      // const pullGroup = await this.$http.get("/groupView")
      this.$store.commit("saveShreshold", data.suLoginShreshold)
      this.$Message.info(msg)
      /*  const DataCount = JSON.parse(this.DataCount)
      if (DataCount) {
        this.dataCard[0].data = DataCount.FriendCount
        this.dataCard[2].data = DataCount.DeadAccount
        this.dataCard[5].data = DataCount.OnlineAccount
      }
      this.dataCard[1].data = data.addCount
      this.dataCard[3].data = pullGroup.length
      this.dataCard[4].data = data.ssAllPassCount */
    },
    async initGroupData() {
      const arr = []
      const { data } = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      data.forEach(item =>
        arr.push({ label: item.groupName, value: String(item.groupId) })
      )
      this.$store.commit("saveGroupData", JSON.stringify(arr))
    }
  }
}
</script>

<style lang="scss" scoped>
.home-main {
  .root-div {
    display: flex;
    align-items: center;
    justify-content: center;
    .root-card {
      flex: 1;
      padding: 0;
      margin-left: 10px;
      margin-right: 10px;
      text-align: center;
      .son-card {
        width: 170px;
        float: left;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 20px;
      }
    }
  }
  .quick {
    .quick-card {
      display: flex;
      .title-card {
        flex: 1;
        cursor: pointer;
        margin-top: 10px;
        margin-left: 10px;
        text-align: center;
        margin-right: 10px;
        .ivu-card {
          border-color: rgb(194, 190, 190);
        }
        .title-icon {
          font-size: 50px;
        }
      }
    }
  }
}
</style>
