<template>
  <div class="data">
    <Card class="data-card mr-20">
      <p slot="title">微信号在线量</p>
      <div class="text-center label">
        <h1>{{ data.ss_allOnlineCount.length }}</h1>
      </div>
    </Card>
    <Card class="data-card mr-20">
      <p slot="title">好友量</p>
      <div class="text-center label">
        <h1>{{ data.ss_allFriendCount.length }}</h1>
      </div>
    </Card>
    <Card class="data-card mr-20">
      <p slot="title">死号量</p>
      <div class="text-center label">
        <h1>{{ data.ss_allDeadCount.length }}</h1>
      </div>
    </Card>
    <Card class="data-card">
      <p slot="title">好友实时通过量</p>
      <div class="text-center label">
        <h1>{{ data.pass.length }}</h1>
      </div>
    </Card>
    <div class="clear-both"></div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: {
        ss_allOnlineCount: [1321, 321],
        ss_allFriendCount: [2, 4, 5],
        ss_allDeadCount: [2312, 2, 5, 7, 8],
        pass: [2312, 2, 5, 7, 8, 41]
      }
    }
  },
  created() {
    this.initData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async initData() {
      const { msg, data } = await this.$http.get("/common/getInit", {
        params: { user_id: this.user_id }
      })
      this.$Message.info(msg)
      if (data) {
        this.data = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.data {
  display: flex;
  .data-card {
    flex: 1;
    text-align: center;
    .label {
      display: flex;
      height: 250px;
      align-items: center;
      justify-content: center;
      h1 {
        display: block;
        font-size: 50px;
      }
    }
  }
}
</style>
