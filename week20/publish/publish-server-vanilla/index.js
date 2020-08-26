// Create an HTTP tunneling proxy
const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');
const https = require('https');

const server = http.createServer((req, res) => {
    // let matched = req.url.match(/filename=([^&]+)/);
    // let filename = matched && matched[1];
    // console.log(filename);
    // if (!filename)
    //     return;
    // let writeStream = fs.createWriteStream('../server/public/' + filename);
    // req.pipe(writeStream);
    // res.on('end', () => {
    //     res.writeHead(200, { 'Content-Type': 'text/plain' });
    //     res.end('okay');
    // })
  
    if (req.url.match(/^\/auth/)) {
        return auth(req, res);
    }
    if (!req.url.match(/^\/?/)) {
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end('not found');
        return;
    }
    req.headers.token 
    const options = {
        hostname: 'api.github.com',
        port:443,
        path:`/user`,
        method:'GET',
        headers:{
            Authorization:"token " + req.headers.token,
            "User-Agent":"toy-publish-server"
        }
    };
    const request = https.request(options, (response) => {
        // console.log('startusCode:', response.statusCode);
        // console.log('headers:', response.headers);
        let body = ""
        response.on('data', (d) => {
           body += d.toString()
        })
        response.on('end', () => {
            console.log(body);
            let user = JSON.parse(body);
            console.log(user);
            //权限检查
         })
       })
        request.on('error', (e) => {
            console.error(e)
        })
        request.end();


    let writeStream = unzip.Extract({path:'../server/public'});
    // req.pipe(writeStream);
    req.on('data', trunk => {
        writeStream.write(trunk);
    })
    req.on('end', trunk => {
        writeStream.end(trunk);
    })
    res.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('okay');
    })

   
});

function auth(req, res) {

    let code = req.url.match(/code=([^&]+)/)[1];
    let state = "123abc"
    let client_secret = "968bb836423158af9d165495c0dd6bf2d5382294";
    let client_id = "Iv1.7cb61f0d2e06d685";
    let redirect_uri = encodeURIComponent("http://localhost:8081/auth");

    let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`
    let url = `https://github.com/login/oauth/access_token?${params}`;

    const options = {
        hostname: 'github.com',
        port:443,
        path:`/login/oauth/access_token?${params}`,
        method:'POST'
    }

    const request = https.request(options, (response) => {
        // console.log('startusCode:', response.statusCode);
        // console.log('headers:', response.headers);

        response.on('data', (d) => {
            // process.stdout.write(d);
            let result = d.toString().match(/access_token=([^&]+)/);
            if (result) {
                let token = result[1];
                console.log(token);
                res.writeHead(200, { 
                    'access_token': token,
                    'Content-Type': 'text/plain' 
                });
                res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`);
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end('error');
            }
        })
       })
        request.on('error', (e) => {
            console.error(e)
        })
        request.end();
   
}


server.listen(8081);