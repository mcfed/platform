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

接下来，按照以下使用场景一一介绍

[* 一个【只有列表】的 list 页面](#只有列表)
[* 给 list 页面增加【多条件查询】](#多条件查询)
[* 给 list 页面增加【添加数据】的操作](#添加数据)
[* 给 list 页面增加【编辑数据】的操作](#编辑数据)
[* 给 list 页面增加【删除数据】的操作](#删除数据)
[* 给 list 页面增加【查看数据】的操作](#查看数据)


## <a id="只有列表">一个【只有列表】的 list 页面</a>

1. 编辑 list 页面的 view 元素

在页面的 renderDataTable 方法中，编辑 tableConf 对象的 columns 数组对象，新增数组元素

```js
const {reducer, items, locale} = this.props;
let tableConf: TableProps<M> = {
  rowKey: 'id',
  dataSource: items,
  columns: [
    {
      title: locale('groupName.label'),
      key: "groupName",
      dataIndex: "groupName",
    },
    ...
}
```

2. 列表数据源接入

数据接入需要做的事情很多，需要解答好如下的问题：

[* 何时接入数据](#何时接入数据)
[* 用什么方式访问接口](#用什么方式访问接口)
[* 接入数据的接口是什么](接入数据的接口是什么)
[* 后端数据返回后存储在哪里](后端数据返回后存储在哪里)
[* 存储的数据如何映射到页面中](存储的数据如何映射到页面中)

* <a id="何时接入数据">何时接入数据？</a>

在页面渲染后执行 componentDidMount 生命周期获取接口数据

```js
componentDidMount(): void {
  this.handleFilter();
}
handleFilter(value: Object) {
  ...
  actions.fetchPage(Object.assign({}, value, params));
}
```

* <a id="用什么方式访问接口">用什么方式访问接口</a>

框架采用 redux-saga 处理异步的服务端数据交互，且框架层已经在 framework 中集中封装了常用的 fetch 方法，减少学习成本，降低门槛，所以 fetchPage 查询列表的接口访问只需要在页面调用即可生效
但是不排除有接口返回需要重写的情况，当需要重写某一个方法或者 action 提供的默认方法不够用时，需要做如下几步：

* 在 actions.ts 中编写 saga 交互逻辑

```js
@param()
@loading()
async fetchPage(params: any) {
  const data = await this.api.fetchPage(params);
  if (data?.code === 200) {
    this.reducer.savePage(data.data);
  } else {
    this.middleware.showError(data.msg);
  }
}
```

2. 如果有需要重写 reducer，则在 reducer.ts 中获取数据并执行 store 的更新和存储

```js
savePage(param: any) {
  return {
    page: {
      current: param.currentPage,
      total: param.total,
      totalPage: param.totalPage,
      pageSize: param.pageSize
    }
  };
}
```

3. 如果有需要重新定义 model 取值，则在 mode.ts 中重写 reducers

```js
static reducers = {
  savePage: (action: AnyAction, modelClass: any) => {
    modelClass
      .all()
      .toModelArray()
      .forEach((model: SessionBoundModel) => model.delete());
    action.payload?.items?.map((m: SessionBoundModel) => modelClass.create(m));
  }
}
```

tips: 此处重写 reducers 的 savePage 方法时，需要将继承 BaseModel 由原来的 framework 转换成 ORMModel.BaseModel，即：

```js
// import {BaseModel} from '@user-center/framework';
...
const BaseModel = ORMModel.BaseModel;
```

* <a id="接入数据的接口是什么">接入数据的接口是什么</a>

所有的接口 API 都统一定义在 api.ts 中，只需要设置好接口api即可：

```js
fetchPage(params: any) {
  return FetchUtils.fetchList(`${API_PREFIX}/mock/63/capaa/ronghe/list`, {
    body: params
  });
}
```

tips: api 接口连调时我们会先用到 mock 的模拟环境，此时除了定义 api 接口地址外，还需要定义 mock 服务器环境

* 定义 mock 服务器环境

定义 mock 服务器环境分为两种情况：

1. 运行单个模块时，需要在模块内的 config-overrides.js 中重写服务器代理配置

```js
module.exports = {
  ...
  devServer: overrideDevServer(
    customProxyConfig({
      ...
      '/mock': {
        target: 'http://192.168.200.178:3000/',
        changeOrigin: true,
        pathRewrite: {'^/mock': ''}
      }
    })
  )
}
```

2. 在框架最外层 yarn start 运行项目时，需要修改框架主入口的 config-overrides.js

```js
module.exports = {
  ...
  devServer: overrideDevServer(
    customProxyConfig({
      ...
      '/mock': {
        target: 'http://192.168.200.178:3000/',
        changeOrigin: true,
        pathRewrite: {'^/mock': ''}
      }
    })
  )
}
```

* <a id="后端数据返回后存储在哪里">后端数据返回后存储在哪里</a>

后端返回数据后，操作 reducer 存储映射在 ORMReducer 中，在 console 对象中输出格式如下：

```js
{
  "ORMReducer":{
    "dbregister":{
      "items":[0,"23",1,"24",2,"25",3,"26",4,"27",5,"28",6,"29"],
      "itemsById":[
        23:{"groupId": "360000197006226726", "groupName": "Nvvukyfcfu Tundcupt Lrxjpx Jfyfxuj Tuesggnyj Jsqrk", "dbType": 2},
        24:{"groupId": "360000197006226726", "groupName": "Nvvukyfcfu Tundcupt Lrxjpx Jfyfxuj Tuesggnyj Jsqrk", "dbType": 2},
        25:{"groupId": "360000197006226726", "groupName": "Nvvukyfcfu Tundcupt Lrxjpx Jfyfxuj Tuesggnyj Jsqrk", "dbType": 2},
        26:{"groupId": "360000197006226726", "groupName": "Nvvukyfcfu Tundcupt Lrxjpx Jfyfxuj Tuesggnyj Jsqrk", "dbType": 2},
        27:{"groupId": "360000197006226726", "groupName": "Nvvukyfcfu Tundcupt Lrxjpx Jfyfxuj Tuesggnyj Jsqrk", "dbType": 2},
        28:{"groupId": "360000197006226726", "groupName": "Nvvukyfcfu Tundcupt Lrxjpx Jfyfxuj Tuesggnyj Jsqrk", "dbType": 2},
        29:{"groupId": "360000197006226726", "groupName": "Nvvukyfcfu Tundcupt Lrxjpx Jfyfxuj Tuesggnyj Jsqrk", "dbType": 2}
        ]
    }
  }
}
```

* <a id="存储的数据如何映射到页面中">存储的数据如何映射到页面中</a>

做完之前的工作还差最后一步，就是将 model 对象和页面的 item 建立一一映射关系，需强制在 model.ts 的模型中一一申明

```js
  @pk()
  id!: number;
  @attr()
  groupName!: string;
  @attr()
  dbType!: string;
```

至此，[一个【只有列表】的 list 页面](#一个只有列表的list页面)的所有工作便已经完成了

## <a id="多条件查询">给 list 页面增加【多条件查询】</a>

有列表显示的界面，通常还会有【多条件联合查询】，接下来的步骤是演示如何增加查询条件

1. 在页面的 HeadSearchBar 中增加对应的 FormItem 元素，name 是提交查询的 params 参数名称，defaultValue 设置缺省值，

```js
<FormItem name='groupName'>
    <Input defaultValue={query.groupName} />
</FormItem>
```

2. 定义 IModel 接口，所以同步需要在 interface.d.ts 中预先设置好对应接口

```js
export interface IModel {
  id: number;
  groupName?: string;
  dbType?: string;
}
```

## <a id="添加数据">给 list 页面增加【添加数据】的操作</a>

1. 在 ButtonGroups 组件里添加【add】的操作按钮

```js
<ButtonGroups
    handleClick={(actionType: string) =>
        this.handlerMenu(selectedRowKeys, actionType)
    }>
    <Button actionkey='add' type='primary'>
        {locale('GLOBAL.NEW')}
    </Button>
</ButtonGroups>
```

2. 在对应的 handlerMenu 方法中，添加 actionType 为 【add】的路由跳转

```js
handlerMenu(rowkeys: PK | PK[], actionType: string): void {
  const {actions} = this.props;
  if (actionType === 'add') {
    this.goAdd();
  }
}
```

3.在 router.js 中设置对应的路由跳转的 component

```js
return [
  ...
  {
    path: [path, 'add'].join("/"),
    component: Containers.FormContainer
  }
]
```

4. 编辑 FormContainer 即 Form.view.tsx 的实现,设置表单元素


```js
<BaseForm ref={this.saveFormRef.bind(this)}>
  <FormItem name='groupName' label='groupName'>
    <Input defaultValue={item.groupName} />
  </FormItem>
  <FormItem name='dbType' label='dbType'>
    <Input defaultValue={item.dbType} />
  </FormItem>
</BaseForm>
```

5. 实现表单保存方法，调用 action 执行保存动作

```js
handleSubmit(values: Object): void {
  const {actions} = this.props;
  actions.fetchSave(values);
}
```

## <a id="编辑数据">给 list 页面增加【编辑数据】的操作</a>

【编辑数据】同[【增加数据】](#增加数据)一样，都是对表单数据进行输入或者修改，最后调用后端接口保存数据，唯一的区别是，【编辑】的时候是对原有的数据进行修改，所以会涉及到表单数据的回填

* 在 Form.view.tsx 页面元素渲染后，获取后端接口数据并进行数据回填

1. componentDidMount 时获取数据

```js
componentDidMount(): void {
    ...
    if (params.id) {
      actions.fetchItem(params.id);
    }
  }
```

2. 设置 fetchItem 调用的后端接口 api

```js
fetchItem(params: any) {  
  return FetchUtils.fetchGet(`${API_PREFIX}/mock/63/capaa/ronghe/list/${params}`, {
    body: params
  });
}
```

## <a id="删除数据">给 list 页面增加【删除数据】的操作</a>

【删除数据】分为两种，[单条数据删除](#单条数据删除) 和 [批量数据删除](#批量数据删除)

* <a id="单条数据删除">在数据库 table 行内进行单条数据删除</a>

1. 在 renderTableButtonGroups 方法中增加 Button 操作

```js
<ButtonGroups
  handleClick={(actionType: string) =>
    this.handlerMenu(row.id.toString(), actionType)
  }>
  ...
  <Button actionkey='delete'>{locale('GLOBAL.REMOVE')}</Button>
</ButtonGroups>
```

2. 在对应的 handlerMenu 方法中，添加 actionType 为 【add】的路由跳转

```js
handlerMenu(rowkeys: PK | PK[], actionType: string): void {
  const {actions} = this.props;
  ...
  else if (actionType === 'delete') {
    actions.fetchDelete(rowkeys);
  }
}
```

3. 设置删除 fetchDelete 的后端接口 api

```js
fetchDelete(params: any) {
  return FetchUtils.fetchDelete(`${API_PREFIX}/mock/63/capaa/ronghe/delete`, {
    //@ts-ignore
    body: null
  });
}
```

* <a id="批量数据删除">在 renderToolbar 中进行批量数据删除</a>

1. 在 ButtonGroups 组件里添加【delete】的操作按钮

```js
<ButtonGroups
    handleClick={(actionType: string) =>
        this.handlerMenu(selectedRowKeys, actionType)
    }>
    <Button actionkey='delete' loading={spins(actions.fetchDelete)}>
      {locale('GLOBAL.REMOVE')}
    </Button>
</ButtonGroups>
```

2. 在对应的 handlerMenu 方法中，添加 actionType 为 【add】的路由跳转

```js
handlerMenu(rowkeys: PK | PK[], actionType: string): void {
  const {actions} = this.props;
  ...
  else if (actionType === 'delete') {
    actions.fetchDelete(rowkeys);
  }
}
```

3. 设置删除 fetchDelete 的后端接口 api 

```js
fetchDelete(params: any) {
  return FetchUtils.fetchDelete(`${API_PREFIX}/mock/63/capaa/ronghe/delete`, {
    //@ts-ignore
    body: null
  });
}
```

## <a id="查看数据">给 list 页面增加【查看数据】的操作</a>

1. 在 renderTableButtonGroups 方法中增加 Button 操作

```js
<ButtonGroups
  handleClick={(actionType: string) =>
    this.handlerMenu(row.id.toString(), actionType)
  }>
  ...
  <Button actionkey='detail'>{locale('GLOBAL.DETAIL')}</Button>
</ButtonGroups>
```

2. 在对应的 handlerMenu 方法中，添加 actionType 为 【detail】的路由跳转

```js
handlerMenu(rowkeys: PK | PK[], actionType: string): void {
  const {actions} = this.props;
  ...
   else if (actionType === 'detail') {
    this.goDetail(rowkeys as PK);
  }
}
```

3. 设置获取单个详情 fetchItem 的后端接口 api

```js
fetchItem(params: any) {  
  return FetchUtils.fetchGet(`${API_PREFIX}/mock/63/capaa/ronghe/list/${params}`, {
    body: params
  });
}
```

至此，整个模块的整个 CRUD 操作基本都已经完整了，其他也可参考另一份单个[小项说明](https://github.com/mcfed/platform/blob/master/template/README-%E5%B0%8F%E9%A1%B9.md)。