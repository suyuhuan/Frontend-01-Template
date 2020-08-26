# 每周总结可以写在这里

PhantomJS 无头浏览器
https://phantomjs.org/download

eslint

which node
open node路径
phantomjs --version


授权 OAuth [https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/]

GitHub的设置路径
Settings 设置 \Developer settings 开发人员设置 \GitHub Apps 应用程序\ myToy-publish


第一步 用url参数 去拿code（publish-tool唤起浏览器）
https://github.com/login/oauth/authorize?client_id=Iv1.7cb61f0d2e06d685&redirect_uri=http%3A%2F%2Flocalhost%3A8080&scope=read%3Auser&state=123abc


第二步 用code 去拿token（publish-server服务器）
{
let code = "78bb9fc7173a17345392";
let state = "123abc"
let client_secret = "968bb836423158af9d165495c0dd6bf2d5382294";
let client_id = "Iv1.7cb61f0d2e06d685";
let redirect_uri = encodeURIComponent("http://localhost:8080");

let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`

let xhr = new XMLHttpRequest;
xhr.open("POST",`https://github.com/login/oauth/access_token?${params}`,true)
xhr.send(null);

xhr.addEventListener("readystatechange",function(event){
    if (xhr.readyState === 4) {
        console.log(xhr.responseText);
    }
});
}


第三步 用token 去拿用户信息(publish-tool/publish-server)
token = d03588c9e6516d48e3e28e9e41a3fdaf9b9b7ac2
{
    let xhr = new XMLHttpRequest;
    xhr.open("GET",`https://api.github.com/user`,true)
    xhr.setRequestHeader("Authorization","token:d03588c9e6516d48e3e28e9e41a3fdaf9b9b7ac2");
    xhr.send(null);

    xhr.addEventListener("readystatechange",function(event){
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
        }
    });
}

