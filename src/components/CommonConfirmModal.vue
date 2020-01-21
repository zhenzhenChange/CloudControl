<template>
  <!-- 对话确认模态窗 -->
  <Modal
    width="330"
    :closable="false"
    :mask-closable="false"
    v-model="isShowModal"
    @on-visible-change="visibleChange"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon
        :type="config.icon"
        :color="config.color"
        class="mr-5 header-icon"
      />{{ config.title }}
    </p>
    <div class="text-center">
      <p>确定要{{ config.operation }}吗？</p>
    </div>
    <div slot="footer">
      <Button icon="md-remove-circle" @click="catchBtn">取消</Button>
      <Button :type="config.btnType" :icon="config.btnIcon" @click="tryBtn">
        {{ config.btnText }}
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "CommonConfirmModal",
  props: { data: Array, config: Object },
  data() {
    return {
      isShowModal: false
    }
  },
  methods: {
    visibleChange(value) {
      value ? "" : (this.isShowModal = false)
    },
    tryBtn() {
      let group_id = []
      if (this.data.length === 1) {
        group_id = this.data
        return
      }
      this.data.forEach(item => group_id.push(item.group_id))
    },
    catchBtn() {
      if (this.data.length === 1) {
        this.$parent.selectedData = []
      }
      this.isShowModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header-icon {
  width: 20px;
  height: 20px;
  vertical-align: -0.05em;
}
</style>
