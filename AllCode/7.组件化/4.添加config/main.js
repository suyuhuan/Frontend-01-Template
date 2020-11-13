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
        // o.appendChild(child);
        o.children.push(child);
    }

    // console.log(children);
    return o;
}

class Parent {
    constructor(config){
        this.children = [];
        console.log("config::",config);
    }
  //设置attribute
  set class(v) {//property
      console.log("Parent::class",v)
  }
  setAttribute(name, value) {//attribute
      console.log('---');
      console.log(name, value)
  }
//   appendChild(child) {//children
//       console.log("Parent::appendChild",child)
//   }
}
class Child {

}

let component = <Parent id= "a" class="b">
    <Child></Child>
    <Child></Child>
    <Child></Child>
</Parent>
// component.setAttribute("id","a");
component.class = "c";
console.log(component);
