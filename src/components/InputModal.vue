<template>
  <!-- 含输入框的模态窗复用组件 -->
  <Modal
    width="330"
    :title="title"
    :mask-closable="false"
    v-model="isShowInputModal"
    class-name="vertical-center-modal"
  >
    <Input clearable :placeholder="`请输入${inputOne}`" class="mb-10">
      <span slot="prepend">{{ inputOne }}</span>
    </Input>
    <Input clearable :placeholder="`请输入${inputTwo}`">
      <span slot="prepend">{{ inputTwo }}</span>
    </Input>
  </Modal>
</template>

<script>
export default {
  props: {
    title: String,
    isShowInputModal: Boolean,
    inputOne: String,
    inputTwo: String
  }
}
</script>

<style></style>
