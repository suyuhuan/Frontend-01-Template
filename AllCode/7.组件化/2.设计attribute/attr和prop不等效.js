//跑通jsx语法，createElement 决定attr和pro等效
function createElement(Cls, attributes,...children) {
    // console.log(arguments);
    let o = new Cls;
    for (let name in attributes){
        // o[name] = attributes[name];
        o.setAttribute(name, attributes[name]);
    }

    // console.log(children);
    return o;
}

class Parent {
  //设置attribute
  set class(v) {
      console.log("Parent::class",v)
  }
  setAttribute(name, value) {
      console.log(name, value)
  }
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
