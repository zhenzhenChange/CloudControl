<template>
  <Card class="set-card">
    <p slot="title" class="title">封号率阈值设置</p>
    <Input class="card-input" v-model="limit">
      <span slot="prepend">封号率（单位%）</span>
    </Input>
    <div class="mt-10">
      <Button
        long
        size="large"
        type="success"
        icon="md-checkbox"
        @click="saveLimit"
        :loading="limitLoading"
      >
        保存
      </Button>
    </div>
  </Card>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      limit: "",
      limitLoading: false
    }
  },
  computed: {
    ...mapState({ user_id: state => state.user_id, Shreshold: state => state.Shreshold })
  },
  created() {
    this.limit = this.Shreshold
  },
  methods: {
    async saveLimit() {
      if (this.limit < 0 || this.limit > 100) {
        this.$Message.error("很明显你输入的值不在100%内~")
        return
      }
      if (isNaN(Number(this.limit))) {
        this.$Message.error("请输入纯数字~")
        return
      }
      this.limitLoading = true
      const arg = { user_id: this.user_id, shreshold: this.limit }
      const { msg } = await this.$http.post("/common/setShreshold", arg)
      this.$store.commit("saveShreshold", this.limit)
      this.$Message.info(msg)
      this.limitLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.set-card {
  width: 300px;
  margin: 0 auto;
  .title {
    text-align: center;
  }
}
</style>
