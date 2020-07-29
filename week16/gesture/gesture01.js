let element = document.body;

let contexts = Object.create(null);
let MOUSE_SYMBOL = Symbol('mouse');

// pc端
if(document.ontouchstart !== null) {
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
}

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