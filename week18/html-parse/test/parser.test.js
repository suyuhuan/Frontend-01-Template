import {parseHTML} from '../src/parser.js';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
let assert = require("assert");

it('parse a single element',() => {
    let doc = parseHTML("<div></div>");
    let div = doc.children[0];
    assert.equal(div.tagName,"div");
    assert.equal(div.children.length, 0);
    assert.equal(div.type, "element");
    assert.equal(div.attributes.length, 2);
})

it('parse a single element width text content',() => {
    let doc = parseHTML("<div>hello</div>");
    let text = doc.children[0].children[0];
    console.log(text);
    assert.equal(text.type, "text");
    assert.equal(text.content, "hello");
})

it('tag mismatch',() => {
    try {
        let doc = parseHTML("<div></vid>");
    } catch(e) {
        assert.equal(e.message, "Tag start end doesn't match!")
    }
})

it('text with <',() => {
    let doc = parseHTML("<div>a < b</div>");
    let text = doc.children[0].children[0];
    assert.equal(text.type, "text");
    assert.equal(text.content, "a < b");
})

it('with property',() => {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\" ></div>");
    let div = doc.children[0];

    let count = 0;
    for (let attr of div.attributes) {
        if(attr.name === "id") {
            count ++;
            assert.equal(attr.value, "a");
        }
        if(attr.name === "class") {
            count ++;
            assert.equal(attr.value, "cls");
        }
        if(attr.name === "data") {
            count ++;
            assert.equal(attr.value, "abc");
        }
    }
  assert.ok(count === 3);
})

it('with property2', () => {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>");
    let div = doc.children[0];

    let count = 0;
    for (let attr of div.attributes) {
        if(attr.name === "id") {
            count ++;
            assert.equal(attr.value, "a");
        }
        if(attr.name === "class") {
            count ++;
            assert.equal(attr.value, "cls");
        }
        if(attr.name === "data") {
            count ++;
            assert.equal(attr.value, "abc");
        }
    }
  assert.ok(count === 3);
})

it('with property3', () => {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\"/>");
    let div = doc.children[0];

    let count = 0;
    for (let attr of div.attributes) {
        if(attr.name === "id") {
            count ++;
            assert.equal(attr.value, "a");
        }
        if(attr.name === "class") {
            count ++;
            assert.equal(attr.value, "cls");
        }
        if(attr.name === "data") {
            count ++;
            assert.equal(attr.value, "abc");
        }
    }
  assert.ok(count === 3);
})

it('script1', () => {
    let doc = parseHTML(`<script><div>abc</div>
    <span>X</span>
    /script>
    <script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script
    </script>`)
    let text = doc.children[0].children[0];
    assert.equal(text.type, "text");
    // assert.equal(text.content, content);
})

it('script2', () => {
    let content = `
    <div>abc</div>
    <span>X</span>
    /script>
    <script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script `
    let doc = parseHTML(`<script>${content}</script>`)
    let text = doc.children[0].children[0];
    assert.equal(text.type, "text");
    assert.equal(text.content, content);
})
it('script3', () => {
        let content = `<`
        let doc = parseHTML(`<script>${content}</script>`)
        let text = doc.children[0].children[0];
        assert.equal(text.type, "text");
        assert.equal(text.content, content);
    })

it('attribute with no value', () => {
    let doc = parseHTML("<div class />");
})

it('attribute with no value', () => {
    let doc = parseHTML("<div class id/>");
})

it('attribute with no value', () => {
    let doc = parseHTML("<div/>");
})