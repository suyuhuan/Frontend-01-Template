//跑通jsx语法
function createElement(Cls, attributes,...children) {
    // console.log(arguments);
    let o = new Cls;
    for (let name in attributes){
        o[name] = attributes[name];
    }

    // console.log(children);
    return o;
}

class Parent {
  //设置attribute
  set class(v) {
      console.log("Parent::class",v)
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
