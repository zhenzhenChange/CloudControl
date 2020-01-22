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
export default {
  name: "CommonConfirmModal",
  props: { data: Array, config: Object },
  data() {
    return {
      isShowConfirmModal: false
    }
  },
  methods: {
    visibleChange(value) {
      value ? "" : (this.isShowConfirmModal = false)
    },
    async tryClick() {
      let IDArray = []
      if (this.data.length === 1) {
        IDArray.push(String(this.data[0]))
      } else {
        this.data.forEach(item => IDArray.push(String(item.groupId)))
      }
      const deleteData = { group_id: IDArray, user_id: 100001 }
      const { msg } = await this.$http.post("/account/deleteGroup", deleteData)
      if (msg) {
        this.$parent.getData()
        this.$Message.success("删除成功！")
        this.isShowConfirmModal = false
      }
    },
    catchClick() {
      if (this.data.length === 1) {
        this.$parent.operationData = []
      }
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
