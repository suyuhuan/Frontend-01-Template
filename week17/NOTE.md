# 每周总结可以写在这里
## 组件化
- tab组件: TabPanel
- list组件: ListView
- cssloader: 引入css库 npm i css

## 工具链
### tools
	初始化
		yeoman
		create-react-app
		vue-cli
	开发/调试
		dev-tool/chrome
		webpack-dev-server
		mock
		wireshark
		charles
	测试
		mocha
		jest
	发布
		lint
		jenkins

### yeoman 
> Yeoman 是一种高效、开源的 Web 应用脚手架搭建系统

#### 工具
- npm 
- yo  
- generator-generator

##### 安装环境
 ```
    npm init
    npm install -g yo
    npm install -g generator-generator
    npm install yeoman-generator
```

##### 创建generator-syh项目
> 必须命名该文件夹generator-name（其中name是生成器的名称）。这一点很重要，因为Yeoman依靠文件系统来查找可用的生成器。

##### 创建generator-syh目录结构
```
├───package.json
└───generators/
    ├───app/
    ├───└───templates
    │   └───index.js
    └───router/
        └───index.js
```
- generators/app/templates目录
    1. 放置脚手架代码模板的文件夹
- generators/app/index.js 文件
    1. 配置用户输入信息，模板迁移和替换规则，安装项目依赖模块；该文件是Generator的子类，重点完成三个方法的定制，分别是prompting，writing，install.


###### 用户输入配置的代码(generators/app/index.js 文件)

###### prompting()方法
```
    prompting() {  
     this.log(
        yosay(`Welcome to the cool ${chalk.red('generator-xxx-porject')} generator!`)
    ); 
   const prompts = [
       {      
            type: 'confirm', 
            name: 'someAnswer',  
            message: 'Would you like to enable this option?',    
            default: true
      },
     {      
        name: 'appName', 
        message: 'your appName name?'
     }
  ]; 
   return this.prompt(prompts).then(props => {
    this.props = props;
  });
}
```


- prompting方法主要是来完成和用户交互的，交互的用户输入信息都放在prompts数组中：
   - name 用户输入项的标识，在获取用户输入值的时候会用到
   - message 是给用户的提示信息
   - type 非必填，默认是text，即让用户输入文本；confirm是选择输入“Yes/No"
   - default 非必填，用户输入的默认值

###### writing()方法
项目文件的模板拷贝和用户输入替换工作都在中实现

```
writing() {    
    let target = [      // 需要加工的文件使用数组
      ['src/_route.js', 'src/route.js'],
      ['_index.ejs', 'index.ejs'],      // 不需要加工的文件
      'README.md',  
      'index.html',      
      'package.json',      
      'proxy.json',      
      'build/build.js',      
      'build/check-versions.js',
      ......
      ...
    ];   
     // 添加隐藏文件 .文件名称在linux下会有问题，所以.xxx在template里改为_xxx
    target = target.concat([
        ['_eslintrc.js', '.eslintrc.js'],
        ['_eslintignore', '.eslintignore'],
        ['_babelrc', '.babelrc'],
        ['_editorconfig', '.editorconfig'],
        ['_gitignore', '.gitignore'],
        ['_postcssrc.js', '.postcssrc.js']
      ]);
    _.forEach(target, (file) => {      
        let toFile;      
        let fromFile;      
        if (_.isArray(file)) {        // eslint-disable-next-line
            fromFile = file[0];        // eslint-disable-next-line
            toFile = file[1];       
            this.fs.copyTpl(        
                this.templatePath(fromFile),       
                this.destinationPath(toFile),        
                this.props
            );
        } else {
                fromFile = file;
                toFile = file;        
                this.fs.copy(        
                    this.templatePath(fromFile),        
                    this.destinationPath(toFile),        
                    this.props
            );
        }
    });
  }
```

- this.templatePath：返回template目录下文件的地址
- this.destinationPath：指定加工完成后文件的存放地址，一般是项目目录
- this.fs.copy：把文件从一个目录复制到另一个目录，一般是从template目录复制到你所指定的项目目录，用于固定文件和可选文件（根据用户选择）
- this.fs.copyTpl：和上面的函数作用一样，不过会事先经过模板引擎的处理，一般用来根据用户输入处理加工文件

###### install()
```
    install() { // 安装npm依赖和bower依赖
    //this.installDependencies(); 
    // 只安装bower依赖
    //this.bowerInstall();
    // 只安装npm组件
    this.npmInstall();
    }
```

###### 模板文件(generators/app/templates)
目录存储的是文件的模板文件，是生成新的项目结构的原材料；

EJS模板语法:
```
赋值 <%= appName%>
表达式 <% if(someAnswer){ xxx } %>
```

##### 运行脚手架
 ```
   npm link
   yo syh(usename)
 ```


#### console-toolkit
```
var stdin = process.stdin;
var tty = require('tty');
var ttys = require('ttys');
var readline = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;

stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );

async function getChar() {
    return new Promise(resolve => {
        stdin.once('data', function(key) {
            resolve(key);
        })
    })
}
function up(n = 1) {
    stdout.write('\033['+ n +'A');
}

function down(n = 1) {
    stdout.write('\033['+ n +'B');
}

function right(n = 1) {
    stdout.write('\033['+ n +'C');
}

function left(n = 1) {
    stdout.write('\033['+ n +'D');
}

void async function() {
    stdout.write('which framework do you want to use?\n');
    let answer = await select(["vue","react","angular"]);
    stdout.write('You selected ' + answer + "\n");
    process.exit();
}()

async function select (choices) {
    let selected = 0;
    for (let i = 0; i < choices.length; i++) {
        let choice = choices[i];
        if (i === selected) {
            stdout.write("[x] "+choice + "\n");
        } else {
            stdout.write("[ ] "+choice + "\n");
        }
    }
    up(choices.length);
    right();
    while(true) {
        let char = await getChar();
        if (char === "\u0003"){
            process.exit();
            break;
        }
        if(char === "w" && selected > 0) {
            stdout.write(" ")
            left();
            selected--;
            up();
            stdout.write("x");
            left();
        }
        if(char === "s" && selected < choices.length -1) {
            stdout.write(" ")
            left();
            selected ++;
            down();
            stdout.write("x");
            left();
        }
        if (char === "\r") {
            down(choices.length - selected);
            left();
            return choices[selected];
        }
        // console.log(char.split('').map(c => c.charCodeAt(0)));
    }
   
}
```