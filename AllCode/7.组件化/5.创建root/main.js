//跑通jsx语法
function createElement(Cls, attributes,...children) {
    // console.log(arguments);
    let o = new Cls({
        timer: {}
    });

    for (let name in attributes){
        // o[name] = attributes[name];
        o.setAttribute(name, attributes[name]);
    }

    for(let child of children) {
        o.appendChild(child);
    }

    // console.log(children);
    return o;
}

class Parent {
    constructor(config){
        this.children = [];
        this.root = document.createElement("div");
        console.log("config::",config);
    }
  //设置attribute
  set class(v) {//property
      console.log("Parent::class",v)
  }
  setAttribute(name, value) {//attribute
     this.root.setAttribute(name, value);
  }
  appendChild(child) {//children
    child.mountTo(this.root);
    console.log("Parent::appendChild",child)
  }
  mountTo(parent) {
      parent.appendChild(this.root);
  }
}
class Child {
    constructor(config){
        this.children = [];
        this.root = document.createElement("div");
        console.log("config::",config);
    }
  setAttribute(name, value) {//attribute
     this.root.setAttribute(name, value);
  }
  appendChild(child) {//children
    child.mountTo(this.root);
    console.log("Parent::appendChild",child)
  }
  mountTo(parent) {
      parent.appendChild(this.root);
  }
}

let component = <Parent id= "a" class="b">
    <Child></Child>
    <Child></Child>
    <Child></Child>
</Parent>
// component.setAttribute("id","a");
component.mountTo(document.body);
console.log(component);
