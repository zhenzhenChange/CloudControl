<template>
  <div class="home-main">
    <div class="root-div">
      <Card class="root-card" v-for="(item, index) in dataCard" :key="index">
        <p slot="title"><Icon :type="item.icon" class="mr-10" />{{ item.title }}</p>
        <Card :key="sonIndex" class="son-card" v-for="(sonItem, sonIndex) in item.data">
          <Tooltip slot="title" :content="sonItem.title">{{ sonItem.title }}</Tooltip>
          <div class="text-center">
            <h1 :class="sonItem.color">{{ sonItem.data }}</h1>
          </div>
        </Card>
      </Card>
    </div>
    <Divider dashed />
    <div class="mt-10 quick">
      <Card>
        <p slot="title"><Icon type="md-link" class="mr-10" />快捷方式</p>
        <div class="quick-card" v-for="(quickItem, index) in quickRouterLinks" :key="index">
          <router-link
            tag="div"
            :to="item.path"
            :key="itemIndex"
            class="title-card"
            v-for="(item, itemIndex) in quickItem.Row"
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
      timer: null,
      dataCard: [
        {
          icon: "md-chatbubbles",
          title: "微信账号统计",
          data: [
            { title: "账号总量", data: 0, color: "color-blue" },
            { title: "在线账号总量", data: 0, color: "color-green" },
            { title: "离线账号总量", data: 0, color: "color-red" },
            { title: "异常账号总量", data: 0, color: "color-red" }
          ]
        },
        {
          icon: "md-stats",
          title: "好友统计",
          data: [
            { title: "好友总量", data: 0, color: "color-blue" },
            { title: "好友请求添加总量", data: 0, color: "color-green" },
            { title: "好友请求失败总量", data: 0, color: "color-red" },
            { title: "好友实时通过总量", data: 0, color: "color-green" }
          ]
        },
        {
          icon: "md-reorder",
          title: "订单统计",
          data: [
            { title: "拉群订单总量", data: 0, color: "color-blue" },
            { title: "拉群订单执行中总量", data: 0, color: "color-green" },
            { title: "加粉订单总量", data: 0, color: "color-blue" },
            { title: "加粉订单执行中总量", data: 0, color: "color-green" }
          ]
        }
      ],
      quickRouterLinks: [
        {
          Row: [
            { path: "/s-account", title: "账号资料设置", type: "md-cog" },
            { path: "/group", title: "账号 & & 分组", type: "md-people" },
            { path: "/friends", title: "添加好友", type: "md-person-add" },
            { path: "/SetShreshold", title: "阈值设置", type: "md-arrow-up" },
            { path: "/m-account", title: "空闲账号管理", type: "md-radio-button-off" }
          ]
        },
        {
          Row: [
            { path: "/mail", title: "加粉管理", type: "md-contact" },
            { path: "/material", title: "素材管理", type: "md-book" },
            { path: "/task", title: "加粉任务", type: "md-bookmarks" },
            { path: "/pull-group", title: "拉群任务", type: "md-hand" },
            { path: "/space", title: "发朋友圈", type: "md-paper-plane" }
          ]
        }
      ]
    }
  },
  created() {
    this.initData()
    clearInterval(this.timer)
    // this.timer = setInterval(() => this.initData(), 15000)
    if (this.user_id) this.initGroupData()
  },
  destroyed() {
    clearInterval(this.timer)
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async initData() {
      this.dataCard.forEach(data => data.data.forEach(sonData => (sonData.data = 0)))
      const params = { user_id: this.user_id }
      const { data } = await this.$http.get("/account/getAccountInfo", { params })
      this.dataCard[0].data[0].data = data.length || 0
      data.forEach(item => {
        if (item.accountFriendCount) this.dataCard[1].data[0].data += item.accountFriendCount
        if (item.accountState) this.dataCard[0].data[1].data += 1
        if (!item.accountState) this.dataCard[0].data[2].data += 1
        if (!item.accountIsValid) this.dataCard[0].data[3].data += 1
      })

      const InitRes = await this.$http.get("/common/getInit", { params })
      this.dataCard[1].data[1].data = InitRes.data.addCount || 0
      this.dataCard[1].data[2].data = InitRes.data.addCount - InitRes.data.ssAllPassCount || 0
      this.dataCard[1].data[3].data = InitRes.data.ssAllPassCount || 0
      this.$store.commit("saveShreshold", InitRes.data.suLoginShreshold)

      const GroupRes = await this.$http.get("/group/getEnterGroupCount", { params })
      this.dataCard[2].data[0].data = GroupRes.data.count || 0
      this.dataCard[2].data[1].data = GroupRes.data.goingCount || 0

      const FriendRes = await this.$http.get("/contact/getAddFriendCount", { params })
      this.dataCard[2].data[2].data = FriendRes.data.count || 0
      this.dataCard[2].data[3].data = FriendRes.data.goingCount || 0
    },
    async initGroupData() {
      const arr = []
      const params = { user_id: this.user_id }
      const { data } = await this.$http.get("/account/getAllGroup", { params })
      data.forEach(item => arr.push({ label: item.groupName, value: String(item.groupId) }))
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
      margin: 0 10px;
      text-align: center;
      ::v-deep .ivu-card-body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
      }
      .son-card {
        width: 170px;
        margin: 10px 0;
      }
    }
  }
  .quick {
    .quick-card {
      display: flex;
      .title-card {
        flex: 1;
        margin: 10px;
        cursor: pointer;
        text-align: center;
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
