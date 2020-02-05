<template>
  <Modal
    width="400"
    :closable="false"
    :mask-closable="false"
    v-model="isShowComplexModal"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon
        type="md-contact"
        color="#2D8CF0"
        class="mr-5 header-icon"
      />添加通讯录好友
    </p>
    <div class="text-center">确定要为该分组下的所有账号添加通讯录好友吗？</div>
    <div slot="footer">
      <Button icon="md-remove-circle" @click="catchClick">取消</Button>
      <Button type="primary" icon="md-checkmark" @click="tryClick">
        确定
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "CommonComplexModal",
  props: { config: Object },
  data() {
    return {
      content: "",
      params: null,
      isDelayed: "是",
      isShowComplexModal: false
    }
  },
  methods: {
    catchClick() {
      this.isShowComplexModal = false
    },
    tryClick() {
      this.$parent.addMailFriend(this.params)
      this.params = null
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-radio-group {
  vertical-align: bottom;
}
</style>
