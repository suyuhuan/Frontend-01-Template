## Dev 工具
`tips: 处理底层原理的关键技术之一：字符串 + 事件处理 `
### Server
- build
  + webpack
  + babel
  + vue
  + jsx
  + postcss
  + npm
- watch
  + fsevent
- mock
  + ...
- http
  + http-server
  + ws

### Client
- debugger
  + vscode
  + devtool
- source-map

#### Debugger
- [node-inspect](https://nodejs.org/en/docs/guides/debugging-getting-started/)
> 以vscode为例：   
debugger开启时，通过websocket连接vscode-ide和node-v8，该服务和node-v8隶属同一进程，所以当client端进行调试操作时，可以通过ws进行通信，反之亦然。

- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
  + [Integrating with DevTools](https://developer.chrome.com/devtools/docs/integrating)
  + [chrome devtools protocol](https://github.com/ChromeDevTools/devtools-protocol)

#### SourceMap
- [Source maps: languages, tools and other info](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info)
- [Source Map Revision 3 Proposal](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/preview#)

`demo: babel vue npm fsevents`


## Test测试工具

### 测试覆盖率Coverage维度
- Statements
- Branches
- Functions
- Lines

### 测试工具
- mocha
- ava
- jest
- [Selenium Webdriver](https://wizardforcel.gitbooks.io/selenium-doc/content/official-site/introduction.html)
- chai（断言库）

### 测试覆盖率
- nyc
- istanbul

## 持续集成相关
- [Codecov](https://docs.codecov.io/docs/supported-languages)
- [Travis](https://docs.travis-ci.com/user/tutorial/)
- [Benchmark](https://benchmarkjs.com/)
- [jsperf](https://jsperf.com/)

### YAML
`YAML 是专门用来写配置文件的语言，非常简洁和强大，远比 JSON 格式方便`
- [YAML 语言教程 阮一峰](https://www.ruanyifeng.com/blog/2016/07/yaml.html)
- [https://yaml.org/](https://yaml.org/)