# Cloud Platform Control

## 云控平台：2019-12-27

### 安装依赖

```install
npm install
```

### 开发环境

```serve
npm run serve
```

### 生产环境

```build
npm run build
```

### 代码校验与修复

```lint
npm run lint
```

### 待解决 BUG

- 路由菜单点击反应延迟 √
- 刷新页面默认路由未更换 √
- 面包屑导航 √
- 菜单栏子路由不对应父路由高亮与展开 √
- 分页表格每页显示数据条数切换时报错（暂未找到原因） √ （已请求后端支援）
- 多级面包屑未实现 √
- 对标签与分组的全局存储 √
- 数据面板、二维码解码功能抽离独立 √

### 剩余功能

- 路由守卫 √
- 表格分页 √

### API Problem

- 添加分组不能传中文字符（/account/addGroup）√
- 修改分组不能传中文字符（/account/updateGroup） √
- 服务器时区时间异常 √
- 返回的信息没有转成对象 √
- 限制数据量（分页） √
- 素材管理板块没有相应的（获取信息 API） √
- 添加账号数据无需返回密码（/account/addAccount） √
- 一键按分组下线返回的数据中的 data 字段为空（/account/logout） √
- 设置个人信息素材头像上传超长时间未响应 （/marketing/setInfo） √
- 设置设置朋友圈素材图片上传超长时间未响应 （/marketing/setFriendCricle） √
- 提交微信群URL后台的接受方式是FormData，应改为json格式（/group/setGroupURL） √
- 是否需要微信群的信息展示API √
- 批量删除账号是否要根据账号删除【原因：登录不上的账号没有WXID】 （/account/deleteAccount） √
- 获取账号信息字段返回值为null（/account/getAccountInfo） √
- 朋友圈发布 500 （/account/sendFriendCircle） √
- 添加通讯录好友全部失败 （/contact/addFriends） √
- 好友管理板块 404（/contact/sendMessageByTag） √
- 邀请入群有概率失败 （/group/enterGroup） √
- 首页数据面板无数据 （/common/getInit） √



### 最终版

```API
/api/account/setFriendRequest     404	好友请求设置（是否验证） XXX（砍掉需求）
/api/account/changeDatu           404	账号资料修改（修改密码、昵称、头像） √
/api/contact/sendMessageByTag     404	给标签下的所有账号群发消息 √
/api/contact/addFriendsByTag      404	给标签下的所有账号都发送添加指定的好友的请求 √
/api/contact/addFriends           500	给单个微信账号添加好友，报500，可能我参数没传对 √
/common/getInit                   首页数据面板无数据 √
/account/getAccountInfo           获取账号信息字段返回值为null √
```
- 服务器时区时间异常？

- 新增： √
```API
API：/api/marketing/getInfo
请求方法：GET
请求参数：user_id
请求示例：/api/marketing/getInfo?user_id="100001"
返回数据字段：
{
    user_id: "String",              // 当前登录的user的id
    friendCricleTitle: "String",    // 朋友圈素材--标题
    friendCricleContent: "String",  // 朋友圈素材--内容
    friendCriclePicURL: ["url"],    // 朋友圈素材--上传的图片url
    setSendMsgContent: "String",    // 发送消息素材--内容
    setAddMsgContent: "String",     // 添加通讯录好友验证消息
    setInfoPwd: "String",           // 个人信息素材--密码
    setInfoNickName: "String",      // 个人信息素材--昵称
    setInfoSignature: "String",     // 个人信息素材--个性签名
    setInfoAvatarUrl: "String"      // 个人信息素材--头像
}
```