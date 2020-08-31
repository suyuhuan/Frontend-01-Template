//initFSM状态机
const EOF = Symbol('EOF');

//创建状态机
function data(c) {
  console.log(c);
}

module.exports.parseHTML = function parseHTML(html) {
    console.log(html);
    //创建状态机
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
}