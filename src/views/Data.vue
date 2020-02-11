<template>
  <div class="home-main">
    <div class="root-div">
      <Card class="root-card" v-for="(item, index) in dataCard" :key="index">
        <p slot="title">{{ item.title }}</p>
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
            { title: "账号总量", data: 0, color: "color-blue" },
            { title: "在线账号总量", data: 0, color: "color-green" },
            { title: "离线账号总量", data: 0, color: "color-red" },
            { title: "异常账号总量", data: 0, color: "color-red" }
          ]
        },
        {
          title: "好友统计",
          data: [
            { title: "好友总量", data: 0, color: "color-blue" },
            { title: "好友请求添加总量", data: 0, color: "color-green" },
            { title: "好友请求失败总量", data: 0, color: "color-red" },
            { title: "好友实时通过总量", data: 0, color: "color-green" }
          ]
        },
        {
          title: "订单统计",
          data: [
            { title: "拉群订单总量", data: 0, color: "color-blue" },
            { title: "拉群订单执行中总量", data: 0, color: "color-green" },
            { title: "加粉订单总量", data: 0, color: "color-blue" },
            { title: "加粉订单执行中总量", data: 0, color: "color-green" }
          ]
        }
      ],
      quickRouterLinks1: [
        { path: "/s-account", title: "账号资料设置", type: "md-cog" },
        { path: "/group", title: "账号 & & 分组", type: "md-list" },
        { path: "/friends", title: "添加好友", type: "md-contacts" },
        { path: "/SetShreshold", title: "阈值设置", type: "md-arrow-up" },
        { path: "/m-account", title: "空闲账号管理", type: "md-list-box" }
      ],
      quickRouterLinks2: [
        { path: "/mail", title: "加粉管理", type: "md-contact" },
        { path: "/material", title: "素材管理", type: "md-book" },
        { path: "/task", title: "加粉任务", type: "md-bookmarks" },
        { path: "/pull-group", title: "拉群任务", type: "md-hand" },
        { path: "/space", title: "发朋友圈", type: "md-paper-plane" }
      ]
    }
  },
  created() {
    this.initData()
    setInterval(() => this.initData(), 5000)
    if (this.user_id) this.initGroupData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id, DataCount: state => state.DataCount })
  },
  methods: {
    async initData() {
      this.dataCard[0].data[0].data = 0
      this.dataCard[0].data[1].data = 0
      this.dataCard[0].data[2].data = 0
      this.dataCard[0].data[3].data = 0

      this.dataCard[1].data[0].data = 0
      this.dataCard[1].data[1].data = 0
      this.dataCard[1].data[2].data = 0
      this.dataCard[1].data[3].data = 0

      this.dataCard[2].data[0].data = 0
      this.dataCard[2].data[1].data = 0
      this.dataCard[2].data[2].data = 0
      this.dataCard[2].data[3].data = 0

      const params = { user_id: this.user_id }

      const { data } = await this.$http.get("/account/getAccountInfo", { params })
      this.dataCard[0].data[0].data = data.length
      data.forEach(item => {
        if (item.accountFriendCount) this.dataCard[1].data[0].data += item.accountFriendCount
        if (item.accountState) this.dataCard[0].data[1].data += 1
        if (!item.accountState) this.dataCard[0].data[2].data += 1
        if (!item.accountIsValid) this.dataCard[0].data[3].data += 1
      })

      const InitRes = await this.$http.get("/common/getInit", { params })
      this.dataCard[1].data[1].data = InitRes.data.addCount
      this.dataCard[1].data[2].data = InitRes.data.addCount - InitRes.data.ssAllPassCount
      this.dataCard[1].data[3].data = InitRes.data.ssAllPassCount
      this.$store.commit("saveShreshold", InitRes.data.suLoginShreshold)

      const GroupRes = await this.$http.get("/group/getEnterGroupCount", { params })
      this.dataCard[2].data[0].data = GroupRes.data.count
      this.dataCard[2].data[1].data = GroupRes.data.goingCount

      const FriendRes = await this.$http.get("/contact/getAddFriendCount", { params })
      this.dataCard[2].data[2].data = FriendRes.data.count
      this.dataCard[2].data[3].data = FriendRes.data.goingCount
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
