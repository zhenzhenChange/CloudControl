<template>
  <!-- 分组 && 账号 && 拉群 -->
  <div>
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
      <div slot="header" class="flex-center-between">
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
          <Input clearable v-model="groupTaskName" placeholder="请设置任务名称">
            <span slot="prepend">任务名称</span>
          </Input>
        </Col>
        <Col span="13" offset="1">
          <Input disabled placeholder="订单标识，于拉群任务处查看" />
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
            <Radio label="一手" />
            <Radio label="二手" />
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
        <Col span="24">
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
      enterGroupCount: 0,
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
        { align: "center", title: "创建时间", key: "groupCreateDate" },
        { align: "center", title: "组内账号总数", key: "accountCount" },
        {
          width: 430,
          title: "操作",
          align: "center",
          render: (h, params) => {
            const { groupId, groupName } = params.row
            return h("div", [
              /* h(
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
              ), */
              h(
                "Button",
                {
                  style: { marginRight: "5px" },
                  props: {
                    type: "info",
                    size: "small",
                    icon: "md-share-alt",
                    disabled: this.mutex
                  },
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
                  style: { marginRight: "5px" },
                  props: { size: "small", type: "success", icon: "md-eye", disabled: this.mutex },
                  on: {
                    click: async () => {
                      await this.$http.get("/heart/sendHeartBeat", { params: { groupId } })
                      const ref = this.$refs["GroupTableDrawer"]
                      ref.groupID = groupId
                      ref.isShowTableDrawer = true
                      ref.initAllData(groupId)
                      ref.getDataByGroupID(groupId)
                    }
                  }
                },
                "查看详情"
              ),
              h(
                "Button",
                {
                  style: { marginRight: "5px" },
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
                  props: { type: "error", size: "small", icon: "md-trash", disabled: this.mutex },
                  on: {
                    click: () => {
                      const ref = this.$refs[this.ConfirmModalRef]
                      ref.params = groupId
                      ref.isShowConfirmModal = true
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
    // 初始化数据
    this.allData()
    this.initData(null)
  },
  computed: {
    ...mapGetters(["user_id", "GroupDataTotal"]),
    urlListLength() {
      // 计算有效的（去除空行、换行）群链接条数
      return this.urlList.split(/[\r\n]/g).filter(item => item !== "").length
    }
  },
  methods: {
    /* 获取所有分组信息 */
    async allData() {
      const spareGroup = []

      // 获取所有分组信息API
      const params = { userId: this.user_id, size: 999999, currentPage: 1 }
      const data = await this.$http.get("/account/getAllGroup", { params })

      // 遍历取出分组名称与分组ID（需转化成字符串，其他API的参数类型要求是字符串），供下拉选择使用
      data.forEach(item => {
        spareGroup.push({
          label: item.tbGroupEntity.groupName,
          value: String(item.tbGroupEntity.groupId)
        })
      })

      // 表格总数（分组个数）
      const spareGroupLength = spareGroup.length
      this.$refs[this.PagedTableRef].total = spareGroupLength

      // Vuex全局存放分组信息与分组个数，供其他页面使用
      this.$store.commit("saveGroupData", JSON.stringify(spareGroup))
      this.$store.commit("saveGroupDataTotal", spareGroupLength)
    },
    /* 根据分页参数请求数据 */
    async initData(keyWords) {
      let data

      // 每次置空，防止数据重复push
      this.data = []

      // 判断是否有关键词 如果有则是模糊查找，否则为无条件查找
      if (keyWords) {
        const params = { group_name: keyWords, user_id: this.user_id }
        data = (await this.$http.get("/account/getGroupByName", { params })).data
      } else {
        // 根据分页参数请求数据
        const params = {
          userId: this.user_id,
          size: this.pageSize,
          currentPage: this.pageIndex + 1
        }
        data = await this.$http.get("/account/getAllGroup", { params })
      }

      // 遍历数据，根据表格的 Columns 的 key 组装对应的数据
      data.forEach((item, index) => {
        const Group = item.tbGroupEntity
        this.data.push({
          groupId: String(Group.groupId), // 分组ID
          groupName: Group.groupName, // 分组名称
          serialNumber: index + 1, // 序号
          accountCount: item.accountCount, // 组内账号总数
          groupCreateDate: this.$options.filters.date(Group.groupCreateDate) // 格式化日期
        })
      })
    },
    /* 创建分组 */
    async create() {
      // 缓存编辑模态窗
      const editModal = this.$refs[this.EditModalRef]

      // 缓存编辑模态窗中文本框的值
      const value = editModal.value

      // 校验非空
      if (!value || value === " " || value.length === 0) {
        this.$Message.warning("请输入分组名称（且不能以空格开头）！")
        return
      }

      // 创建分组API
      const createData = { group_name: value, user_id: this.user_id }
      const { msg } = await this.$http.post("/account/addGroup", createData)

      // 清空文本框，关闭模态窗
      editModal.value = ""
      editModal.isShowEditModal = false

      if (msg) {
        // 更新数据并弹出提示信息
        this.allData()
        this.initData(null)
        this.$Message.success("添加成功！")
      }
    },
    /* TODO 改造 编辑分组 */
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
    /* TODO 改造 删除分组 */
    async remove(params) {
      let group_id = []

      // 缓存refs
      const ref = this.$refs

      // 如果有参数，则是单个删除
      if (params) group_id.push(params)
      // 否则为多选删除
      else group_id = this.operationData.map(item => item.groupId)

      // 删除分组API
      const args = { group_id, user_id: this.user_id }
      const { msg } = await this.$http.post("/account/deleteGroup", args)

      if (msg) {
        // 更新数据
        this.allData()
        this.initData(null)

        // 取消选中状态，清空搜索框，关闭模态窗，并弹出提示信息
        ref["UnCheckButton"].unCheck()
        ref[this.SearchInputRef].keyWords = ""
        ref[this.ConfirmModalRef].isShowConfirmModal = false
        this.$Message.success(`删除成功（账号处于未分配状态）！`)
      }
    },
    /* 重置按钮 */
    resetClick() {
      this.groupTaskName = this.finalNum = this.urlList = ""
    },
    /* 创建拉群订单 */
    async createGroupTask() {
      // 校验表单
      const msgArr = [
        { name: "群聊链接", value: this.urlList },
        { name: "最终人数", value: this.finalNum },
        { name: "任务名称", value: this.groupTaskName }
      ]
      let flag = false
      msgArr.forEach(item => {
        if (!item.value) {
          this.$Message.warning(`${item.name}不能为空！`)
          flag = false
        }
        flag = true
      })
      if (this.finalNum > 39) {
        this.$Message.warning("群最终人数不能大于39！")
        return
      }
      if (!flag) return

      // 根据换行符、回车符分割，去除空项
      const grpUrl = this.urlList.split(/[\r\n]/g).filter(item => item !== "")

      // 上传群链接API
      const args = { grpUrl, taskName: this.groupTaskName }
      await this.$http.post("/group/setGroupURL", args)

      // 创建拉群订单API
      const params = {
        groupId: this.currentGroupID,
        taskName: this.groupTaskName,
        maxPeople: this.finalNum,
        opType: this.checkType === "一手" ? "0" : "1"
      }
      const { msg } = await this.$http.get("/group/enterGroupHasCalculation", { params })

      // 弹出提示信息且重置表单
      this.$Message.info(msg)
      this.resetClick()
    },
    /* 打开抽屉 */
    showQRCodeDrawer() {
      this.$refs["QRCodeDrawer"].isShowQRCodeDrawer = true
    },
    /* 手动更新数据按钮 */
    refreshData() {
      this.allData()
      this.initData(null)
    }
    /* async loopEnterGroup(params, max) {
      this.enterGroupCount++
      let maxPeople = params.maxPeople
      if (maxPeople > 10) {
        params.maxPeople = 10
        maxPeople = maxPeople - 10
      } else {
        params.maxPeople = maxPeople
      }
      const { data, msg } = await this.$http.get("/group/enterGroup", { params })
      data.forEach(item => {
        if (item.groupAmount < max && this.enterGroupCount !== 5 * data.length) {
          this.loopEnterGroup(params, max)
        }
      })
    } */
  }
}
</script>
