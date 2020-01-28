<template>
  <Modal
    width="600"
    :mask-closable="false"
    v-model="isShowCreateModal"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon color="#2d8cf0" type="md-add-circle" class="mr-5" />
      {{ config.title }}
    </p>
    <div v-if="config.createConfig">
      <SearchSelect
        ref="select"
        class="float-left"
        :config="config.createConfig"
      />
    </div>
    <div class="upload mt-10 mb-10">
      <span class="title mr-10">账号数据</span>
      <Upload
        action=""
        :show-upload-list="false"
        :before-upload="handleBeforeUpload"
      >
        <Button icon="md-cloud-upload">批量上传账号</Button>
      </Upload>
    </div>
    <Input
      type="textarea"
      v-model="accountData"
      :autosize="{ minRows: 5, maxRows: 20 }"
      placeholder="账号格式：XXXX----XXXX----XXXX（账号----密码----A16/62数据），一个账号单独一行，多个账号多行，支持A16/62"
    >
    </Input>
    <div slot="footer">
      <Button icon="md-remove-circle" @click="catchClick">取消</Button>
      <Button type="success" icon="md-checkmark" @click="tryClick">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "CommonCreateModal",
  props: { config: Object },
  data() {
    return {
      accountData: "",
      isShowCreateModal: false
    }
  },
  methods: {
    handleBeforeUpload(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.accountData = reader.result
      }
      return false
    },
    catchClick() {
      this.accountData = ""
      this.isShowCreateModal = false
      this.$refs["select"].value = ""
    },
    tryClick() {
      this.$parent.uploadData(this.accountData, this.$refs["select"].value)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  .title {
    width: 56px;
    float: left;
    height: 32px;
    display: block;
    line-height: 32px;
  }
}
</style>
