<template>
  <!-- C：增加 D：删除      增删按钮（Action）复用组件 -->
  <div class="CDComponents">
    <Button
      type="error"
      icon="md-trash"
      @click="isShowInputModal = true"
      class="mr-10"
      >删除</Button
    >
    <Button type="primary" icon="md-add-circle" @click="isShowInputModal = true"
      >添加</Button
    >
  </div>
</template>

<script>
export default {
  name: "CDComponents",
  props: {
    isShowInputModal: String
  }
}
</script>

<style></style>
