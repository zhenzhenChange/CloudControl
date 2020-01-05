<template>
  <!-- 删除对话确认模态窗复用组件 -->
  <Modal
    width="330"
    :mask-closable="false"
    v-model="isShowConfirmModal"
    @on-visible-change="visibleChange"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon color="#ed4014" type="md-trash" class="mr-5" />{{ title }}
    </p>
    <div class="text-center">
      <p>确定要删除这{{ total }}条数据吗？</p>
    </div>
    <div slot="footer">
      <Button icon="md-remove-circle">取消</Button>
      <Button type="error" icon="md-trash">删除</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    title: String,
    total: Number
  },
  data() {
    return {
      isShowConfirmModal: false
    }
  },
  methods: {
    visibleChange(value) {
      if (!value) {
        this.isShowConfirmModal = false
      }
    }
  }
}
</script>

<style></style>
