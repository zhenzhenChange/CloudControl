<template>
  <!-- 添加编辑-纯输入框模态窗 -->
  <Modal
    width="330"
    :closable="false"
    :mask-closable="false"
    v-model="isShowEditModal"
    @on-visible-change="visibleChange"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon
        :type="config.icon"
        :color="config.color"
        class="mr-5 header-icon"
      />
      {{ config.title }}
    </p>
    <Input
      clearable
      :key="index"
      class="mb-10"
      v-model="inputInfo.value"
      :placeholder="`请输入${inputInfo.desc}`"
      v-for="(inputInfo, index) in config.inputInfos"
    >
      <span slot="prepend">{{ inputInfo.label }}</span>
    </Input>
    <div slot="footer">
      <Button icon="md-remove-circle" @click="catchClick">取消</Button>
      <Button type="success" icon="md-checkmark" @click="tryClick">
        {{ config.tryBtn }}
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "CommonEditModal",
  props: { config: Object },
  data() {
    return {
      groupId: "",
      userID: "",
      isShowEditModal: false
    }
  },
  methods: {
    visibleChange(value) {
      value ? "" : (this.isShowModal = false)
    },
    tryClick() {
      this.config.isUpdate ? this.update() : this.create()
      this.isShowEditModal = false
    },
    catchClick() {
      this.config.isUpdate
        ? this.$parent.editConfig.inputInfos.forEach(
            info => (info.value = null)
          )
        : ""

      this.isShowEditModal = false
    },
    async create() {
      const createData = {
        group_name: this.config.inputInfos[0].value,
        user_id: 100001
      }
      const { msg } = await this.$http.post("/account/addGroup", createData)
      if (msg) {
        this.$parent.getData()
        this.$Message.success("添加成功！")
      }
    },
    async update() {
      const updateData = {
        group_name: this.config.inputInfos[0].value,
        group_id: this.groupId,
        user_id: 100001
      }
      const res = await this.$http.post("/account/updateGroup", updateData)
      if (res) {
        this.$parent.getData()
        this.$Message.success("修改成功!")
      }
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
