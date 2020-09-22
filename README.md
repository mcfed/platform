本项目采用基于 lerna 的 monorepo 模式进行管理，web 入口及各功能模块代码均位于`modules`目录下

## 项目结构

```
├── docker-compose.yml // docker配置文件
├── lerna.json // lerna配置文件
├── package.json
├── packages
│   ├── app // 应用入口模块
│   ├── demo // 模板模块，作为新功能模块的模板使用
└── yarn.lock
```

## package.json 命令

- lerna bootstrap:用于生成子模块关联关系，保证后续功能的开发基础
- start: 调用 app 入口模块的 start 命令，开启 devServer
- build:type: 以 commonjs 模式打包除 app 模块外的其他模块
- build:web: 编译 web 代码

## 使用步骤

1. 通过`lerna bootstrap`安装所有模块下的依赖并创建 symLink
2. 运行`npm run start`或`yarn start`启动入口模块的开发服务器
3. 完成某个或某些子模块的开发后，运行`npm run build`或`yarn build`进行编译

## 新加模块步骤 - test

1. 利用 template 命令行生成新的功能模块代码

- 在 platform 根目录下运行命令行 `yarn template [模块名称] [模板路径(基于项目根目录)]`

  ```shell
  yarn template test template
  ```

- 生成成功会有如下显示

  ```logs
  yarn run v1.13.0
  mcfcra -r test template
  .crarc path is  /Users/guorong/Desktop/mcfed/platform/node_modules/@mcfed/cra/.crarc
  模块test创建成功 /Users/guorong/Desktop/mcfed/platform/packages/test
  ✨  Done in 0.73s.
  ```

1. 对新生成的模块进行构建打包 build

- 进入 packages/test/目录对 test 进行打包，执行命令行 `yarn build`

  ```shell
  cd packages/test/
  yarn build
  ```

- 执行失败情况一：未对依赖包进行申明，会报错找不到 module ‘@user-center/framework’ 或 ‘@user-center/app’

  ```shell
  Cannot find module '@user-center/framework' or its corresponding type declarations
  ```

- 出现此 error 时，需要依次进入相对应的包分别执行 `yarn build`

  ```shell
  cd ..
  cd packages/framework/
  yarn build
  cd ..
  cd packages/framework/
  yarn build
  cd ..
  cd packages/test/
  yarn build
  ```

- test build 成功后会答应出如下信息

  ```logs
  .....
  ✨  Done in 3.09s.
  ```

3. 对新生成的模块进行入口路由配置

- 进入 packages/app 项目启动模块，在 packages/app/src/router/index.tsx 文件中配置新建模块的路由入口

  ```js
  ,{
    path: "test", // 路由路径
    icon: "team", // 侧边栏菜单展示icon
    name: "test", // 侧边栏菜单展示title
    component: loadableMoudle(import("@platform/test")) // loadableMoudle 加载新建模块
  }
  ```

4. 启动项目，查看新模块的效果

```shell
yarn
yarn start
```
