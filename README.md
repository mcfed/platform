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
- build:web: 编译web代码

## 使用步骤

1. 通过`lerna bootstrap`安装所有模块下的依赖并创建 symLink
2. 运行`npm run start`或`yarn start`启动入口模块的开发服务器
3. 完成某个或某些子模块的开发后，运行`npm run build`或`yarn build`进行编译

