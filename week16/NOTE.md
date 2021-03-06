# 手势
### 事先声明
``` 
let element = document.body;
let contexts = Object.create(null);
let MOUSE_SYMBOL = Symbol('mouse');
```

### 鼠标事件监听模型
```
element.addEventListener("mousedown", (event)=>{
        contexts[MOUSE_SYMBOL] = Object.create(null);
        start(event, contexts[MOUSE_SYMBOL]);
        let mousemove = event => {
           move(event, contexts[MOUSE_SYMBOL]);
        }
        let mouseend = event => {
            end(event, contexts[MOUSE_SYMBOL]);
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseend);
        }
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseend);
    })
```
### touch事件监听模型
```
// 触摸屏
element.addEventListener("touchstart", event => {
   for (let touch of event.changedTouches) {
    contexts[touch.identifier] = Object.create(null);
     start(touch, contexts[touch.identifier])
   }
})

element.addEventListener("touchmove", event => {
    for (let touch of event.changedTouches) {
        move(touch, contexts[touch.identifier])
    }
})

element.addEventListener("touchend", event => {
    for (let touch of event.changedTouches) {
        end(touch, contexts[touch.identifier]);
        delete contexts[touch.identifier];
    }
})

element.addEventListener("touchcancel", event => {
    for (let touch of event.changedTouches) {
        cancel(touch, contexts[touch.identifier]);
        delete contexts[touch.identifier];
    }
})
```
### 行为抽象
```
let start = (point,context) => {
    context.startX = point.clientX, context.startY = point.clientY;
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    console.log("Tap");
    context.timeputHandler = setTimeout(()=>{
        if (context.isPan)
            return;
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        console.log("pressstart");
    },500)

    // console.log("start",point.clientX,point.clientY);
}

let move = (point,context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
    if (dx ** 2 + dy **2 > 100 && !context.isPan) {
        context.isTap = false;
        context.isPan = true;
        context.isPress = false;
        console.log("panstart");
    }
    if (context.isPan) {
        console.log("pan");
    }
    // console.log("move",dx, dy);
}

let end = (point,context) => {
    // console.log("end",point.clientX,point.clientY);
    if (context.isPan)
        console.log("panEnd")
    if (context.isTap)
         console.log("Tapend")
    if (context.isPress)
        console.log("PressEnd")
    clearTimeout(context.timeputHandler)
}

let cancel = (point,context) => {
    console.log("cancelend")
    clearTimeout(context.timeputHandler)
}
```
## 手势理论说明
### touchEvent VS mouseEvent
- touchEvent 没有像mouseevent在事件上的x/y，而是在touchlist(可能有多个touch)，其中的每个touch object上
- touchevent和mouseevent有不同的抽象，要对他们合理的统一抽象，才能使得组件同时支持touch和mouse，不至于产生touch的场景下同时触发了mouse事件等的bug
- 给组件写手势库来区分touch和mouse
- 手机的系统手势可以关闭的，保护组件的手势不被识别成系统手势而造成退出app
- 多指手势会产生transform，rotate，scale
- 比较有名的手势库hammerJS

### 手势行为
- Tap(手往屏幕上面点)
- Pan(手指拖拽)
- Flick(快速点)
- Press(点后较长时间离开屏幕)

### 行为说明
- start之后很快的end：tap事件
- start之后过了几秒：pressstart - 移动10px（一般业界用的数字，但还是需要用dpr去算一下） ： panstart
- start之后过了几秒：pressstart - end ： pressend
- start之后移动了如10px：panstart
- panstart - move :panmove - move ：panmove -end ：panend
- panstart - move :panmove - move ：panmove -end且速度>XX ：panend + flick
- flick是panend的一个变形，有可能是和panend一起同时触发
- 处理不同的start和move之间的关系-context：为了算出移动距离起点的距离，需要在start时候存储起点，因为start要处理touch和mouse两类事件，且可能被触发多次start，所以不能仅从传入的point去存储起点，而应该同时传入point来自的context，在start事件被触发时，把它的context传入全局的contexts对象中
- 在context中设置事件标志存储isTap/isPan/isPress
- 考虑双击事件的话需要延迟tap才知道是不是双击，因为第一次触发的时候一定会识别成tap。tap/singletap/doubletap来识别双击
- Listener还可以加入考虑gesture库的用户自定义的逻辑，如是否capture或者是否passive等
- flick事件跟速度有关，有两种可能：快速的扫动，或者press时候，在end的时候已很快的速度扫出，看自己要不要处理后者。现在在pan之后去处理flick逻辑，看end之前300ms内的速度有多快，大于2.5就认为是触发了flick事件，不然就是pan/press。
- 2.5这个速度可根据具体情况/用研数据去做调整