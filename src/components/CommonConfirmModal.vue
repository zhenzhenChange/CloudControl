<template>
  <!-- 对话确认模态窗 -->
  <Modal
    width="330"
    :closable="false"
    :mask-closable="false"
    v-model="isShowConfirmModal"
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
      <Button icon="md-remove-circle" @click="catchClick">取消</Button>
      <Button :type="config.btnType" :icon="config.btnIcon" @click="tryClick">
        {{ config.btnText }}
      </Button>
    </div>
  </Modal>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "CommonConfirmModal",
  props: { config: Object },
  data() {
    return {
      params: null,
      isShowConfirmModal: false
    }
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    visibleChange(value) {
      value ? "" : (this.isShowConfirmModal = false)
    },
    tryClick() {
      this.$parent.remove(this.params)
      this.params = null
    },
    catchClick() {
      this.isShowConfirmModal = false
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
