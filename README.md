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

- ① 路由菜单点击反应延迟 √
- ② 刷新页面默认路由未更换 √
- ③ 面包屑导航 √
- ④ 菜单栏子路由不对应父路由高亮与展开 √
- ⑤ 分页表格每页显示数据条数切换时报错（暂未找到原因） √ （已请求后端支援）
- ⑥ 多级面包屑未实现 ×
- ⑦ 对标签与分组的全局存储 √
- ⑧ 数据面板、二维码解码功能抽离独立 √

### API Problem

- ① 添加分组不能传中文字符（/account/addGroup）√
- ② 修改分组不能传中文字符（/account/updateGroup） √
- ③ 服务器时区时间异常 ？
- ④ 返回的信息没有转成对象 √
- ⑤ 限制数据量（分页） √
- ⑥ 素材管理板块没有相应的（获取信息 API） ×
- ⑦ 添加账号数据无需返回密码（/account/addAccount） √
- ⑧ 一键按分组下线返回的数据中的 data 字段为空（/account/logout） √
- ⑨ 设置个人信息素材头像上传超长时间未响应 （/marketing/setInfo） ×
- ⑩ 设置设置朋友圈素材图片上传超长时间未响应 （/marketing/setFriendCricle） ×
- 11. 提交微信群URL后台的接受方式是FormData，应改为json格式（/group/setGroupURL） √
- 12. 是否需要微信群的信息展示API √
- 13. 批量删除账号是否要根据账号删除【原因：登录不上的账号没有WXID】 （/account/deleteAccount） ×
- 14. 获取账号信息字段返回值为null（/account/getAccountInfo） ×
- 15. 朋友圈发布 500 （/account/sendFriendCircle） ×
- 16. 添加通讯录好友全部失败 （/contact/addFriends） ×
- 17. 好友管理板块 404（/contact/sendMessageByTag） ×
- 18. 邀请入群有概率失败 （/group/enterGroup） ×
- 19. 首页数据面板无数据 （/common/getInit） ×