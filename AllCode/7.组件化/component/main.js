//跑通jsx语法
function createElement(Cls, attributes,...children) {
    // console.log(arguments);
    let o;
    //处理小写div
    if (typeof Cls === "string") {
        o = new Wraper(Cls);
    } else {
        o = new Cls({
            timer: {}
        });
    }

    for (let name in attributes){
        // o[name] = attributes[name];
        o.setAttribute(name, attributes[name]);
    }

    for(let child of children) {
        //处理文字
        if (typeof child === "string") {
            child = new Text(child);
        }
        o.appendChild(child);
    }

    // console.log(children);
    return o;
}
class Wraper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {//attribute
        this.root.setAttribute(name, value);
     }
     appendChild(child) {//children
       this.children.push(child);
       // child.mountTo(this.root);
     }
     //生命周期的环节
     mountTo(parent) {
         parent.appendChild(this.root);
         for(let child of this.children) {
             child.mountTo(this.root);
         }
    }
}
class Text{
    constructor(text) {
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class MyComponent {
    constructor(config){
        this.children = [];
        this.root = document.createElement("div");
    }
  //设置attribute
  set class(v) {//property
      console.log("Parent::class",v)
  }
  setAttribute(name, value) {//attribute
     this.root.setAttribute(name, value);
  }
  appendChild(child) {//children
    this.children.push(child);
    // child.mountTo(this.root);
  }
  render() {
      return <article>
          <header>I'm a header</header>
          {this.slot}
          <footer>I'm a footer</footer>
      </article>
  }
  //生命周期的环节
  mountTo(parent) {
    //   parent.appendChild(this.root);
    this.slot = <div></div>;

    for(let child of this.children) {
        this.slot.appendChild(child)
        // child.mountTo();
    }

    this.render().mountTo(parent);
  }
}


let component = <MyComponent>
    <div id= "a" class="b" style="width:100px;height:100px;background-color:red;">
        <div>text</div>
        <div>text</div>
        <div>text</div>
    </div>
</MyComponent>
// component.setAttribute("id","a");
component.mountTo(document.body);
console.log(component);
