function Queue() {
    let items = [];

    //想队列添加元素
    this.enqueue = function (element) {
        items.push(element);
    }
    //从队列中移除元素
    this.dequeue = function() {
        return items.shift();
    }
    //查看队列头元素
    this.front = function() {
        return items[0];
    }
    //检查队列是否为空
    this.isEmpty = function() {
        return items.length == 0;
    };

    this.size = function() {
        return items.length;
    }
    //打印队列元素
    this.print = function() {
        console.log(items.toString());
    }
}