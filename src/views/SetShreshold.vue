<template>
  <Card class="set-card">
    <p slot="title" class="title">封号率阈值设置</p>
    <Input class="card-input" v-model="limit">
      <span slot="prepend">封号率阈值（%）</span>
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
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      limit: 0,
      limitLoading: false
    }
  },
  computed: {
    ...mapGetters(["user_id", "Shreshold"])
  },
  created() {
    this.limit = this.Shreshold * 100
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
      const params = { userCdkey: this.limit / 100 }
      const { msg } = await this.$http.get("/common/setShreshold", { params })
      this.$store.commit("saveShreshold", this.limit / 100)
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
