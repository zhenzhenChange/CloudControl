<template>
  <Modal
    width="330"
    :mask-closable="false"
    v-model="isShowSetModal"
    @on-visible-change="visibleChange"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon color="#19be6b" type="md-settings" class="mr-5" />{{ config.title }}
    </p>
    <div class="radio">
      <span class="label mr-10">{{ config.label }}</span>
      <RadioGroup v-model="value">
        <Radio class="mr-20" :label="config.reallyText" />
        <Radio :label="config.fakeText" />
      </RadioGroup>
    </div>
    <div slot="footer">
      <Button icon="md-remove-circle">取消</Button>
      <Button type="success" icon="md-checkmark-circle">保存</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "SAccountSetModal",
  props: {
    config: Object
  },
  data() {
    return {
      value: this.config.reallyText,
      isShowSetModal: false
    }
  },
  methods: {
    visibleChange(value) {
      if (!value) {
        this.isShowSetModal = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.radio {
  height: 22.7px;
  .label {
    float: left;
    height: 22.7px;
    line-height: 25px;
  }
}
</style>
