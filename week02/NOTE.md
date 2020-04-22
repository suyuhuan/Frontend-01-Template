#第二周学习总结
跟着winter学习的第二周，winter主要是针对编程语言通识设计和JavaScript的词法类型做了一次深入的讲解。一开始可能是自己根本就不知道编程语言通识相关的知识，所以在很长一段时间，都不知道老师在讲什么，在学习过程中，同学也对相应的知识向老师提了很多问题。我看着只是觉得挺蒙的，根本就不知道在说什么，自然也不知道提什么好。于是就这样，我划水了一节课。课后又回看了一遍视频，虽然也是跳着看的，然后在账号里找了一些助教和老师提供的资料，才勉强知道老师讲的是什么。我觉得我也挺可爱的，在学员中学到最好不知道老师讲的是什么的，应该只有我一个了吧，哈哈。

在编程通识语言一课中老师针对按语法分类讲述了形式语言与非形式语言区别
形式语言就是我们使用的JavaScript等相关的计算机语言，非形式语言就是我们说的中文等。
* 非形式语言
  * 中文
* 形式语言包括四个层次：
  * 0型: （无限制文法或短语结构文法）包括所有的文法。
    * 等号左边不止一个
     ```<a><b> ::= "c"```
  * 1型: （上下文相关文法）生成上下文相关语言。
    * ``` "a"<b>"c"::="a""x""c" ```
  * 2型: 上下文无关文法）生成上下文无关语言
    * js, 大部分情况是上下文无关
  * 3型: （正规文法）生成正则语言。
    * 限制表达能力

然后老师讲了产生式（BNF），在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句。
  比如：
```
"a"
"b"
<Program>: = ("a"+ | <Program> "b"+)+

整数连加
"+"
<Number>: "0" | "1" ... "9"
<Deciamal>: "0" | (("1" ~ "9") <Number>+)
<Expression>: <Deciamal> ("+" <Deciamal>)+
<Expression>: Deciamal | (<Expression> "+" <Deciamal>)

四则运算
<PrimaryExpression> = <DecimalNumber> |
"(" <LogicalExpression> ")"

<MultiplicativeExpression> = <PrimaryExpression> |
<MultiplicativeExpression> "*" <PrimaryExpression>|
<MultiplicativeExpression> "/" <PrimaryExpression>

<AdditiveExpression> = <MultiplicativeExpression> |
<AdditiveExpression> "+" <MultiplicativeExpression>|
<AdditiveExpression> "-" <MultiplicativeExpression>

逻辑判断
<LogicalExpression> = <AdditiveExpression> |
<LogicalExpression> "||" <AdditiveExpression> |
<LogicalExpression> "&&" <AdditiveExpression>
```
针对图灵机及图灵完备性进行的讲解，之前只知道javascript是图灵完备的语言，根本不知道什么是图灵完备的语言，听老师讲解后才知道，图灵机又称确定型图灵机，是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于任何有限逻辑数学过程的终极强大逻辑机器。
图灵完备性：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。


第二课winter老师针对JavaScript词法和类型做了相应的讲解。

### Atom 词

#### InputElement

- whiteSpace

  可查阅 unicode [space列表](https://www.fileformat.info/info/unicode/category/Zs/list.htm)

  - Tab：制表符（打字机时代：制表时隔开数字很方便）
  - VT：纵向制表符
  - FF: FormFeed
  - SP: Space
  - NBSP: NO-BREAK SPACE（和 SP 的区别在于不会断开、不会合并）
  - ...

- LineTerminator 换行符

  - LF: Line Feed `\n`
  - CR: Carriage Return `\r`
  - ...

- Comment 注释

- Token 记号：一切有效的东西

  - Punctuator: 符号 比如 `> = < }`
  - Keywords：比如 `await`、`break`... 不能用作变量名，但像 getter 里的 `get`就是个例外
    - Future reserved Keywords: `eum`
  - IdentifierName：标识符，可以以字母、_ 或者 $ 开头，代码中用来标识**[变量](https://developer.mozilla.org/en-US/docs/Glossary/variable)、[函数](https://developer.mozilla.org/en-US/docs/Glossary/function)、或[属性](https://developer.mozilla.org/en-US/docs/Glossary/property)**的字符序列
    - 变量名：不能用 Keywords
    - 属性：可以用 Keywords
  - Literal: 直接量
    - Number
      - 存储 Uint8Array、Float64Array
      - 各种进制的写法
        - 二进制0b
        - 八进制0o
        - 十进制0x
      - 实践
        - 比较浮点是否相等：Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
        - 如何快捷查看一个数字的二进制：(97).toString(2)
    - String
      - Character
      - Code Point
      - Encoding
        - unicode编码 - utf
          - utf-8 可变长度 （控制位的用处）
      - Grammar
        - `''`、`""`、``` `
    - Boolean
    - Null
    - Undefind

总之在第二周的学习中，收获的全是自己之前不知道的知识，给自己开了一个大脑洞。这周收获满满，非常感谢winter老师的付出，让我们能有这一次机会了解这么多知识点。


