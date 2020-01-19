<template>
  <Modal
    width="600"
    :mask-closable="false"
    v-model="isShowMAccountCreateModal"
    @on-visible-change="visibleChange"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon color="#2d8cf0" type="md-add-circle" class="mr-5" />{{ title }}
    </p>
    <SearchSelect :title="'所属分组'" :options="cityList" :info="'分组'" />
    <Button class="ml--20" type="primary" shape="circle" icon="md-refresh" />
    <div class="upload mt-10 mb-10">
      <span class="title mr-10">账号数据</span>
      <Upload action="">
        <Button icon="md-cloud-upload">批量上传账号</Button>
      </Upload>
    </div>
    <Input
      type="textarea"
      :autosize="{ minRows: 5, maxRows: 20 }"
      placeholder="账号格式：XXXX----XXXX----XXXX（账号----密码----A16/62数据），一个账号单独一行，多个账号多行，支持A16/62"
    >
    </Input>
    <div slot="footer">
      <Button icon="md-remove-circle">取消</Button>
      <Button type="success" icon="md-checkmark">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "MAccountCreateModal",
  props: {
    infos: Array,
    title: String
  },
  data() {
    return {
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      isShowMAccountCreateModal: false
    }
  },
  methods: {
    visibleChange(value) {
      if (!value) {
        this.isShowMAccountCreateModal = false
      }
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
