# 每周总结可以写在这里

CSS 的顶层样式表由两种规则组成的规则列表构成，一种被称为 at-rule，也就是 at 规则，另一种是 qualified rule，也就是普通规则。

at-rule 由一个 @ 关键字和后续的一个区块组成，如果没有区块，则以分号结束


at 规则正是掌握 CSS 的一些高级特性所必须的内容。qualified rule 则是指普通的 CSS 规则，也就是我们所熟识的，由选择器和属性指定构成的规则

at 规则
@charset
@charset 用于提示 CSS 文件使用的字符编码方式，它如果被使用，必须出现在最前面。这个规则只在给出语法解析阶段前使用，并不影响页面上的展示效果。

@import
@import 用于引入一个 CSS 文件，除了 @charset 规则不会被引入，@import 可以引入另一个文件的全部内容。

@media
media 就是大名鼎鼎的 media query 使用的规则了，它能够对设备的类型进行一些判断。在 media 的区块内，是普通规则列表。

@page
page 用于分页媒体访问网页时的表现设置，页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围的盒。

@ counter-style
counter-style 产生一种数据，用于定义列表项的表现


@ key-frames
keyframes 产生一种数据，用于定义动画关键帧。

@ fontface
fontface 用于定义一种字体，icon font 技术就是利用这个特性来实现的。

@ support
support 检查环境的特性，它与 media 比较类似。
@ namespace
用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。
@viewport
用于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 HTML 的 meta 代替。

除了以上这些，还有些目前不太推荐使用的 at 规则
。@color-profile 是 SVG1.0 引入的 CSS 特性，但是实现状况不怎么好。
@document 还没讨论清楚，被推迟到了 CSS4 中。
@font-feature-values 。


普通规则
普通规则
选择器
声明列表
属性
值
值的类型
函数

CSS 属性值可能是以下类型。
CSS 范围的关键字：initial，unset，inherit，任何属性都可以的关键字。
字符串：比如 content 属性。
URL：使用 url() 函数的 URL 值。
整数 / 实数：比如 flex 属性。
维度：单位的整数 / 实数，比如 width 属性。
百分比：大部分维度都支持。
颜色：比如 background-color 属性。
图片：比如 background-image 属性。
2D 位置：比如 background-position 属性。
函数：来自函数的值，比如 transform 属性


css函数
calc()
函数是基本的表达式计算，它支持加减乘除四则运算。在针对维度进行计算时，calc() 函数允许不同单位混合运算，这非常的有用。

max()、min() 和 clamp() 
则是一些比较大小的函数，

max() 表示取两数中较大的一个，
min() 表示取两数之中较小的一个，
clamp() 则是给一个值限定一个范围，超出范围外则使用范围的最大或者最小值。
toggle() 函数在规则选中多于一个元素时生效，它会在几个值之间来回切换，

attr() 函数允许 CSS 接受属性值的控制。