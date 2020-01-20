<template>
  <Modal
    width="330"
    :mask-closable="false"
    @on-visible-change="visibleChange"
    class-name="vertical-center-modal"
    v-model="isShowMAccountTrendModal"
  >
    <p slot="header">
      <Icon color="#FF9900" :type="type" class="mr-5" />{{ title }}
    </p>
    <div class="text-center">
      <p>确定要{{ title }}这{{ total ? total.length : "" }}个账号吗？</p>
    </div>
    <div slot="footer">
      <Button icon="md-remove-circle">取消</Button>
      <Button type="success" icon="md-checkmark" @click="checkMark"
        >确定</Button
      >
    </div>
  </Modal>
</template>

<script>
export default {
  name: "MAccountTrendModal",
  props: {
    type: String,
    total: Array,
    title: String
  },
  data() {
    return {
      isShowMAccountTrendModal: false
    }
  },
  methods: {
    visibleChange(value) {
      if (!value) {
        this.isShowMAccountTrendModal = false
      }
    },
    checkMark() {
      // console.log(this.total)
    }
  }
}
</script>
