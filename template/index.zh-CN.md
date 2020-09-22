# 使用指南

## 目录结构

```
├── __tests__ // 本模块单元测试的目录
│   └── action.spec.ts
├── action.ts // 定义持久层的副作用函数，如发起ajax请求、调用reducer等
├── api.ts // 定义模块相关的ajax接口
├── container.ts // 用于将视图组件与持久层关联并产生对应的容器组件
├── index.ts // 入口文件，暴露reducer、容器、最终组件等给外界使用
├── interface.ts // 定义本模块各文件的接口约束
├── locales // 国际化配置的目录
│   └── index.ts
├── model.ts // 定义本模块的数据模型与命名空间
├── react-app-env.d.ts
├── reducer.ts // 定义本模块用于修改持久层数据的reducer
├── router.ts // 将容器组件挂载到路由上，形成带有嵌套路由的最终组件
└── views // 视图组件的目录
    ├── Detail.view.tsx // 详情页视图
    ├── Form.view.tsx // 表单页视图
    ├── List.view.tsx // 列表页视图
    └── index.less // 样式文件，一般采用css-module风格编写及使用
```

## interface.ts

### 作用

制定本模块的类型标准，如api、action、model(持久化数据类型)、等，约束编码过程中的类型判断

### 基本代码结构

```js
// app模块 定义 User 接口约束
export interface User {
  id?: number;
  accountName?: string;
  level?: string;
  needSetPd?: boolean;
  token?: string;
  userName?: string;
}

// 规范 Api 返回的数据结构类型
export interface ApiResData<T> {
  code: number;
  msg: string;
  data: T;
}

// ...
```

> 编写模块过程中最好按照先编写单元测试，在进行实际编码的流程。
> 在我们编写单元测试过程中会提前对自己要变编写的代码有一个大概的了解，有助于我们写出易维护的代码

## api.spec.ts

## api.ts

定义 ajax 请求的接口

### 基本代码结构

```ts
import {FetchUtils} from '@mcfed/utils'; // 用于发起ajax请求的工具或引擎，非必要

import {IApi} from './interface'; // 获取api的接口声明，非必要

const API_PREFIX = ''; // 请求的公共地址前缀，非必要
export default class Api implements IApi {
  // 每个方法对应一种请求场景
  fetchList(params: any) {
    return FetchUtils.fetchList(`${API_PREFIX}/api_prefix`, {
      body: params
    });
  }
}
```

### 如何在 Action 中使用

借由依赖注入及访问修饰符带来的便利性，Action 实例可以直接通过`this`获取到 api 类的实例并调用其方法来发起一个 ajax 请求

## action.spec.ts

对于 action 的单元测试思路很明确，我们在 action 中主要做的动作有如下：
* 调用模块 api 获取所需数据
* 更改持久化模块数据

### 基本代码结构

```js
// 例如获取单个条目数据详情数据获取 case
it('fetchItem-success', () => {
  // 测试内容大致包括函数调用情况、方法执行顺序、处理成功/错误的动作
  (action.api.fetchItem as jest.Mock).mockResolvedValueOnce(successMockData);
  const showErrorSpy = jest.spyOn(action.middleware, 'showError');
  await action.fetchItem();
  expect(action.api.fetchItem).toHaveBeenCalled();
  expect(action.reducer.saveItem).toHaveBeenCalledWith(successMockData.data);
  expect(showErrorSpy).toHaveBeenCalledWith(errorMockData.msg);
});
it('fetchItem-error', () => {
  // ...
});
```

## action.ts

### 作用

定义持久层的副作用函数，如发起 ajax 请求、调用 reducer 等。可以采用 OOP 的形式创建 Action 类，并通过依赖注入在初始化时获取对应的 reducer、api 和 middleware 等依赖。

### 基本代码结构

```ts
import {InjectFactory} from '@mcfed/core'; // 获取依赖注入工厂
import {PK} from '@mcfed/crud'; // 获取常见的id等参数类型，非必要

import {ICarAction} from './interface'; // 获取action的接口声明，非必要
import Api from './api'; // 获取依赖的api类定义
import Reducer from './reducer'; // 获取依赖的reducer类定义

const {Injectable} = InjectFactory; // 从依赖注入工厂中读取依赖注入装饰器

@Injectable // 使用依赖注入装饰器
class CarAction implements ICarAction {
  constructor(public readonly reducer: Reducer, public readonly api: Api) {} // 通过public/protected/private访问修饰符让赋值操作自动完成
  fetchDelete(ids: PK | PK[]): void {
    throw new Error('Method not implemented.');
  }
  stop(payload: {a: string; b: number}) {
    console.log('stop', payload.a, payload.b);
  }
  fetchItem() {
    throw new Error('Method not implemented.');
  }
  async fetchPage() {
    this.reducer.savePage(await this.api.fetchPage()); // 通过this读取reducer和api实例的方法并按实际场景进行调用
  }
}
```

### 如何在视图组件中使用

```ts
// container.ts
// ...
const dispatchToProps = (dispatch: Dispatch, props: object) => {
  return {
    dispatch,
    actions: InjectFactory.ActionFactory(CarAction, dispatch, namespace) // 通过工厂创建action实例
  };
};

const ListContainer = injectIntl(
  connect(mapStateToProps, dispatchToProps, defaultMergeProps)(ListView) // 通过connect将action实例关联到视图组件上
);

// List.view.tsx
// ...
class ListView<M extends Model> extends RListPage<ListProps<M>, ListState<M>> {
  // ...
  handlerMenu(rowkeys: PK | PK[], actionType: string): void {
    console.log(actionType);
    const {actions} = this.props; // 从props中读取action实例
    if (actionType === 'add') {
      this.goAdd();
    } else if (actionType === 'edit') {
      this.goEdit(rowkeys as PK);
    } else if (actionType === 'detail') {
      this.goDetail(rowkeys as PK);
    } else if (actionType === 'delete') {
      actions.fetchDelete(rowkeys); // 调用action实例中的方法
    }
    this.clearSelectRows();
  }
  // ...
}
```

## router.ts

定义模块内部页面路由匹配规则

### 基本代码结构

```js
// 通常普通 CRUD 的路由模板为
function routes(props: RouteProps): Array<RouteProps> {
  const path: any = props.path;
  return [
    {
      // 指定匹配路径
      path: computePath(path, ''),
      // 对应路径所匹配的 View
      component: Containers.ListContainer
    },
    {
      path: computePath(path, 'add'),
      // mode 决定新增/编辑页面以模态框 or 新页面展示
      // @ts-ignore
      mode: 'modal',
      component: Containers.FormContainer
    },
    {
      path: computePath(path, ':id/edit'),
      // @ts-ignore
      mode: 'modal',
      component: Containers.FormContainer
    }
  ];
}
```

## reducer.ts

定义持久层 redux 的 reducer。可以采用 OOP 的形式创建 Reducer 类。与原始的 reducer 需要针对每个`case`返回一个`全新且完整的`的 state 不同，采用 OOP 设计实现的 Reducer 类可以以对象方法的形式调用 reducer，并且每个 reducer 只返回它所修改的那部分数据（完整的 state 由`@mcfed/core`类库提供的 proxy 返回）。

### 基本代码结构

```ts
import {ICarReducer, IReducerState} from './interface'; // 获取reducer的接口声明，非必要

class CarReducer implements ICarReducer {
  // 定义了store的初始数据
  private initalState: IReducerState = {
    page: {
      pageSize: 10,
      total: 0
    }
  };
  // proxy识别的特殊方法，@mcfed/core会拦截并返回一个特殊reducer函数
  getReducer() {}
  // 每个方法对应常规reducer的一个case（虽然实际上不是通过case识别的）
  saveItem() {
    return 'sss';
  }
  // 与常规reducer不一样的是，state并不是第一个参数而是第二个参数，且非必填
  savePage(payload: ResponsePage, state?: IReducerState): IReducerState {
    return {
      page: {
        pageSize: payload.pageSize,
        current: payload.currentPage,
        total: payload.total
      }
    };
  }
}
```

### 如何在 Action 中使用

借由依赖注入及访问修饰符带来的便利性，Action 实例可以直接通过`this`获取到 reducer 类的实例并调用其方法来触发一个`dispatch`操作（dispatch 由`@mcfed/core`类库提供的 proxy 触发）


## model.ts

定义本模块的持久层数据模型，包括含有的字段、字段的来源（计算值）等，持久数据示例：查询结果列表，单条结果的详情数据（用于编辑回填数据，详情展示）

### 基本代码结构

```ts
import {ORMModel} from '@mcfed/core'; // 基于ORM的模型类
import {IModel} from './interface'; // 获取model的接口声明，非必要

const {attr, BaseModel, pk} = ORMModel; // 来自于redux-orm的api，用于描述数据模型的字段

export const namespace = 'Abcd'; // 当前模型的命名空间，用于在运行时与其他模块进行区分

export default class Abcd extends BaseModel implements IModel {
  constructor(props: any) {
    super(props);
    this.initFields(props); // 由于ts的编译输出结果会覆盖原本的字段映射关系，需要在model基类的构造函数中弥补
  }
  static modelName: string = namespace;

  // 每个属性对应一个该模块下数据可以包含的字段
  @pk()
  id!: number;
  @attr()
  name!: string;
  @attr()
  title!: string;

  getName() {}
}
```
