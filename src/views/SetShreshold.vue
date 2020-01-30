<template>
  <Card class="set-card">
    <p slot="title" class="title">封号率阈值设置</p>
    <InputNumber
      :min="0"
      :max="100"
      size="large"
      v-model="limit"
      class="card-input"
      :formatter="value => `${value}%`"
      :parser="value => value.replace('%', '')"
    >
    </InputNumber>
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
      limit: null,
      limitLoading: false
    }
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async saveLimit() {
      this.limitLoading = true
      const { msg } = await this.$http.post("/common/setShreshold", {
        shreshold: this.limit,
        user_id: this.user_id
      })
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
  .card-input {
    flex: 1;
    width: 150px;
    margin-left: 60px;
  }
}
</style>
