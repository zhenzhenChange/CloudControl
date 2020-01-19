<template>
  <!-- 含输入框的模态窗复用组件 -->
  <Modal
    width="330"
    :mask-closable="false"
    v-model="isShowInputModal"
    @on-visible-change="visibleChange"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon color="#2d8cf0" type="md-add-circle" class="mr-5" />{{ title }}
    </p>
    <Input
      clearable
      :key="index"
      class="mb-10"
      :placeholder="`请输入${info}`"
      v-for="(info, index) in infos"
    >
      <span slot="prepend">{{ info }}</span>
    </Input>
    <div slot="footer">
      <Button icon="md-remove-circle">取消</Button>
      <Button type="success" icon="md-checkmark">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "InputModal",
  props: {
    infos: Array,
    title: String
  },
  data() {
    return {
      isShowInputModal: false
    }
  },
  methods: {
    visibleChange(value) {
      if (!value) {
        this.isShowInputModal = false
      }
    }
  }
}
</script>
