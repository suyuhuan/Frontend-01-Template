function LinkedList() {
        let Node = function(element) {
            this.element = element;
            this.next = null;
        };
        let length = 0;
        let head = null;

        // 向列表尾部添加一个新的项
        this.append = function (element) {
            let node = new Node(element),
             current;
             if (head === null) {
                 head = node;
             } else {
                 current = head
                 //循环列表 直到找到最后一项
                 while(current.next) {
                     current = current.next;
                 }
                 //找到最后一项，将其next赋为node，建立链接
                 current.next = node;
             }
             length ++ ; //更新列表的长度
        };

          //从列表的特定位置移除一项
          this.removeAt = function (position) {
            if (position > -1 && position < length) {
                let current = head,
                previous,
                index = 0;

                //移除第一项
                if (position === 0) {
                    head = current.next;
                } else {
                    while ( index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    //将previous与current的下一项链接起来,跳过current,从而移除它
                    previous.next = current.next;
                }
                length --;
                return current.element;
            } else {
                return null;
            }
        };

        //向列表的特定位置插入一个新的项
        this.insert = function (position, element){
            //检查越界值
            if (position >=0 && position <= length) {
                let node = new Node(element),
                current = head,
                previous,
                index = 0;

                //在第一个位置添加
                if (position === 0) {
                    node.next = current;
                    head = node;
                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                }
                length ++;//更新列表的长度
                return true;
            } else {
                return false;
            }
        };

        //从列表中移除一项
        this.remove = function(element) {
            let index = this.indexOf(element);
            return this.removeAt(index);
        };

        //返回元素在列表中的索引，如果列表中没有改元素返回-1
        this.indexOf = function(element) {
            let current = head,
            index = 0;

            while(current) {
                if (element === current.element) {
                    return index;
                }
                index++;
                current = current.next;
            }
            return -1;
        };
        //如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false
        this.isEmpty = function () {
            return length === 0;
        };

        //返回链表包含的元素个数，与数组的length属性类似
        this.size = function() {
            return length;
        };

        this.getHead = function() {
            return head;
        };

        //由于列表项使用了node类，就需要重写继承自js对象默认的tostring方法，让其只输出元素的值
        this.toString = function() {
            let current = head,
            string = '';

            while(current) {
                string += current.element + (current.next ? 'n' : '');
                current = current.next;
            }
            return string;
        };

        this.print = function() {
            
        };
    }