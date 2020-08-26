const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process')

const postData = querystring.stringify({
    'content': 'Hello World!202020'
});

const path = require('path');
const { Server } = require('tls');
let public_path = path.resolve(__dirname, './');
// let public_path = '';

let filename = public_path + '/cat.jpg';


let packname = './package';

//fs.stat(filename, (error, stats) => {
    // console.log(stats);
    // console.log(error);
    const options = {
        host: 'localhost',
        port: 8081,
        method: 'POST',
        // path: '/?filename=cat.jpg',
        path:'/?filename=' + 'package.zip',
        headers: {
            'Content-Type': 'application/octet-stream',
            // 'Content-Length': stats.size
            // 'Content-Length': 0
        }
    };
    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    var archive = archiver('zip', {
        zlib: {level: 9}
    });

    archive.directory(packname,false);

    // archive.pipe(fs.createWriteStream("./package.zip"));

    // archive.on('end',() => {
    //     console.log('end');
    // })

    archive.finalize();

    archive.pipe(req);

    archive.on('end', () => {
        req.end();
        console.log("publish success!!")
        res.on('end', () => {
            server.close();
        })
       // let redirect_uri = encodeURIComponent("http://localhost:8081/auth") //8081
       // child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.7cb61f0d2e06d685&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`)
    })

    // Write data to request body
    // let rs = fs.createReadStream(filename);
    // rs.pipe(req);
    // rs.on('end', () => {
    //     req.end();
    // })
//})