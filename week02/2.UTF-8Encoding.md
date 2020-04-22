###写一个 UTF-8 Encoding 的函数
```
function Encoding(data) {
    const code = encodeURIComponent(data);
    const bytes = [];
    for (let i of code) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            bytes.push(hexVal);
            i += 2;
        } else bytes.push(c.charCodeAt(0));
    }
    return bytes;
}
```