## Loader
1. webpack配置

   ```
   {
      test: /\.view$/,
      loader: require.resolve("./myloader.js"),
   },
   ```

2. 编写loader逻辑

   ```
   module.exports = function (source, map) {
   // source是编写的源代码字符串，处理成自己需要的结果
   }
   ```

### 定义： 
loader只是一个导出为函数的JavaScript模块。
```
module.exports = (source)=>{
    return source
}
```

### 作用：
通过转化所有类型的文件，让webpack能处理非js文件，如图片，字体文件，css脚本等。

### 执行顺序：
多个loader串行执行，从右到左,因为采取的是Compose的函数组合方式.
```
compose = (f,g)=>(...args)=>f(g(...args))
```

### loader-runner
允许在不安装webpack的情况下，运行loaders  
1. 作为webpack的依赖，webpack中使用它执行loader。
2. 进行loader的开发和调试。 
```
import {runLoaders} from 'loader-runner'
runLoaders({
    //资源的绝对路径，可以增加查询字符串
    resource:"/path/file.txt?query", 
    //loader的绝对路径，可以增加查询字符串
    loaders:[   
        "/path/loader.js?query"
    ],
    //基础上下文之外的额外loader上下文
    context:{            
        minimize:true
    },
    //读取资源的函数
    readResource:fs.readFile.bind(fs)  
},function(err,result){
    //err:Error
    //result.result:Buffer|String
})
```

#### loader-utils参数的获取
```
import {getOptions} from 'loader-utils'
export default function(){
    const {name} = getOptions(this);
}
```

### 2. 动画

1. 定义Animate和Timeline

   ```
   class Timeline {
   	constructor(){}
   	tick(){}
   	pause() {}
   	resume(){}
   	start()
   	add()
   	restart()
   }
   class Anamation() {
   	constructor(){}
   	valueFromProgression(){}
   }
   ```

   