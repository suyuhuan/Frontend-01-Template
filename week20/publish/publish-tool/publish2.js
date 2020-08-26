const http = require('http');
const child_process = require('child_process')



let redirect_uri = encodeURIComponent("http://localhost:8081/auth") //8081
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.7cb61f0d2e06d685&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`)

const server = http.createServer((request, res) => {
    console.log(request.url);
    let token = request.url.match(/token=([^&]+)/)[1];
    console.log('real publish!!');
    const options = {
        host:'localhost',
        port:8081,
        path:'/?filename=' + 'package.zip',
        method: 'POST',
        headers: {
            'token':token,
            'Content-type': 'application/octet-stream'
        }
    }
    const request = https.request(options, (response) => {
        // console.log('startusCode:', response.statusCode);
        // console.log('headers:', response.headers);

        response.on('data', (d) => {
            // process.stdout.write(d);
        })
       })
        request.on('error', (e) => {
            console.error(e)
        })
        request.end();
})

server.listen(8080);