<template>
  <!-- 分组管理 -->
  <div class="Group">
    <SearchInput :ref="SearchInputRef" :infos="['分组名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="buttonListInfos" />
    <CommonEditModal :config="updateConfig" :ref="EditModalRef" />
    <CommonConfirmModal :data="operationData" :ref="ConfirmModalRef" :config="operationConfig" />
    <Divider class="float-left" dashed />
    <UnCheckButton ref="UnCheckButton" :el="PagedTableRef" />
    <Button class="ml-10" type="info" icon="md-refresh" @click="refreshData">刷新数据</Button>
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="GroupColumns" />
    <TableDrawer ref="GroupTableDrawer" />
    <Drawer width="600" :closable="false" v-model="isShowDrawer">
      <div slot="header" class="header-drawer">
        <div><Icon type="md-create" color="#2D8CF0" class="mr-10" />创建拉群任务</div>
        <div>
          <Button type="error" class="mr-10" icon="md-barcode" @click="showQRCodeDrawer">
            二维码解码
          </Button>
          <Button class="mr-10" type="warning" icon="md-refresh" @click="resetClick">重置</Button>
          <Button type="success" icon="md-checkmark" @click="createGroupTask">立即提交</Button>
        </div>
      </div>
      <Row>
        <Col span="10">
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
          <Input disabled placeholder="群最终人数（包括群主与小号），且要 <= 39" />
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
    </Drawer>
    <CommonQRCodeDrawer ref="QRCodeDrawer" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
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
        { align: "center", title: "分组ID", key: "groupId" },
        { align: "center", title: "分组名称", key: "groupName" },
        { sortable: true, align: "center", title: "创建时间", key: "groupCreateDate" },
        { align: "center", title: "组内账号总数", key: "total" },
        {
          width: 430,
          title: "操作",
          align: "center",
          render: (h, params) => {
            const { groupId, groupName } = params.row
            return h("div", [
              h(
                "Button",
                {
                  style: { marginRight: "5px", marginTop: "5px" },
                  props: { size: "small", type: "error", icon: "md-heart" },
                  on: {
                    click: async () => {
                      const params = { groupId }
                      await this.$http.get("/heart/startHeartBeat", { params })
                      this.$Message.success("开启成功！")
                    }
                  }
                },
                "开启心跳监控"
              ),
              h(
                "Button",
                {
                  style: { marginRight: "5px", marginTop: "5px" },
                  props: { size: "small", type: "error", icon: "md-heart-outline" },
                  on: {
                    click: async () => {
                      const params = { groupId }
                      await this.$http.get("/heart/closeHeartBeat", { params })
                      this.$Message.success("关闭成功！")
                    }
                  }
                },
                "关闭心跳监控"
              ),
              h(
                "Button",
                {
                  style: { marginRight: "5px", marginTop: "5px" },
                  props: { size: "small", type: "info", icon: "md-share-alt" },
                  on: {
                    click: () => {
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
                  style: { marginRight: "5px", marginTop: "5px", marginBottom: "5px" },
                  props: { size: "small", type: "success", icon: "md-eye", disabled: this.mutex },
                  on: {
                    click: () => {
                      this.$refs["GroupTableDrawer"].isShowTableDrawer = true
                      this.$refs["GroupTableDrawer"].groupID = groupId
                      this.$refs["GroupTableDrawer"].initAllData(groupId)
                      this.$refs["GroupTableDrawer"].getAccountDataByGroupID(groupId)
                      // this.$refs["GroupTableDrawer"].checkHeart(groupId)
                    }
                  }
                },
                "查看详情"
              ),
              h(
                "Button",
                {
                  style: { marginRight: "5px", marginTop: "5px", marginBottom: "5px" },
                  props: { size: "small", type: "info", icon: "md-create", disabled: this.mutex },
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
                  style: { marginBottom: "5px", marginTop: "5px" },
                  props: { type: "error", size: "small", icon: "md-trash", disabled: this.mutex },
                  on: {
                    click: () => {
                      this.$refs[this.ConfirmModalRef].isShowConfirmModal = true
                      this.$refs[this.ConfirmModalRef].params = groupId
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
    ...mapGetters(["user_id", "GroupDataTotal"]),
    urlListLength() {
      return this.urlList.split(/[\r\n]/g).filter(item => item !== "").length
    }
  },
  methods: {
    async allData() {
      const arr = []
      const params = { userId: this.user_id, size: 999999, currentPage: 1 }
      const data = await this.$http.get("/account/getAllGroup", { params })
      data.forEach(item =>
        arr.push({ label: item.tbGroupEntity.groupName, value: String(item.tbGroupEntity.groupId) })
      )
      this.$store.commit("saveGroupData", JSON.stringify(arr))
      this.$store.commit("saveGroupDataTotal", data.length)
      this.$refs[this.PagedTableRef].total = data.length
    },
    async initData(keyWords) {
      this.data = []
      let res = null
      if (keyWords) {
        const params = { group_name: keyWords, user_id: this.user_id }
        res = await this.$http.get("/account/getGroupByName", { params })
      } else {
        const params = {
          userId: this.user_id,
          size: Number(this.pageSize),
          currentPage: Number(this.pageIndex) + 1
        }
        res = await this.$http.get("/account/getAllGroup", { params })
      }
      res.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          total: item.accountCount,
          groupName: item.tbGroupEntity.groupName,
          groupId: String(item.tbGroupEntity.groupId),
          groupCreateDate: this.$options.filters.date(item.tbGroupEntity.groupCreateDate)
        })
      })
    },
    async create() {
      const editModal = this.$refs[this.EditModalRef]
      if (!editModal.value || editModal.value === " ") {
        this.$Message.warning("请输入分组名称（不能以空格开头）")
        return
      }
      this.$refs[this.EditModalRef].isShowEditModal = false
      const createData = { group_name: editModal.value, user_id: this.user_id }
      const { msg } = await this.$http.post("/account/addGroup", createData)
      this.$refs[this.EditModalRef].value = ""
      if (msg) {
        this.allData()
        this.initData(null)
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
        inputInfos: [{ desc: "分组名称", label: "分组名称", model: group_name }],
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
      const args = { group_id, user_id: this.user_id }
      const { msg } = await this.$http.post("/account/deleteGroup", args)
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
        groupId: this.currentGroupID,
        taskName: this.groupTaskName,
        maxPeople: this.finalNum - 5,
        opType: this.checkType === "一手" ? "0" : "1"
      }
      const args = { grpUrl, taskName: this.groupTaskName }
      await this.$http.post("/group/setGroupURL", args)
      const { msg } = await this.$http.get("/group/enterGroup", { params })
      this.$Message.info(msg)
      this.resetClick()
    },
    showQRCodeDrawer() {
      this.$refs["QRCodeDrawer"].isShowQRCodeDrawer = true
    },
    refreshData() {
      this.allData()
      this.initData(null)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-drawer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
