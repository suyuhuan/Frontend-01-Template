import { createElement, Text, Wrapper } from './createElement'

class Carousel {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) { //attribute
        this[name] = value;
    }

    appendChild(child) {
        this.children.push(child);
    }


    render() {
        let children = this.data.map((url) => {
            let element = <img src={url} />
            element.addEventListener('dragstart', event => { event.preventDefault() })
            return element;
        })

        let root = (<div class='carousel'>{children}</div>);

        let position = 0;

        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;
            // 获得当前元素
            let current = children[position];
            // 获得下一个元素
            let next = children[nextPosition];

            /*
             设置当前元素开始移动，每次移动两张
                当前图片向左移动, 下一图片向左移动
                16毫秒大约为一帧 
             */

            current.style.transition = 'ease 0s';
            next.style.transition = 'ease 0s';
            // 起点
            current.style.transform = `translateX(${-100 * position}%)`;
            next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;


            // transition生效是需要时间的， 因此需要加 setTimeout
            setTimeout(() => {
                current.style.transition = '';
                next.style.transition = '';

                current.style.transform = `translateX(${-100 - 100 * position}%)`;
                next.style.transform = `translateX(${-100 * nextPosition}%)`;

                // 获得一下一个元素下标, 当最后一张图片后，然后重新从0开始
                position = nextPosition;
            }, 16);

            setTimeout(nextPic, 3000);
        }
        // setTimeout(nextPic, 3000);

        root.addEventListener("mousedown", event => {
            let startX = event.clientX, startY = event.clientY;

            let lastPosition = (position - 1 + this.data.length) % this.data.length;
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let last = children[lastPosition];
            let next = children[nextPosition];

            current.style.transition = 'ease 0s';
            last.style.transition = 'ease 0s';
            next.style.transition = 'ease 0s';


            current.style.transform = `translateX(${- 500 * position}px)`;
            last.style.transform = `translateX(${-500 - 500 * nextPosition}px)`;
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;


            let move = event => {
                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * nextPosition}px)`;
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;

            };
            /*
            判断，拖动时，
            1.不动， 
            2.往左，
            3.往右
            */
            let up = event => {
                let offset = 0;
                // 往右
                if (event.clientX - startX > 250) {
                    offset = 1;
                }
                // 往左
                else if (event.clientX - startX < -250) {
                    offset = -1;
                }

                // 把 transition 打开
                current.style.transition = '';
                last.style.transition = '';
                next.style.transition = '';

                current.style.transform = `translateX(${offset * 500 - 500 * position}px)`;
                last.style.transform = `translateX(${offset * 500 - 500 - 500 * nextPosition}px)`;
                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

                position = (position - offset + this.data.length) % this.data.length;;

                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })



        return root
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }

}


let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />



component.mountTo(document.body);
