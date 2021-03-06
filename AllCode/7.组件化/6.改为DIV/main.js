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

class Div {
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
  //生命周期的环节
  mountTo(parent) {
      parent.appendChild(this.root);
      for(let child of this.children) {
          child.mountTo(this.root);
      }
  }
}


let component = <Div id= "a" class="b" style="width:100px;height:100px;background-color:red;">
    <Div></Div>
    <Div></Div>
    <Div></Div>
</Div>
// component.setAttribute("id","a");
component.mountTo(document.body);
console.log(component);
