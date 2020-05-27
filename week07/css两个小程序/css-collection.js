const list = document.getElementById('container').children;
let result = [];

for (const item of list) {
  if (item.getAttribute('data-tag').match(/css/)) {
    let title = item.children[1].innerText;
    let href = item.children[1].children[1].children[0].href
    result.push({
      name: title,
      url: href
    })
  }
}
