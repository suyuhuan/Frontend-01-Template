### 初始化项目
创建一个文件夹，并使用 npm init 命令初始化一个 package.json 文件。

### 安装依赖环境
--save-dev 表示将这些依赖安装到项目中，并且这些依赖是在开发和测试环境中使用。
```
npm install @babel/core --save-dev
npm install @babel/plugin-transform-react-jsx --save-dev
npm install @babel/preset-env --save-dev
npm install babel-loader --save-dev
npm install webpack --save-dev
npm install webpack-cli --save-dev
npm install webpack-dev-server --save-dev
```
### 配置 webpack 入口文件
将以下代码添加到新增的 webpack.config.js 文件中。
```
module.exports = {
    entry: './main.js',
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement'}]]
                }
            }
        }]
    },
    mode: 'development',
    optimization: {
        minimize: false
    }
};
```

### 设计组件
添加一个 createElement 函数，该函数接收一个 Class、attribute 和 child 参数。并为这个 Class 添加 property。
处理小写标签（省略）。
处理文本（省略）。
```
function createElement(Cls, attributes, ...children){
    let o = new Cls({ timer: {} });

    for (let name in attributes) {
        o.setAttribute(name, attributes[name]);
    }

    for (let child of children) {
        o.appendChild(child);
    }

    return o;
}

class MyComponent {
    constructor(config) {
        this.children = [];
        this.root = document.createElement('div');
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        this.children.push(child);
    }

    render() {}

    mount(parent) {
        parent.appendChild(this.root);

        for(let child of this.children) {
            child.mount(this.root);
        }
    }
}

let component = <Div id="a" style="width: 100px; height: 100px; background-color: pink;">
    <Div></Div>
    <Div></Div>
    <Div></Div>
</Div>

component.mount(document.body);
```