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
- ③ 面包屑导航 ×
- ④ 菜单栏子路由不对应父路由高亮与展开 ×
- ⑤ 分页表格每页显示数据条数切换时报错（暂未找到原因） √ （已请求后端支援）


### API Problem

- ① 添加分组不能传中文字符（/account/addGroup）√
- ② 修改分组不能传中文字符（/account/updateGroup） √
- ③ 服务器时区时间异常 ×
- ④ 返回的信息没有转成对象 ×
  - 目前仅在（/account/...）下的API出现这种情况
  - 返回的数据：{'code': 0, 'msg':'修改成功'}
- ⑤ 限制数据量（分页） ×
- ⑥ 素材管理板块没有相应的（修改、删除、获取API） ×
- ⑦ 添加账号数据无需返回密码（/account/addAccount） ×
- ⑧ 一键按分组下线返回的数据中的data字段为空（/account/logout） ×
  - 传的参数：{"groupId":"118","wxids":[],"requestType":"0"}
  - 返回的数据：{"code":-1,"data":{"error":[],"success":[]},"msg":"全部失败"}