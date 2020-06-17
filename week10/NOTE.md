#### 本周学习主题

##### 重学浏览器API ｜ 其它API

1. Range API
    * 一个问题：如何把一个元素所有的子元素逆序？
    * 常规解法：
    * ```javascript
        function reverseChildren(element) {
            let l = element.childNodes.length;

            while(l-- > 0) {
                element.appendChild(element.childNodes[l]);
            }

        }
      ```
    * Range API
        * 必要API
            * var range = new Range()
            * range.setStart(element, 9)
            * range.setEnd(element, 4)
            * var range = document.getSelection().getRangeAt(0)
        * 辅助API
            * range.setStartBefore
            * range.setEndBefore
            * range.setStartAfter
            * range.setEndAfter
            * range.selectNode
            * range.selectNodeContents
        * 摘取与插入
            * var fragment = range.extractContents()
            * range.insertNode(document.createTextNode("aaaa"))
    * 使用Range API解决子元素逆序问题：
    * ```javascript
        function reverseChildren(element) {
            let range = new Range();
            range.selectNodeContents(element);

            let fragment = range.extractContents();
            let l = fragment.childNodes.length;
            while(l-- > 0) {
                fragment.appendChild(fragment.childNodes[l])
            }
            element.appendChild(fragment);
        }
      ```
      * 优势：只有一次appendChild操作，减少了浏览器的重排操作，节点数多时，性能更优

2. CSSOM
    * doucment.styleSheets
    * Rules
        * document.styleSheets[0].cssRules
        * document.styleSheets[0].insertRule("p {color: pink;}", 0)
        * document.styleSheets[0].removeRule(0)
    * Rule
        * CSSStyleRule
            * selectorText String
            * style K-V结构
        * CSSCharsetRule
        * CSSImportRule
        * CSSMediaRule
        * CSSFontFaceRule
        * CSSPageRule
        * CSSNamespaceRule
        * CSSKeyframesRule
        * CSSKeyframeRule
        * CSSSupportsRule
        * ......
    * getComputedStyle
        * window.getComputedStyle(elt, pseudoElt)
        * elt 想要获取的元素
        * pseudoElt 可选，伪元素

3. CSSOM View
    * 窗口API
        * moveTo(x, y) 窗口移动到屏幕的特定坐标
        * moveBy(x, y) 窗口移动特定距离
        * resizeTo(x, y) 改变窗口大小到特定尺寸
        * resizeBy(x, y) 改变窗口大小特定尺寸
    * 滚动API
        * 视口滚动API
            * scrollX 是视口的属性，表示 X 方向上的当前滚动距离，有别名 pageXOffset
            * scrollY 是视口的属性，表示 Y 方向上的当前滚动距离，有别名 pageYOffset
            * scroll(x, y) 使得页面滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}
            * scrollBy(x, y) 使得页面滚动特定的距离，支持传入配置型参数 {top, left}
        * 元素滚动API
            * scrollTop 元素的属性，表示 Y 方向上的当前滚动距离
            * scrollLeft 元素的属性，表示 X 方向上的当前滚动距离
            * scrollWidth 元素的属性，表示元素内部的滚动内容的宽度，一般来说会大于等于元素宽度
            * scrollHeight 元素的属性，表示元素内部的滚动内容的高度，一般来说会大于等于元素高度
            * scroll(x, y) 使得元素滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}
            * scrollBy(x, y) 使得元素滚动到特定的位置，支持传入配置型参数 {top, left}
            * scrollIntoView(arg) 滚动元素所在的父元素，使得元素滚动到可见区域，可以通过 arg 来指定滚到中间、开始或者就近
    * 布局API
        * 全局尺寸信息
            * window.innerHeight, window.innerWidth 这两个属性表示视口的大小
            * window.outerWidth, window.outerHeight 这两个属性表示浏览器窗口占据的大小，很多浏览器没有实现，一般来说这两个属性无关紧要
            * window.devicePixelRatio 这个属性非常重要，表示物理像素和 CSS 像素单位的倍率关系，Retina 屏这个值是 2，后来也出现了一些 3 倍的 Android 屏
            * window.screen （屏幕尺寸相关的信息）
                * window.screen.width, window.screen.height 设备的屏幕尺寸
                * window.screen.availWidth, window.screen.availHeight 设备屏幕的可渲染区域尺寸，一些 Android 机器会把屏幕的一部分预留做固定按钮，所以有这两个属性，实际上一般浏览器不会实现的这么细致
                * window.screen.colorDepth, window.screen.pixelDepth 这两个属性是固定值 24，应该是为了以后预留
        * 元素的布局信息
            * getClientRects()
            * getBoundingClientRect()

4. 所有API

##### 编程与算法训练 ｜ TicTacToe/井字棋

1. 确定数据结构，使用二维数组存储棋盘上每一格的数据
2. 根据二维数组生成棋盘和棋子
3. 给每个格子绑定点击事件，点击时落子
4. 每次落子后检查是否满足获胜规则
5. 编写函数用于判断下一步是否有人将获胜
6. 编写用于获得最佳落子选择的函数，供AI使用

