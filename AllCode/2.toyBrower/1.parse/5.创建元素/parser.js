//emitToken(创建元素)
const EOF = Symbol('EOF');
let currentToken = null;

function emit(token) {
    console.log(token);
}

function data(c) {
  console.log(c);
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
        return data;
    } else {
        return tagName;
    }
}
function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == ">") {
        return data;
    } else if (c == "=") {
        return beforeAttributeName;
    } else {
        return beforeAttributeName;
    }
}

function selfClosingStartTag(c) {
    if (c == ">") {
        currentToken.isSelfClosing = true;
        return data;
    } else if (c == "EOF") {
        return ;
    } else {

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
let body = `<html ma=a> <html/>`;
// let body = `<html maaa=a>
// <body>
//     <div id="id" class="background">
//         <div class="test">
//         <div class="demo"></div>
//         <div class="demo2"></div>
//         </div>
//         <img id="myid"/>
//         <img />
//     </div>
// </body>
// </html>`
parseHTML(body)

