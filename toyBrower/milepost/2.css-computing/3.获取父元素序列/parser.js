const css = require('css');
const EOF = Symbol('EOF');
let currentToken = null;
let currentAttribute = null;
let stack = [{type:"document", children:[]}];
let currentTextNode = null;

//收集css规则
let rules = [];
function addCSSRules(text) {
    let ast = css.parse(text);
    // console.log(JSON.stringify(ast, null, "  "))
    rules.push(...ast.stylesheet.rules);
}

//获取父元素序列
function computeCSS(element) {
    let elements = stack.slice().reverse();
    console.log(elements);
}
function emit(token) {
    // console.log(token);
    let top = stack[stack.length - 1];

    if (token.type == "startTag") {
        let element = {
            type: "element",
            children: [],
            attributes: []
        }
        element.tagName = token.tagName;

        for (let p in token) {
            if (p !== "type" && p !== "tagName") {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }

        computeCSS(element);
        
        top.children.push(element);
        element.parent = top;

        if (!token.isSelfClosing) {
            stack.push(element);
        }
        currentTextNode = null;

    } else if (token.type == "endTag") {
        if (top.tagName !== token.tagName) {
            throw new Error("tag start end doesn't match!")
        } else {
            //遇到style，执行添加css规则
            if (top.tagName === "style") {
                // console.log(top.children);
                addCSSRules(top.children[0].content);
            }
            stack.pop();
        }
        currentTextNode = null;
        //处理文本节点
    } else if (token.type == "text") {
        if (currentTextNode == null) {
            currentTextNode = {
                type:"text",
                content:""
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

function data(c) {
  if (c == "<") {
      return tagOpen;
  } else if ( c == EOF) {
      emit({
          type:"EOF"
      })
      return ;
  } else {
      emit({
          type:"text",
          content:c
      });
      return data;
  }
}
function tagOpen(c) {
    if (c == "/") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c);
    } else {
        emit({
            type:"text",
            content: c
        })
        return ;
    }
}
function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type:"endTag",
            tagName: ""
        }
        return tagName(c);
    } else if (c == ">") {

    } else if (c == EOF) {
        return ;
    } else {

    }
}
function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName;
    } else if (c == ">") {
        emit(currentToken);
        return data;
    } else {
        currentToken.tagName +=c;
        return tagName;
    }
}
function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/" || c == ">" || c == EOF) {
        return afterAttributeName(c);
    } else if (c == "=") {
       
    } else {
        currentAttribute = {
            name:"",
            value:""
        }
        return attributeName(c);
    }
}

function selfClosingStartTag(c) {
    if (c == ">") {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if (c == "EOF") {
        return ;
    } else {

    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
        return afterAttributeName(c);
    } else if (c == "=") {
        return beforeAttributeValue;
    } else if (c == "\u0000") {

    } else if (c == "\"" || c == "'" || c == "<") {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}
function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeValue
    } else if (c == "\"") {
        return doubleQuotedAttributeValue;
    }  else if (c == '"') {
        return doubleQuotedAttributeValue;
    }
     else if (c == "\'") {
        return singleQuotedAttributeValue;
    } else if (c == ">") {

    } else {
        return UnquotedAttributeValue(c);
    }
}
function doubleQuotedAttributeValue(c) {
    if (c == "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == "\u0000") {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}
function singleQuotedAttributeValue(c) {
    if (c == "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}
function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {

    } else {
        return beforeAttributeName;
    }
}
function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c == "/") {
        currentToken[currentAttribute.name] =currentAttribute.value;
        return selfClosingStartTag;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
            emit(currentToken);
            return data;
    } else if (c == "\u0000") {

    } else if (c == "\"" || c == "'" || c == "<" || c == "=" || c == "`") {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}
function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c == "=") {
        return beforeAttributeValue;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
       emit(currentToken);
    } else if (c === EOF) {

    } else {
        currentAttribute[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
          name: '',
          value: ''
        };
        return attributeName(c);
    }
}
// module.exports.parseHTML = function parseHTML(html) {
function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
}

let body = `<html>
<head>
<style>
  #text{
      font-size:30px;
      color:yellow;
  }
</style>
</head>
<body style='background:red;'>
   <div id="text">这是一个文本</div>
</body>
</html>`
parseHTML(body)
// console.log(stack[0]);

