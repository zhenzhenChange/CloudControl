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
import { mapGetters } from "vuex"
export default {
  name: "homeData",
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
    this.initInfo()
    this.initGroup()
    this.initOrder()
    this.initFriend()
    this.initShreshold()
    setInterval(() => {
      this.initInfo()
      this.initOrder()
      this.initFriend()
    }, 30000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  computed: {
    ...mapGetters(["user_id"])
  },
  methods: {
    async initInfo() {
      this.dataCard.forEach(data => data.data.forEach(sonData => (sonData.data = 0)))
      const params = { user_id: this.user_id }
      const { data } = await this.$http.get("/account/getAccountInfo", { params })
      this.dataCard[0].data[0].data = data.length || 0
      data.forEach(item => {
        if (item.accountState) this.dataCard[0].data[1].data += 1
        if (!item.accountState) this.dataCard[0].data[2].data += 1
        if (!item.accountIsValid) this.dataCard[0].data[3].data += 1
      })
    },
    async initFriend() {
      const params = { userId: this.user_id }
      const friendData = await this.$http.get("/home/getHomeFriendData", { params })
      this.dataCard[1].data[0].data = friendData.allFriendCount || 0
      this.dataCard[1].data[1].data = friendData.allRequestCount || 0
      this.dataCard[1].data[2].data = friendData.allFailureCount || 0
      this.dataCard[1].data[3].data = friendData.allPassCount || 0
    },
    async initOrder() {
      const params = { userId: this.user_id }
      const orderData = await this.$http.get("/home/getHomeOrderData", { params })
      this.dataCard[2].data[0].data = orderData.enterGroupAll || 0
      this.dataCard[2].data[1].data = orderData.enterGroupIng || 0
      this.dataCard[2].data[2].data = orderData.addFriendAll || 0
      this.dataCard[2].data[3].data = orderData.addFriendIng || 0
    },
    async initGroup() {
      const arr = []
      const params = { userId: this.user_id, size: 99999, currentPage: 1 }
      const data = await this.$http.get("/account/getAllGroup", { params })
      data.forEach(item =>
        arr.push({ label: item.tbGroupEntity.groupName, value: String(item.tbGroupEntity.groupId) })
      )
      this.$store.commit("saveGroupData", JSON.stringify(arr))
      this.$store.commit("saveGroupDataTotal", data.length)
    },
    async initShreshold() {
      const params = { user_id: this.user_id }
      const { data } = await this.$http.get("/getHomeData", { params })
      this.$store.commit("saveShreshold", data.suLoginShreshold)
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
