import {parseHTML} from './../parser.js';
let assert = require("assert");

it('parse a single element',() => {
    let doc = parseHTML("<html maaa=\"a\" a='b'>网页</html>");
    console.log(doc);
    // let div = doc.children[0];
    // assert.equal(div.tagName,"div");
    // assert.equal(div.children.length, 0);
    // assert.equal(div.type, "element");
    // assert.equal(div.attributes.length, 2);
})