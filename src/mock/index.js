const Mock = require("mockjs")

const groupingData = Mock.mock({
  "data|10": [
    {
      "serialNumber|+1": 1, // 序号，自增
      group_name: "@cname", // 分组名称
      "group_id|1-100": 2, // 排序数字
      group_create_date: "@datetime()" // 创建时间
    }
  ]
})

const mAccountData = Mock.mock({
  "data|10": [
    {
      "serialNumber|+1": 1, // 序号，自增
      "lockState|1": true, // 锁状态
      "accountStatus|1": true, // 账号状态
      wechatLoginName: "@ctitle(7)", // 微信登录名
      password: /[0-9]{6}$/, // 密码
      nickName: "@cname", // 昵称
      wxId: "@string('lower', 10)", // 微信ID
      wechatNumber: /[0-9][a-z]{16}$/, // 微信号
      autograph: "@ctitle(16)", // 签名
      subordinate: "@ctitle(5)", // 所属分组
      "sex|1": true, // 性别
      city: "@city", // 城市
      equipmentType: "@ctitle(8)" // 设备类型
    }
  ]
})

const SAccountData = Mock.mock({
  "data|10": [
    {
      "serialNumber|+1": 1, // 序号，自增
      wechatNumber: /[0-9][a-z]{16}$/, // 微信账号
      "accountStatus|1": true, // 账号状态
      "isAuthentication|1": true, // 是否需要认证
      "isAutoReply|1": true, // 是否自动回复
      autoReplyTemplate: "@ctitle(16)" // 自动回复模板
    }
  ]
})

const TagData = Mock.mock({
  "data|10": [
    {
      "serialNumber|+1": 1, // 序号，自增
      tag_name: "@ctitle(6)" // 标签名称
    }
  ]
})

const trumpetData = Mock.mock({
  "data|10": [
    {
      "serialNumber|+1": 1, // 序号，自增
      taskNumber: /[0-9]{6}$/, // 任务编号
      taskName: "@ctitle(8)", // 任务名称
      addWay: "@ctitle(6)", // 添加方式
      interchatTime: "@datetime()", // 互聊时间
      interchatInterval: "30s", // 互聊间隔
      "automaticChat|1": true, // 自动聊天
      pairNumber: 15, // 配对数
      successRequest: 30, // 成功请求数
      errorRequest: 20, // 失败请求数
      adopt: 15 // 通过数
    }
  ]
})

const passiveData = Mock.mock({
  "data|10": [
    {
      "serialNumber|+1": 1, // 序号，自增
      subordinateAccount: /[0-9]{6}$/, // 所属账号
      friendName: "@ctitle(8)", // 好友昵称
      friendWxId: "@ctitle(6)", // 好友微信号
      "sex|1": true, // 性别
      autograph: "@ctitle(12)", // 签名
      city: "@city", // 城市
      addSource: "@ctitle(8)", // 添加来源
      aCall: "@ctitle(8)", // 招呼语
      "state|1": true, // 状态
      createTime: "@datetime()" // 添加时间
    }
  ]
})

Mock.mock("/account/getAllGroup", "get", () => {
  return groupingData
})

Mock.mock("/account/deleteAccount", "get", () => {
  return mAccountData
})

Mock.mock("/saccount", "get", () => {
  return SAccountData
})

Mock.mock("/account/getAllTag", "get", () => {
  return TagData
})

Mock.mock("/trumpet", "get", () => {
  return trumpetData
})

Mock.mock("/passive", "get", () => {
  return passiveData
})
