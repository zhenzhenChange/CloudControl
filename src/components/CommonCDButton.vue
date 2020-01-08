<template>
  <!-- C：增加 D：删除      增删按钮（Action）复用组件 -->
  <div class="CDButton">
    <Button type="error" icon="md-trash" class="mr-10" @click="deleteClick"
      >删除</Button
    >
    <Button type="primary" icon="md-add-circle" @click="addClick">添加</Button>
  </div>
</template>

<script>
export default {
  name: "CDButton",
  methods: {
    addClick() {
      this.$parent.addModalVisibleChange()
    },
    deleteClick() {
      this.$parent.deleteModalVisibleChange()
    }
  }
}
</script>

<style lang="scss" scoped>
.CDButton {
  width: 200px;
  float: left;
}
</style>
