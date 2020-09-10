#

本项目基于 platform 提供的模版目录 “template” 和模版命令 “template” 生成，是基础的 CRUD 功能模版

## 项目结构

```text
├── pubilc
│   ├── index.html // 模块首页
├── src
│   ├── __tests__ // 单元测试
│   ├── i18n // 国际化
│   ├── views // 页面
│       ├── list.view.tsx // 列表页
│       ├── from.view.tsx // 表单页
│       ├── detail.view.tsx // 详情页
│       ├── index.module.css // 页面样式
│   ├── action.ts // action
│   ├── api.ts // 定义接口api
│   ├── app.ts
│   ├── container.ts // 整合页面
│   ├── global.d.ts // 定义模块内全局变量
│   ├── index.ts
│   ├── interface.d.ts // 接口定义
│   ├── model.ts // 数据模型 和 数据render转换处理
│   ├── reducer.ts // reducer
│   ├── router.ts // 模块内部跳转路由
├── package.json
└── yarn.lock
```

## package.json

- 模块（包）名

一般与文件夹同名，在框架目录 packages/app/src/router/index.ts 中注册模块时需要用到，且注册模块 import 导入的模块名称需要与此处的 name 完全一致

```json
"name": "@platform/dbregister",
```

- 依赖包 mcfed 系列

主要依赖有 mcfed 系列的四个包

```json
"dependencies": {
    "@mcfed/components": "^0.3.0-beta2",// view 组件库
    "@mcfed/core": "^0.5.0-beta2",// core 核心包
    "@mcfed/crud": "^0.4.3-beta",// crud base 包
    "@mcfed/utils": "^0.2.2", // 扩展 utils 工具包
    "antd": "^3.9.3", // 依赖 antd 3.9.3
    ...
```

- proxy 代理

API_SERVER 开发环境 api 服务地址
MOCK_SERVER 模拟环境 mock 服务地址

```json
"config": {
    "API_SERVER": "/usercenter",
    "MOCK_SERVER": "http://192.168.200.178:3000/mock/173"
  }
```

## view 页面

CRUD 通常有如下三个页面

```text
│   ├── views // 页面
│       ├── list.view.tsx // 列表页
│       ├── from.view.tsx // 表单页
│       ├── detail.view.tsx // 详情页
│       ├── index.module.css // 页面样式
```

- list 列表页

页面结构分为三部分，最上是查询条件栏，支持多条件组合查询，最下是满足查询条件的查询结果，用分页展示，中间的部分是操作按钮栏，支持常用的新增、删除、修改的各种 CRUD 的操作。

```js
<Panel footer={false}>
    {this.renderSearchForm()} {//查询条件栏}
    {this.renderToolbar()}{//操作按钮栏}
    {this.renderDataTable()}{//查询结果table}
</Panel>
```

- componentDidMount

componentDidMount 时执行 handleFilter 方法，请求后端接口执行查询，缺省无条件，第一页

```js
handleFilter(value: Object) {
    ...
    actions.fetchPage(Object.assign({}, value, params));
}
```

- 查询条件

新增查询条件时，新增一个 FormItem 包裹的输入框或查询框组件即可

```js
<FormItem name='serverName'>
  <Input defaultValue={query.id} />
</FormItem>
```

- 触发查询方法

在 [HeadSearchBar](#headSearchbar) 组件中的 filterSubmitHandler 中调用 fetchPage 来执行按条件查询，与后端完成查询的 api 交互

```js
<HeadSearchBar
  showSearchButton={false}
  filterSubmitHandler={this.handleFilter.bind(this)}></HeadSearchBar>
```

- 查询结果

新增表格列时，新增一个 columns 数组对象即可

```js
let tableConf: TableProps<M> = {
    ...
    columns: [
        {
        title: locale('title.label'),
        key: "title",
        dataIndex: "title",
        }
    ]
};
```

- 操作按钮

新增操作按钮时，需要在 [ButtonGroups](#buttongroups) 中新增一个 Button 组件，
还需要在 handlerMenu 方法中新增一个对应的方法调用,注意 Button 中的 actionkey 需要与 actionType 一一对应

```js
<Button actionkey='add' type='primary'>
    {locale('GLOBAL.NEW')}
</Button>

handlerMenu(rowkeys: PK | PK[], actionType: string): void {
    ...
    else if (actionType === 'edit') {
      this.goEdit(rowkeys as PK);
    }
    ...
  }
```

- form 表单页

form 表单页包括 BaseForm 表单组件，主要操作是新增和编辑，用来收集表单数据，执行表单验证后提交

```js
<Panel
  title={locale('title')}
  confirmLoading={spins(actions.fetchSave)}
  onOk={this.onSubmit.bind(this, 'handleSubmit')}
  onCancel={this.handleCancel.bind(this, 'handleCancel')}>
  <BaseForm ref={this.saveFormRef.bind(this)}></BaseForm>
</Panel>
```

- componentDidMount

componentDidMount 时执行编辑的业务逻辑判定，当操作为编辑时，需要查询出单个 item 表单内容并进行 defaultValue 数据回填

```js
if (params.id) {
  actions.fetchItem(params.id);
}
```

- 新增表单项

新增表单项时需要增加 [FormItem](#formitem) 包裹的 antd 基础组件即可

```js
render(): ReactNode {
    const {item, actions, locale, spins} = this.props;
    return (
        ...
        <FormItem name='name' label='name'>
            <Input defaultValue={item.name} />
        </FormItem>
        ...
    )
}
```

- detail 详情页

## 组件 API

<a id="headSearchbar">HeadSearchBar</a>

| 成员                | 说明                                                                          | 类型                  | 默认值 |
| :------------------ | :---------------------------------------------------------------------------- | :-------------------- | :----- |
| gutter              | 栅格间隔                                                                      | number                | 20     |
| filterSubmitHandler | filterSubmit 查询事件的 handler                                               | Function(values: any) |        |
| defaultParams       | 缺省参数                                                                      | object                | {}     |
| showSearchButton    | 是否显示查询按钮                                                              | number                | false  |
| columns             | 栅格占位格数                                                                  | number                | 4      |
| autoSubmitForm      | 是否自动触发提交，为 true 时 在 onValuesChange 时触发查询，fasle 时不主动触发 | boolean               | true   |
| locale              | 国际化                                                                        | object                |        |

<a id="buttongroups">ButtonGroups</a>

| 成员        | 说明                         | 类型                          | 默认值      |
| :---------- | :--------------------------- | :---------------------------- | :---------- |
| handleClick | click 点击事件分发的 handler | function(actionkey: string)   |             |
| mode        | ButtonGroups 渲染模式        | 'ButtonGroup' or 'ButtonMenu' | ButtonGroup |
| showSize    | 显示多少个 button 后折叠     | number                        | 5           |
| viewMode    | todo                         |                               |             |

<a id="button">Button</a>

| 成员      | 说明                                  | 类型   | 默认值 |
| :-------- | :------------------------------------ | :----- | :----- |
| actionkey | 事件分发的 action key，必填           | string |        |
| 其他属性  | 可参考 [antd](#button) 的 Button 组件 |        |        |

[button]: http://192.168.200.178:5001/components/button-cn/

<a id="formitem">FormItem<a>

| 成员           | 说明                      | 类型         | 默认值 |
| :------------- | :------------------------ | :----------- | :----- |
| name           | name 用于表单数据双向绑定 | string       |        |
| children       | antd 基础组件             | ReactElement |        |
| disabled       |                           |              |        |
| renderable     |                           |              |        |
| formLayout     |                           |              |        |
| formRef        |                           |              |        |
| options        |                           |              |        |
| renderItem     |                           |              |        |
| fetch          |                           |              |        |
| fetchParams    |                           |              |        |
| fetchCallback  |                           |              |        |
| dataSourceProp |                           |              |        |
| containerTo    |                           |              |        |
| loopProp       |                           |              |        |
| defaultValue   |                           |              |        |
