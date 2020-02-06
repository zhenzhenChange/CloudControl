<template>
  <div class="MailList">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider dashed />
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="MailColumns" />
    <CommonComplexModal ref="MailSetComplexModal" />
    <CommonConfirmModal
      :data="operationData"
      :ref="ConfirmModalRef"
      :config="operationConfig"
    />
    <Drawer width="900" :closable="false" v-model="isShowDrawer">
      <div slot="header" class="header-drawer">
        <div>
          <Icon type="md-create" color="#2D8CF0" class="mr-10" />创建加粉任务
        </div>
        <div>
          <Button
            class="mr-10"
            type="warning"
            icon="md-refresh"
            @click="resetClick"
          >
            重置
          </Button>
          <Button type="success" icon="md-checkmark" @click="createFansTask">
            立即提交
          </Button>
        </div>
      </div>
      <Row>
        <Col span="11">
          <Input clearable v-model="fansTaskName" placeholder="请设置任务名称">
            <span slot="prepend">任务名称</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="11">
          <Input v-model="currentGroupName" disabled>
            <span slot="prepend">当前分组</span>
          </Input>
        </Col>
        <Col span="12" offset="1">
          <Input v-model="currentGroupID" disabled>
            <span slot="prepend">分组ID</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <span class="ml-10 mr-10">号码格式</span>
          <RadioGroup v-model="mailType">
            <Radio label="纯手机号"></Radio>
            <Radio label="姓名----手机号"></Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="6">
          <div class="upload">
            <span class="title ml-10 mr-10">加粉数据</span>
            <Upload
              :show-upload-list="false"
              action="https://www.baidu.com/"
              :before-upload="handleBeforeUpload"
            >
              <Button icon="md-cloud-upload">上传TXT文件</Button>
            </Upload>
          </div>
        </Col>
        <Col span="4" offset="1">
          <Input disabled :placeholder="`数据条数：${mailListLength}`" />
        </Col>
        <Col span="12" offset="1">
          <Input disabled placeholder="每次上传都会清空上一次" />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input
            type="textarea"
            v-model="mailList"
            :autosize="{ minRows: 5, maxRows: 15 }"
            placeholder="请将通讯录粘贴或上传至此处，一条通讯录占一行"
          />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <span class="ml-10 mr-10">设置来源</span>
          <RadioGroup v-model="mailOrigin">
            <Radio label="手机搜索"></Radio>
            <Radio label="通讯录（单个上传单个添加）"></Radio>
            <Radio label="通讯录（多个上传单个添加）"></Radio>
            <Radio label="搜索通讯录混合添加"></Radio>
            <Radio label="自定义来源"></Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input clearable v-model="validInfo" placeholder="可自定义验证信息">
            <span slot="prepend">验证信息</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <span class="ml-10 mr-5">执行时间</span>
          <DatePicker
            separator=" 至 "
            class="date-range"
            v-model="dateRange"
            type="datetimerange"
            placeholder="加粉任务在指定时间内执行"
          ></DatePicker>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="11">
          <Input
            clearable
            class="float-left"
            v-model="blankTime"
            placeholder="请设置间隔时长"
          >
            <span slot="prepend">间隔时长</span>
          </Input>
        </Col>
        <Col span="12" offset="1">
          <Input
            disabled
            placeholder="多个账号进行加粉时，为单个账号设置间隔时长"
          >
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="11">
          <Input clearable v-model="requestNum" placeholder="请设置请求数量">
            <span slot="prepend">单号请求</span>
          </Input>
        </Col>
        <Col span="12" offset="1">
          <Input disabled placeholder="每个账号最多可提交的好友申请数" />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="11">
          <Input
            clearable
            class="float-left"
            v-model="freqInte"
            placeholder="请设置频繁间隔"
          >
            <span slot="prepend">频繁间隔</span>
          </Input>
        </Col>
        <Col span="12" offset="1">
          <Input
            disabled
            :placeholder="
              `每频繁一次隔 ${freqInte ? freqInte : 0} 秒后，重新开始加粉`
            "
          >
          </Input>
        </Col>
      </Row>
      <Row class="mt-10 mb-10">
        <Col span="11">
          <Input
            clearable
            class="float-left"
            v-model="freqLimit"
            placeholder="请设置频繁上限"
          >
            <span slot="prepend">频繁上限</span>
          </Input>
        </Col>
        <Col span="12" offset="1">
          <Input
            disabled
            :placeholder="
              `总频繁数达到 ${freqLimit ? freqLimit : 0} 次后，停止加粉`
            "
          >
          </Input>
        </Col>
      </Row>
    </Drawer>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      endTime: "",
      freqInte: "",
      mailList: "",
      pageSize: 10,
      pageIndex: 0,
      blankTime: "",
      freqLimit: "",
      startTime: "",
      dateRange: "",
      validInfo: "",
      requestNum: "",
      fansTaskName: "",
      operationData: [],
      currentGroupID: "",
      isShowDrawer: false,
      mailType: "纯手机号",
      operationConfig: {},
      currentGroupName: "",
      mailOrigin: "手机搜索",
      PagedTableRef: "MailPagedTable",
      ConfirmModalRef: "MailConfirmModal",
      buttonListInfos: [
        {
          type: "error",
          icon: "md-trash",
          id: "clearMailList",
          name: "清空已上传的通讯录"
        }
      ],
      MailColumns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "分组ID", key: "groupId" },
        { align: "center", title: "分组名称", key: "groupName" },
        { align: "center", title: "创建时间", key: "groupCreateDate" },
        {
          width: 200,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "info", icon: "md-person-add" },
                  on: {
                    click: () => {
                      const { groupName, groupId } = params.row
                      this.isShowDrawer = true
                      this.currentGroupID = groupId
                      this.currentGroupName = groupName
                    }
                  }
                },
                "创建加粉任务"
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
    ...mapState({ user_id: state => state.user_id }),
    mailListLength() {
      return this.mailList.split(/[\r\n]/g).filter(item => item !== "").length
    }
  },
  methods: {
    async allData() {
      const { data } = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      this.$refs[this.PagedTableRef].total = data.length
    },
    async initData() {
      this.data = []
      const { data } = await this.$http.get("/account/getAllGroup", {
        params: {
          user_id: this.user_id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      data.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          groupName: item.groupName,
          groupId: String(item.groupId),
          groupCreateDate: this.$options.filters.date(item.groupCreateDate)
        })
      })
    },
    async addMailFriend({ groupId: group_id }) {
      this.$refs["MailSetComplexModal"].isShowComplexModal = false
      const { msg } = await this.$http.post("/contact/addFriendsByContact", {
        group_id
      })
      this.$Message.info(msg)
    },
    handleBeforeUpload(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => (this.mailList = reader.result)
      return false
    },
    resetClick() {
      this.fansTaskName = ""
      this.mailList = ""
      this.validInfo = ""
      this.dateRange = null
      this.blankTime = ""
      this.requestNum = ""
      this.freqInte = ""
      this.freqLimit = ""
    },
    async createFansTask() {},
    /* async uploadMailList() {
      if (!this.mailList) {
        this.$Message.warning("请上传通讯录或手动粘贴")
        return
      }
      this.isShowModal = false
      let contact = []
      contact = this.mailList.split(/[\r\n]/g).filter(item => item !== "")
      const obj = { contact, user_id: this.user_id }
      const { data, msg } = await this.$http.post("/contact/upload", obj)
      this.mailList = ""
      if (data) {
        this.$Message.info(
          `${data.success}个账号上传成功，${data.error}个失败！`
        )
      } else {
        this.$Message.info(msg)
      }
    }, */
    async clearMailList() {
      this.$refs[this.ConfirmModalRef].isShowConfirmModal = false
      const { msg } = await this.$http.post("/contact/clearContact", {
        user_id: this.user_id
      })
      this.$Message.info(msg)
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-radio-group {
  vertical-align: bottom;
}

.header-drawer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.upload {
  .title {
    float: left;
    height: 32px;
    display: block;
    line-height: 32px;
  }
}

.date-range {
  width: 91%;
}
</style>
