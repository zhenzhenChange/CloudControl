<template>
  <Modal
    width="330"
    :mask-closable="false"
    v-model="isShowInputModal"
    @on-visible-change="visibleChange"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon color="#2d8cf0" type="md-create" class="mr-5" />{{ data.title }}
    </p>
    <Input
      clearable
      :key="index"
      class="mb-10"
      v-model="item.model"
      v-for="(item, index) in data.transmiData"
      :placeholder="`请输入${item.placeholder}`"
    >
      <span slot="prepend">{{ item.placeholder }}</span>
    </Input>
    <div slot="footer">
      <Button icon="md-remove-circle">取消</Button>
      <Button type="success" icon="md-checkmark">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "GroupEditModal",
  props: {
    data: Object
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
