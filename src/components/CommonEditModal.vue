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
    <div v-if="!config.isUpdate">
      <Input
        clearable
        :key="index"
        class="mb-10"
        v-model="value"
        :placeholder="`请输入${inputInfo.desc}`"
        v-for="(inputInfo, index) in config.inputInfos"
      >
        <span slot="prepend">{{ inputInfo.label }}</span>
      </Input>
    </div>
    <div v-if="config.isUpdate">
      <Input
        clearable
        :key="index"
        class="mb-10"
        v-model="inputInfo.model"
        :placeholder="`请输入${inputInfo.desc}`"
        v-for="(inputInfo, index) in config.inputInfos"
      >
        <span slot="prepend">{{ inputInfo.label }}</span>
      </Input>
    </div>
    <div slot="footer">
      <Button icon="md-remove-circle" @click="catchClick">取消</Button>
      <Button type="success" icon="md-checkmark" @click="tryClick">
        {{ config.tryBtn }}
      </Button>
    </div>
  </Modal>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "CommonEditModal",
  props: { config: Object },
  data() {
    return {
      value: "",
      isShowEditModal: false
    }
  },
  computed: {
    ...mapState({
      user_id: state => state.user_id
    })
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
        ? this.$parent.updateConfig.inputInfos.forEach(
            info => (info.model = "")
          )
        : ""

      this.isShowEditModal = false
    },
    async create() {
      const createData = {
        group_name: this.value,
        user_id: this.user_id
      }
      const { msg } = await this.$http.post("/account/addGroup", createData)
      this.value = ""
      if (msg) {
        this.$parent.getData()
        this.$Message.success("添加成功！")
      }
    },
    async update() {
      let updateData = {}
      for (let key in this.config.updateData) {
        updateData = { [key]: this.config.updateData[key] }
      }
      updateData[this.config.updateArgs] = this.config.inputInfos[0].model
      updateData = Object.assign({}, updateData, { user_id: this.user_id })
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
