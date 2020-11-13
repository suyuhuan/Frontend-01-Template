//跑通jsx语法
function createElement(Cls, attributes) {
    let o = new Cls;
    for (let name in attributes){
        o[name] = attributes[name];
    }
    return o;
    console.log(arguments);
}
function Div() {

}
let component = <Div id= "a" class="b" abc ="c"/>
// component.setAttribute("id","a");

console.log(component);
