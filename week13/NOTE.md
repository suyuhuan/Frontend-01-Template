# 每周总结可以写在这里

### range总结
- range = document.createRange();
注意：一旦一个 Range 对象被建立，在使用他的大多数方法之前需要去设置他的临界点。
```
  let range = document.createRange();
```
- range.setStart(startNode, startOffset); 方法用于设置 Range的开始位置。
- startNode 用于设定 Range的起始位置。
- startOffset 必须为不小于0的整数。表示从startNode的开始位置算起的偏移量。
```
var range = document.createRange();
var startNode = document.getElementsByTagName("p").item(2);
var startOffset = 0;
range.setStart(startNode,startOffset);
```

- range.setEnd(endNode, endOffset);
- endNode用于设定 Range的结束位置。
- endOffset 必须为不小于0的整数。表示从endNode的结束位置算起的偏移量。

```
var range = document.createRange();
var endNode = document.getElementsByTagName("p").item(3);
var endOffset = endNode.childNodes.length;
range.setEnd(endNode, endOffset);
```

- range.getBoundingClientRect() 返回一个 DOMRect 对象，该对象将范围中的内容包围起来；即该对象是一个将范围内所有元素的边界矩形包围起来的矩形


### reactive总结
#### proxy
let proxy = new Proxy(target, handler)
- 1.target: 用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
- 2.handler: 一个对象，其属性是当执行一个操作时定义代理的行为的函数。
```
let handler = {
        get: function(target, name){
            return name in target ? target[name] : 'sorry, not found';
        }
    };
    let p = new Proxy({}, handler);
    p.a = 1;
    p.b = undefined;
    console.log(p.a, p.b);    // 1, undefined
    console.log('c' in p, p.c);    // false, 'sorry, not found' 
```

#### reflect
- Reflect.get(): 获取对象身上某个属性的值，类似于 target[name]。
- Reflect.set(): 将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。
- Reflect.has(): 判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
- Reflect.deleteProperty(): 作为函数的delete操作符，相当于执行 delete target[name]。



### 组件化
### 组件
properties
methods
inherit
attribute
config & state
event
lifecycle
children


#### 接口设计思路
```
carousel
    state
     activeIndex
    property
        loop time imglist color forward
    attribute
        startIndex loop time imglist autoplay color forward
    children
        append remove add
    event
        change click hover swipe resize dbclick
    method
        next() prev() goto()
        play()  stop()
    config
   ```

   
   