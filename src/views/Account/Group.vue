<template>
  <!-- 分组管理 -->
  <div class="Group">
    <SearchInput :ref="SearchInputRef" :infos="['分组名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="buttonListInfos" />
    <CommonEditModal :config="updateConfig" :ref="EditModalRef" />
    <CommonConfirmModal
      :data="operationData"
      :ref="ConfirmModalRef"
      :config="operationConfig"
    />
    <Divider class="float-left" dashed />
    <UnCheckButton ref="UnCheckButton" :el="PagedTableRef" />
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="GroupColumns" />
    <TableDrawer ref="GroupTableDrawer" />
    <Drawer width="600" :closable="false" v-model="isShowDrawer">
      <div slot="header">
        <Icon type="md-create" color="#2D8CF0" class="mr-10" />创建拉群任务
      </div>
      <Row>
        <Col span="11">
          <Input clearable v-model="groupTaskName" placeholder="请设置任务名称">
            <span slot="prepend">任务名称</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="10">
          <Input v-model="currentGroupName" disabled>
            <span slot="prepend">当前分组</span>
          </Input>
        </Col>
        <Col span="13" offset="1">
          <Input v-model="currentGroupID" disabled>
            <span slot="prepend">分组ID</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="10">
          <Input clearable v-model="finalNum" placeholder="请设置群最终人数">
            <span slot="prepend">最终人数</span>
          </Input>
        </Col>
        <Col span="13" offset="1">
          <Input
            disabled
            placeholder="群最终人数（包括群主与小号），且要 <= 39"
          />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="10">
          <span class="ml-10 mr-10">类型选择</span>
          <RadioGroup v-model="checkType">
            <Radio label="一手"></Radio>
            <Radio label="二手"></Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input disabled placeholder="每次上传都会清空上一次" />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input
            type="textarea"
            v-model="urlList"
            :autosize="{ minRows: 5, maxRows: 15 }"
            placeholder="请将群链接粘贴至此处，一条链接占一行"
          />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="12">
          <Input disabled :placeholder="`群链接总数：${urlListLength}`" />
        </Col>
      </Row>
      <div class="drawer-footer">
        <Button
          class="mr-10"
          type="warning"
          icon="md-refresh"
          @click="resetClick"
        >
          重置
        </Button>
        <Button type="success" icon="md-checkmark" @click="createGroupTask">
          立即提交
        </Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      mutex: false,
      pageIndex: 0,
      pageSize: 10,
      updateConfig: {},
      operationData: [],
      urlList: "",
      finalNum: "",
      groupTaskName: "",
      supplyUrlList: "",
      reportData: [],
      checkType: "一手",
      currentGroupID: "",
      isShowDrawer: false,
      currentGroupName: "",
      EditModalRef: "GroupEditModal",
      PagedTableRef: "GroupPagedTable",
      SearchInputRef: "GroupSearchInput",
      ConfirmModalRef: "GroupConfirmModal",
      operationConfig: {
        icon: "md-trash",
        color: "#ED4014",
        title: "删除",
        operation: "删除",
        btnType: "error",
        btnIcon: "md-trash",
        btnText: "删除"
      },
      buttonListInfos: [
        { id: "remove-g", name: "删除", icon: "md-trash", type: "error" },
        { id: "create-g", name: "添加", icon: "md-add-circle", type: "primary" }
      ],
      GroupColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "分组名称", key: "groupName" },
        { align: "center", title: "分组ID", key: "groupId" },
        {
          sortable: true,
          align: "center",
          title: "创建时间",
          key: "groupCreateDate"
        },
        { align: "center", title: "组内账号总数", key: "total" },
        {
          width: 430,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  style: { marginRight: "5px" },
                  props: { size: "small", type: "info", icon: "md-share-alt" },
                  on: {
                    click: () => {
                      const { groupName, groupId } = params.row
                      this.isShowDrawer = true
                      this.currentGroupID = groupId
                      this.currentGroupName = groupName
                    }
                  }
                },
                "创建拉群任务"
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "success",
                    icon: "md-eye",
                    disabled: this.mutex
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      const { groupId } = params.row
                      this.$refs["GroupTableDrawer"].isShowTableDrawer = true
                      this.$refs["GroupTableDrawer"].getAccountDataByGroupID(
                        groupId
                      )
                      this.$refs["GroupTableDrawer"].initAllData(groupId)
                      this.$refs["GroupTableDrawer"].groupID = groupId
                    }
                  }
                },
                "查看详情"
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "primary",
                    icon: "md-create",
                    disabled: this.mutex
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.update(params.row)
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    icon: "md-trash",
                    disabled: this.mutex
                  },
                  on: {
                    click: () => {
                      const { groupId: group_id } = params.row
                      this.$refs[this.ConfirmModalRef].isShowConfirmModal = true
                      this.$refs[this.ConfirmModalRef].params = group_id
                    }
                  }
                },
                "删除"
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.allData()
    this.initData(null)
  },
  computed: {
    ...mapState({ user_id: state => state.user_id }),
    urlListLength() {
      return this.urlList.split(/[\r\n]/g).filter(item => item !== "").length
    }
  },
  methods: {
    async allData() {
      const { data } = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      this.$refs[this.PagedTableRef].total = data.length
      const arr = []
      data.forEach(item =>
        arr.push({ label: item.groupName, value: String(item.groupId) })
      )
      this.$store.commit("saveGroupData", JSON.stringify(arr))
    },
    async initData(keyWords) {
      this.data = []
      let arr = []
      let res = null
      if (keyWords) {
        res = await this.$http.get("/account/getGroupByName", {
          params: { group_name: keyWords, user_id: this.user_id }
        })
      } else {
        res = await this.$http.get("/account/getAllGroup", {
          params: {
            user_id: this.user_id,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        })
        res.data.forEach(item =>
          arr.push({ label: item.groupName, value: item.groupId })
        )
      }
      res.data.forEach(async (item, index) => {
        let total = await this.$http.post("/account/getAccount", {
          group_id: String(item.groupId)
        })
        this.data.push({
          serialNumber: index + 1,
          groupName: item.groupName,
          groupId: String(item.groupId),
          groupCreateDate: this.$options.filters.date(item.groupCreateDate),
          total: total.data.length
        })
      })
    },
    async create() {
      const editModal = this.$refs[this.EditModalRef]
      if (!editModal.value || editModal.value === " ") {
        this.$Message.warning("请输入分组名称（开头不能有空格）")
        return
      }
      this.$refs[this.EditModalRef].isShowEditModal = false
      const createData = { group_name: editModal.value, user_id: this.user_id }
      const { msg } = await this.$http.post("/account/addGroup", createData)
      this.$refs[this.EditModalRef].value = ""
      if (msg) {
        this.allData()
        this.initData()
        this.$Message.success("添加成功！")
      }
    },
    update({ groupName: group_name, groupId: group_id }) {
      this.updateConfig = {
        icon: "md-create",
        color: "#2D8CF0",
        title: "编辑分组",
        isUpdate: true,
        tryBtn: "保存",
        inputInfos: [
          { desc: "分组名称", label: "分组名称", model: group_name }
        ],
        updateData: { group_id },
        updateArgs: ["group_name"],
        url: "/account/updateGroup"
      }
      this.$refs[this.EditModalRef].isShowEditModal = true
      this.$refs[this.EditModalRef].value = false
    },
    async remove(params) {
      let group_id = []
      const ref = this.$refs
      if (params) {
        group_id.push(params)
      } else {
        group_id = this.operationData.map(item => item.groupId)
      }
      const { msg } = await this.$http.post("/account/deleteGroup", {
        group_id,
        user_id: this.user_id
      })
      if (msg) {
        this.allData()
        this.initData()
        ref["UnCheckButton"].unCheck()
        this.$Message.success(`删除成功（账号处于未分配状态）！`)
        ref[this.SearchInputRef].keyWords = ""
        ref[this.ConfirmModalRef].isShowConfirmModal = false
      }
    },
    handleBeforeUpload(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => (this.urlList = reader.result)
      return false
    },
    resetClick() {
      this.groupTaskName = this.finalNum = this.urlList = ""
    },
    async createGroupTask() {
      if (!this.groupTaskName) {
        this.$Message.warning("请设置任务名称！")
        return
      }
      if (!this.finalNum) {
        this.$Message.warning("请设置群最终人数！")
        return
      }
      if (this.finalNum > 39) {
        this.$Message.warning("群最终人数不能大于39！")
        return
      }
      if (!this.urlList) {
        this.$Message.warning("请填入群链接！")
        return
      }
      let grpUrl = this.urlList.split(/[\r\n]/g).filter(item => item !== "")
      const params = {
        maxPeople: this.finalNum - 5,
        groupId: this.currentGroupID,
        opType: this.checkType === "一手" ? "0" : "1"
      }
      await this.$http.post("/group/setGroupURL", {
        grpUrl,
        taskName: this.groupTaskName
      })
      const { msg } = await this.$http.get("/group/enterGroup", { params })
      this.$Message.info(msg)
      this.resetClick()
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-footer {
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: right;
  padding: 10px 16px;
  position: absolute;
  background: #fff;
  border-top: 1px solid #e8e8e8;
}
</style>
