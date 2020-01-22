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
- ⑤ 分页表格每页显示数据条数切换时报错（暂未找到原因） ×


### API BUG

- ① 添加分组不能传中文字符（/account/addGroup）√
- ② 修改分组不能传中文字符（/account/updateGroup） √
- ③ 分组信息时间异常问题（/account/getAllGroup） ×
- ④ 返回的信息没有转成对象（如：“{'code': 0, 'msg':'修改成功'}”） ×
- ⑤ 限制数据量（分页） ×