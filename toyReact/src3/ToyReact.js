
let childrenSymbol = Symbol("children");
class ElementWrapper {
    constructor(type) {
        this.type = type;
        // this.children = [];
        this[childrenSymbol] = [];
        this.props = Object.create(null);
        this.children = [];

    }
    //elementWrapper
    setAttribute(name, value) {
        // if(/^on([\s\S]+)$/.test(name)) {
        //     let eventName = RegExp.$1.replace(/^[\s\S]+/, s => s.toLowerCase())
        //     this.root.addEventListener(eventName, value)
        // }
        // if (name === 'className') {
        //     name = 'class'
        // }
        // this.root.setAttribute(name, value)

        this.props[name] = value;
    }
    // get children() {
    //    return this[childrenSymbol].map(child => child.vdom)
    // }
    appendChild(vchild) {
        this[childrenSymbol].push(vchild);
        this.children.push(vchild.vdom)
    //   let range = document.createRange();
    //   if(this.root.children.length){
    //     range.setStartAfter(this.root.lastChild)
    //     range.setEndAfter(this.root.lastChild)
    //   } else {
    //     range.setStart(this.root,0)
    //     range.setEnd(this.root,0)
    //   }
    //   vchild.mountTo(range);
    }
    get vdom() {
        return this;
        // let vChildren = this.children.map(child => child.vdom);
        // return {
        //     type: this.type,
        //     props:this.props,
        //     children: this.children.map(child => child.vdom)
        // }
    }
    //elementWrapper
    mountTo(range) {
        this.range = range;

        let placeholder = document.createComment("placeholder");
        let endRange = document.createRange();
        endRange.setState(range.endContainer,range.endOffset);
        endRange.setEnd(range.endContainer,range.endOffset);
        endRange.insertNode(placeholder);

        let element = document.createElement(this.type);

        for(let name in this.props) {

            let value = this.props[name];

            if(/^on([\s\S]+)$/.test(name)) {
                let eventName = RegExp.$1.replace(/^[\s\S]+/, s => s.toLowerCase())
                element.addEventListener(eventName, value)
            }
           if (name === 'className') {
                element.setAttribute("class", value)
            }
            element.setAttribute(name, value)
        }

        for (let child of this.children) {
            let range = document.createRange();
            if(element.children.length){
              range.setStartAfter(element.lastChild)
              range.setEndAfter(element.lastChild)
            } else {
                range.setStart(element,0)
                range.setEnd(element,0)
            }
            child.mountTo(range);
        }
       range.insertNode(element);
    }
}
class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
        this.type = "#text";
        this.children = [];
        this.props = Object.create(null);
    }
    //text
    mountTo(range) {
      this.range = range;
      range.deleteContents();
      range.insertNode(this.root);
    }
    get vdom() {
        return this;
        // return {
        //     type: "#text",
        //     props: this.props,
        //     children: []
        // }
    }
}

export class Component {
    constructor() {
        this.children = [];
        this.props = Object.create(null);
    }
    get type() {
        return  this.constructor.name;
    }
    //component
    setAttribute(name, value) {
        this.props[name] = value;
        this[name] = value;
    }
    setState(state) {
        let merge = (oldState, newState) => {
            for(let p in oldState) {
              if (typeof newState[p] === 'object' && newState[p] !== null) {
                if(typeof oldState[p] !== 'object') {
                    if(oldState[p] instanceof Array){
                        oldState[p] = [];
                     } else {
                        oldState[p] = {};
                     }
                }
                merge(oldState[p], newState[p])
              } else {
                oldState[p] = newState[p];
              }
            }
        }

        if (!this.state && state) {
            this.state = {}
        }
        merge(this.state, state)
        this.updated();
    }
  
    mountTo(range) {
        this.range = range;
        this.updated();
    }
    updated() {

        let vdom = this.vdom;
        if (this.oldVdom) {

           let isSameNode = (node1, node2) => {
               if (node1.type !== node2.type) {
                   return false;
               }

               for (let name in node1.props) {
                //    if(typeof node1.props[name] === " function" 
                //    && typeof node2.props[name] === " function"
                //    && node1.props[name].toString() === node2.props[name].toString()
                //    ){
                //        continue;
                //    }
                   if (typeof node1.props[name] === " object" 
                   && typeof node2.props[name] === " object"
                   && JSON.stringify(node1.props[name]) === JSON.stringify(node2.props[name])
                   ){
                       continue;
                   }
                   if (node1.props[name] !== node2.props[name]) {
                       return false;
                   }
               }

               if(Object.keys(node1.props).length !== Object.keys(node2.props).length)
                    return false;
               
                return true;
           }

           let isSameTree = (node1, node2) => {
               if(!isSameNode(node1, node2)) {
                   return false;
               }
               if(node1.children.length !== node2.children.length) {
                   return false;
               }
               for(let i =0; i< node1.children.length; i++) {
                   if(!isSameNode(node1.children[i], node2.children[i]))
                       return false;
               }
               return true;
           }

           let replace = (newTree, oldTree, indent) => {
            //    console.log(indent + "new" + newTree);
            //    console.log(indent + "old" + oldTree);
            
               if (isSameTree(newTree, oldTree)){
                     return;
               }
                   
               if(!isSameNode(newTree, oldTree)) {
                    newTree.mountTo(oldTree.range);
                } else {
                    for (let i=0; i < newTree.children.length; i++) {
                        replace(newTree.children[i], oldTree.children[i]," "+indent)
                    }
                }
           }

           replace(vdom, this.oldVdom, "");
        }else{
            vdom.mountTo(this.range);
        }
        this.oldVdom = vdom;
    }
    get Vdom(){
       return this.render().vdom;
    }

    appendChild(vchild) {
        this.children.push(vchild)
    }
}

export let ToyReact = {
    createElement(type, attributes, ...children) {
        let element;
        if (typeof type === "string") {
            element = new ElementWrapper(type)
        } else {
            element = new type()
        }

        // let element = document.createElement(type)
        for (let name in attributes) {
            element.setAttribute(name, attributes[name]);
        }
        let insertChildren = (children) => {
            for(let child of children) {
                if (typeof child === "string") {
                    child = new TextWrapper(child);
                } else{ 

                if(child == "" || child == void 0) {
                     child = "";
                }

                if (typeof child === "object" && child instanceof Array) {
                    insertChildren(child)
                    continue;
                } 

                if (!(child instanceof Component) &&
                        !(child instanceof ElementWrapper) &&
                        !(child instanceof TextWrapper)
                    ) {
                        child = String(child);
                    }
                
                 element.appendChild(child)
                }
            }
        }

        insertChildren(children);
        return element;
    },
    render(vdom, element) {
      let range = document.createRange();
      if(element.children.length){
        range.setStartAfter(element.lastChild)
        range.setEndAfter(element.lastChild)
      } else {
        range.setStart(element,0)
        range.setEnd(element,0)
      }
     
      vdom.mountTo(range);
    }
}