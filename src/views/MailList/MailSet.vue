<template>
  <div class="MailList">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider dashed />
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="MailColumns" />
    <CommonComplexModal ref="MailSetComplexModal" />
    <Modal
      width="500"
      :mask-closable="false"
      v-model="isShowModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon color="#2d8cf0" type="md-cloud-upload" class="mr-5" />
        {{ mailListConfig.title }}
      </p>
      <div class="color-red">
        可选取本地文件上传(将自动解析文件内容)，也可复制粘贴到文本区域上传
      </div>
      <div class="mt-10 color-red">
        <span class="mr-30">纯手机号：18166661111</span>
        <span>姓名----手机号：小明----18166661111</span><br />
        <div class="mt-10">格式：一条通讯录单独一行，多条通讯录多行</div>
      </div>
      <div class="upload mt-10 mb-10">
        <span class="title mr-10">上传通讯录</span>
        <Upload
          action=""
          :show-upload-list="false"
          :before-upload="handleBeforeUpload"
        >
          <Button icon="md-cloud-upload">选取本地TXT文件</Button>
        </Upload>
      </div>
      <div class="mb-10 config">
        <span class="mr-10">通讯录格式</span>
        <RadioGroup v-model="isMailType">
          <Radio border label="纯手机号"></Radio>
          <Radio border label="姓名----手机号"></Radio>
        </RadioGroup>
      </div>
      <Input
        type="textarea"
        v-model="mailList"
        :autosize="{ minRows: 5, maxRows: 20 }"
      >
      </Input>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="catchClick">取消</Button>
        <Button type="success" icon="md-checkmark" @click="uploadMailList">
          确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      mailList: "",
      isShowModal: false,
      isMailType: "纯手机号",
      PagedTableRef: "MailPagedTable",
      mailListConfig: { title: "上传通讯录" },
      buttonListInfos: [
        {
          id: "uploadMailList",
          type: "primary",
          icon: "md-cloud-upload",
          name: "上传通讯录"
        }
      ],
      MailColumns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "标签名称", key: "tagName" },
        { align: "center", title: "标签ID", key: "tagId" },
        {
          sortable: true,
          align: "center",
          title: "创建时间",
          key: "tagCreateDate"
        },
        {
          width: 230,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "primary", icon: "md-person-add" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.$refs[
                        "MailSetComplexModal"
                      ].isShowComplexModal = true
                      this.$refs["MailSetComplexModal"].params = params.row
                    }
                  }
                },
                "添加通讯录好友"
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.initData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async initData() {
      this.data = []
      const { data } = await this.$http.get("/account/getAllTag", {
        params: { user_id: this.user_id }
      })
      data.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          tagName: item.tagName,
          tagId: item.tagId,
          tagCreateDate: this.$options.filters.date(item.tagCreateDate)
        })
      })
    },
    async addMailFriend({ tagId: tag_id }) {
      this.$refs["MailSetComplexModal"].isShowComplexModal = false
      const { msg } = await this.$http.post("/contact/addFriends", { tag_id })
      this.$Message.info(msg)
    },
    handleBeforeUpload(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.mailList = reader.result
      }
      return false
    },
    catchClick() {
      this.isShowModal = false
    },
    async uploadMailList() {
      if (!this.mailList) {
        this.$Message.warning("请上传通讯录或手动粘贴")
        return
      }
      this.isShowModal = false
      let contact = []
      contact = this.mailList.split(/\n/g).filter(item => item !== "")
      const obj = { contact, user_id: this.user_id }
      const { data } = await this.$http.post("/contact/upload", obj)
      this.mailList = ""
      this.$Message.info(`${data.success}个账号上传成功，${data.error}个失败！`)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  .title {
    float: left;
    height: 32px;
    display: block;
    line-height: 32px;
  }
}
</style>
