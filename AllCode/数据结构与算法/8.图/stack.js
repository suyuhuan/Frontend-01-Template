function Stack() {
    let items = [];

    //向栈添加元素
    this.push = function(element) {
        items.push(element);
    }
    // 从栈移除元素
    this.pop = function() {
        return items.pop();
    }
    //查看栈顶元素
    this.peek = function() {
        return items[items.length - 1];
    }
    //查找栈是否为空
    this.isEmpty = function() {
        return items.length == 0;
    }
    this.size = function() {
        return items.length;
    }
    this.clear = function() {
        items = [];
    }
    this.print = function() {
        console.log(items.toString());
    }
}