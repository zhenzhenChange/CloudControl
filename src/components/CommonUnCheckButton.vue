<template>
  <Button type="info" icon="md-remove-circle" @click="unCheck">取消选中</Button>
</template>

<script>
export default {
  name: "UnCheckButton",
  props: { el: String },
  methods: {
    unCheck() {
      const parentRef = this.$parent.$refs
      parentRef[this.el].$refs[parentRef[this.el].TableRef].selectAll(false)
    }
  }
}
</script>
