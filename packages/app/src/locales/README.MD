# 国际化方案

> 国际化18n采用 react-intl 方案

## 语言包设计约定

 * 统一采用中文ID进行设定，减少英文理解造成维护成本问题.
 * 名称按等级划分：`应用` 、`全局`、`模块`、`私有`，使用原则能升级配置，决不降级使用 `应用`>`全局`>`模块`>`私有`！
   - 应用： 程序级配置如:名称、版本等
   - 全局： 所有公共描述性文字：新增、删除、修改、上一页、下一页、确定、取消、保存、搜索、重置等还有很多不列出来。
   - 模块：原则上为了差异化全局或不在全局定义范围内而存在，减少不必要的使用定义。如： `{"模块.设置.确认":"保存"}` 或 `{"模块.首页.确认":"确定"}`
   - 私有： 为特殊使用场影所定义，无任何复用价值。如：`{"脱敏.提示":"我不知道提示什么东西，但是就是这样的文字存在，翻译不是我考虑的问题，我只提供方案"}`


如 zh_CN.js
```
const zh_CN = {
  "APP.NAME":"融合项目",
  "APP.VER":"V3.9",

  "GLOBAL.NEW":"添加",
  "GLOBAL.MODIFY":"修改",
  "GLOBAL.REMOVE":"删除",
  "GLOBAL.LIST":"列表",
  "GLOBAL.SURE":"确认",
  "GLOBAL.CANCEL":"取消",

  "模块.设置.保存"："保存",
  "脱敏.提示":"我不知道提示什么东西，但是就是这样的文字存在，翻译不是我考虑的问题，我只提供方案"
}


export default zh_CN
```

>   所有不在`应用`、`全局`、`模块` 以上的前缀范围空都算 `私有`

如 en_US.js
```
const en_US = {
    "APP.NAME":"Integrate",
    "APP.VER":"V3.9",

    "GLOBAL.NEW":"add",
    "GLOBAL.MODIFY":"modify",
    "GLOBAL.REMOVE":"delete",
    "GLOBAL.LIST":"list",
    "GLOBAL.SURE":"sure",
    "GLOBAL.CANCEL":"cancel",

    "设置.保存"："save"
}

export default en_US
```

##Used

>多种使用方式，在不同的场景下选不同的方式使用

  * jsx标签语法 ：FormattedMessage
```html
    //建议
    <header>
      <FormattedMessage　id="APP.NAME" value={} />
    </header>

    // 不建议
    <Input label={<FormattedMessage　id="APP.NAME" value={} />} value={} />
```

  * intl.formatMessage调用：在无法传递reactNode 环境上可用
```html
  <header>
    {intl.formatMessage({id:"APP.NAME"})}
  </header>

  // 建议
  <Input label={ intl.formatMessage({id:"APP.NAME"}) } value={} />
```
  * 自定义语法： `"#APP.NAME#"`需要实现自己的babel自定义插件实现。（挖坑待填）


##Todo

  * [ ] babel-intl-syntax : 自定义语法树转换 react-intl 对应方法
