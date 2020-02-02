<template>
  <div class="home-main">
    <div class="data">
      <Card
        :key="index"
        class="data-card mr-20"
        v-for="(item, index) in dataCard"
      >
        <p slot="title">{{ item.title }}</p>
        <div class="text-center label">
          <h1 :class="item.color">{{ item.data }}</h1>
        </div>
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
        { title: "好友总量", data: 0, color: "color-red" },
        { title: "好友添加量", data: 0, color: "color-blue" },
        { title: "死号量", data: 0, color: "color-red" },
        { title: "拉群订单量", data: 0, color: "color-blue" },
        { title: "好友实时通过量", data: 0, color: "color-blue" },
        { title: "上号量", data: 0, color: "color-green" }
      ],
      quickRouterLinks1: [
        { path: "/grouping", title: "分组管理", type: "md-list" },
        { path: "/tag", title: "标签管理", type: "md-pricetags" },
        { path: "/s-account", title: "账号设置", type: "md-cog" },
        { path: "/m-account", title: "账号管理", type: "md-people" },
        { path: "/SetShreshold", title: "阈值设置", type: "md-arrow-up" }
      ],
      quickRouterLinks2: [
        { path: "/material", title: "素材管理", type: "md-book" },
        { path: "/mail", title: "通讯管理", type: "md-contact" },
        { path: "/pull-group", title: "群拉好友", type: "md-hand" },
        { path: "/friends", title: "好友管理", type: "md-contacts" },
        { path: "/space", title: "发朋友圈", type: "md-paper-plane" }
      ]
    }
  },
  created() {
    this.initData()
    if (this.user_id) {
      this.initTagData()
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
      const pullGroup = await this.$http.get("/groupView")
      this.$store.commit("saveShreshold", data.suLoginShreshold)
      this.$Message.info(msg)
      const DataCount = JSON.parse(this.DataCount)
      if (DataCount) {
        this.dataCard[0].data = DataCount.FriendCount
        this.dataCard[2].data = DataCount.DeadAccount
        this.dataCard[5].data = DataCount.OnlineAccount
      }
      this.dataCard[1].data = data.addCount
      this.dataCard[3].data = pullGroup.length
      this.dataCard[4].data = data.ssAllPassCount
    },
    async initTagData() {
      const arr = []
      const { data } = await this.$http.get("/account/getAllTag", {
        params: { user_id: this.user_id }
      })
      data.forEach(item =>
        arr.push({ label: item.tagName, value: String(item.tagId) })
      )
      this.$store.commit("saveTagData", JSON.stringify(arr))
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
  .data {
    display: flex;
    .data-card {
      flex: 1;
      text-align: center;
      border-color: rgb(194, 190, 190);
      .label {
        display: flex;
        height: 124px;
        align-items: center;
        justify-content: center;
        h1 {
          display: block;
          font-size: 50px;
        }
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
