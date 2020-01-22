<template>
  <Button type="info" @click="unCheck">取消选中</Button>
</template>

<script>
export default {
  name: "UnCheckButton",
  props: { el: String },
  methods: {
    unCheck() {
      this.$parent.$refs[this.el].$refs["CommonTable"].selectAll(false)
    }
  }
}
</script>

<style></style>
