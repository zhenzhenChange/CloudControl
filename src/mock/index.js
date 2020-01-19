const Mock = require("mockjs")

const groupingData = Mock.mock({
  "data|10": [
    {
      "serialNumber|+1": 1, // 序号，自增
      groupName: "@cname", // 分组名称
      "groupSortNumber|1-100": 2, // 排序数字
      groupCreateTime: "@datetime()" // 创建时间
    }
  ]
})

const mAccountData = Mock.mock({
  "data|10": [
    {
      "serialNumber|+1": 1, // 序号，自增
      "lockState|1": true, // 锁状态
      "accountStatus|1": false, // 账号状态
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

Mock.mock("/grouping", "get", () => {
  return groupingData
})

Mock.mock("/maccount", "get", () => {
  return mAccountData
})
