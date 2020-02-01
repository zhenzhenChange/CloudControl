<template>
  <div class="PullGroup">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider />
    <PagedTable
      :data="data"
      :ref="PagedTableRef"
      :dataColumns="PullGroupColumns"
    />
    <Modal
      width="500"
      :closable="false"
      :mask-closable="false"
      v-model="isShowUrlModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon type="md-add-circle" color="#2D8CF0" class="mr-5 header-icon" />
        提交微信群至服务器（每次上传都会清空上一次）
      </p>
      <Input
        type="textarea"
        v-model="urlArea"
        :autosize="{ minRows: 5, maxRows: 15 }"
        placeholder="请将群链接粘贴至此处，一条链接占一行"
      ></Input>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="catchClick">取消</Button>
        <Button type="success" icon="md-checkmark" @click="tryClick">
          确定
        </Button>
      </div>
    </Modal>
    <Modal
      width="400"
      :closable="false"
      :mask-closable="false"
      v-model="isShowRadioModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon type="md-hand" color="#2D8CF0" class="mr-5 header-icon" />
        将该标签下的所有账号邀请入上传的微信群
      </p>
      <div class="flex-div">
        <span class="mr-10">类型选择</span>
        <RadioGroup v-model="opType">
          <Radio label="一手"></Radio>
          <Radio label="二手"></Radio>
        </RadioGroup>
      </div>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="catchClick">取消</Button>
        <Button type="success" icon="md-checkmark" @click="inviteTag">
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
      row: "",
      data: [],
      qrcode: "",
      urlArea: "",
      TagData: [],
      count: 0,
      pageIndex: 0,
      pageSize: 10,
      opType: "一手",
      isShowUrlModal: false,
      isShowRadioModal: false,
      radioSelectConfig: {},
      PagedTableRef: "PullGroupPagedTable",
      buttonListInfos: [
        { id: "create-p", type: "primary", icon: "md-add", name: "上传群链接" }
      ],
      PullGroupColumns: [
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
                  props: { type: "info", icon: "md-hand" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.isShowRadioModal = true
                      this.row = params.row
                    }
                  }
                },
                "邀请进群"
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.allData()
    this.initData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async allData() {
      const { data } = await this.$http.get("/account/getAllTag", {
        params: { user_id: this.user_id }
      })
      this.$refs[this.PagedTableRef].total = data.length
    },
    async initData() {
      this.data = []
      const { data } = await this.$http.get("/account/getAllTag", {
        params: {
          user_id: this.user_id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      data.forEach((item, index) => {
        this.TagData.push({ label: item.tagName, value: item.tagId })
        this.data.push({
          serialNumber: index + 1,
          tagName: item.tagName,
          tagId: String(item.tagId),
          tagCreateDate: this.$options.filters.date(item.tagCreateDate)
        })
      })
    },
    async tryClick() {
      if (!this.urlArea) {
        this.$Message.warning("请填入群链接")
        return
      }
      this.isShowUrlModal = false
      let grpUrl = []
      this.urlArea.split(/\n/g).forEach(item => grpUrl.push(item))
      grpUrl = grpUrl.filter(item => item !== "")
      const { msg } = await this.$http.post("/group/setGroupURL", grpUrl)
      this.$Message.info(msg)
    },
    catchClick() {
      this.isShowUrlModal = false
      this.isShowRadioModal = false
    },
    async inviteTag() {
      this.isShowRadioModal = false
      const maxPeople = 39
      const msg = await this.loopRequest(maxPeople)
      this.$Message.info(msg)
    },
    async loopRequest(maxPeople) {
      const opType = this.opType === "一手" ? 0 : 1
      const { msg } = await this.$http.get("/group/enterGroup", {
        params: { tagId: String(this.row.tagId), opType, maxPeople }
      })
      return msg
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-radio-group {
  vertical-align: bottom;
}
</style>
