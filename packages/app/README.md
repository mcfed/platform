本项目采用基于 lerna 的 monorepo 模式进行管理，web 入口及各功能模块代码均位于`modules`目录下

## 项目结构

```
├── docker-compose.yml // docker配置文件
├── lerna.json // lerna配置文件
├── package.json
├── packages
│   ├── app // 应用入口模块
│   ├── app-manage // 功能模块，每个功能模块都是可以独立部署的小系统
│   ├── components // 公共组件模块
│   ├── demo // 模板模块，作为新功能模块的模板使用
│   ├── framework // 公共逻辑模块，针对项目需求对@mcfed/crud和@mcfed/core包进行定制化配置
│   ├── layout // 布局模块，存放应用入口需要的基础布局组件
│   └── utils // 工具模块，存放@mcfed/utils包未涉及到的当前项目的各种工具函数
└── yarn.lock
```

## package.json 命令

- postinstall: 完成`npm install`或`yarn`命令后执行的钩子命令，用于生成子模块关联关系，保证后续功能的开发基础
- start: 调用 app 入口模块的 start 命令，开启 devServer
- build:cjs: 以 commonjs 模式打包除 app 模块外的其他模块
- build:build: 以常规 webpack 模式打包 app 模式，生成实际的 prod 代码
- build: 等于 build:cjs+build:build

## 使用步骤

1. 通过`lerna bootstrap`安装所有模块下的依赖并创建 symLink
2. 运行`npm run start`或`yarn start`启动入口模块的开发服务器
3. 完成某个或某些子模块的开发后，运行`npm run build`或`yarn build`进行编译

## 存在的问题

- [x] 子模块的样式如何解决编译问题
- [ ] layout 等利用到第三方库 context 机制的子模块，若下游使用者的依赖与模块本身的依赖版本不一致会导致 context 报错
- [ ] API_PREFIX 和 MOCK 路径目前硬编码，后续需调整为从 package.json 读取
- [ ] 如何让一个模块的 2 个不同页面对应在菜单的不同选项上（已有解决方案，不通用）
- [x] 更新 redux-persist 后 AppReducer 只能保存 dicts 字段数据
- [x] @mcfed/components 包解除对 antd 的版本锁定依赖

## bug

- [ ] 角色权限树顶部“冒号”与 value 重叠

## 未完成功能

- [x] 错误 #138482：修改密码页，输入框在 text 和 password 模式间切换（缺少 Input.Password 组件）.[link](http://bdms.mchz.com.cn:6999/issues/138482).`v1.1`
- [x] 当存在 modal 需要根据 tab 切换显示内容，且内容来源为不同接口及数据时，如何实现（角色分配用户和部门）
- [ ] 如何解耦 framework

## 待沟通的功能

- [ ] 二次确认弹层布局：不适合垂直居中.[link](http://bdms.mchz.com.cn:6999/issues/138168)`待确认`

### portal

当前子应用的数据硬编码配置死，其他子应用读取接口数据

## 锁屏功能边界场景

### 单窗口

1. 上一个请求发出后，跳转至一个无请求的页面（如 portal），在锁屏触发前刷新页面

### 多窗口

1. 窗口 A 无操作，窗口 B 正常操作，窗口 A 触发锁屏后，窗口 B 状态下一次操作后的状态（未刷新情况下 A 是否影响 B）
2. 窗口 A 与 B 均无操作，锁屏触发后，窗口 B 解锁，窗口 A 状态（未刷新情况下 B 是否影响 A）
3. 窗口 A 与 B 均无操作，锁屏触发后，窗口 B 解锁，窗口 A 刷新，窗口 A 状态（刷新后 B 是否影响 A）。若窗口 A 需要锁屏，窗口 B 下次操作后窗口 B 的状态
