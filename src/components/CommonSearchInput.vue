<template>
  <!-- 输入框搜索复用组件 -->
  <div class="SearchInput">
    <Input
      clearable
      :key="index"
      class="mr-10"
      v-model="keyWords"
      @on-change="change"
      :placeholder="`请输入${info}`"
      v-for="(info, index) in infos"
    >
      <span slot="prepend">{{ info }}</span>
    </Input>
    <Button type="primary" shape="circle" icon="ios-search" @click="search" />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "SearchInput",
  props: { infos: Array },
  data() {
    return {
      keyWords: ""
    }
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    search() {
      if (!this.keyWords) {
        this.$parent.initData()
        return
      }
      this.$parent.initData(this.keyWords)
    },
    change() {
      this.keyWords ? "" : this.$parent.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
.SearchInput {
  div {
    float: left;
    width: 250px;
    .title {
      float: left;
      width: 60px;
      height: 32px;
      margin-top: 1px;
      line-height: 32px;
    }
    .select {
      width: 180px;
      margin-top: 1px;
    }
  }
}
</style>
