<template>
  <Modal
    width="500"
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
      />为该标签下的所有账号添加通讯录好友
    </p>
    <div>
      <span class="mr-10">是否延时</span>
      <RadioGroup v-model="isDelayed">
        <Radio label="是"></Radio>
        <Radio label="否"></Radio>
      </RadioGroup>
    </div>
    <Input
      clearable
      v-model="content"
      class="mt-10 mr-10"
      placeholder="可选，默认选取素材库中已有模板"
    >
      <span slot="prepend">验证消息</span>
    </Input>
    <div class="mt-10 color-red">
      （可选）自定义填入通讯录号码，不填则默认添加已上传的通讯录
    </div>
    <Input
      type="textarea"
      v-model="handInput"
      class="mt-10 mr-10"
      :autosize="{ minRows: 5, maxRows: 20 }"
    >
    </Input>
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
      handInput: "",
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
