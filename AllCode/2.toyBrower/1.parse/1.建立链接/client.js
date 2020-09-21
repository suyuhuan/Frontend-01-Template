const net = require("net");

class Request{

    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};

        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if (this.headers["Content-Type"] === "application/json") {
            this.bodyText  = JSON.stringify(this.body);
        } else if (this.headers["Content-Type"].includes('application/x-www-form-urlencoded')) {
            this.bodyText = Object.keys(this.body).map(key => `${key} = ${encodeURIComponent(this.body[key])}`).join('&');
        }

        this.headers["Content-Length"] = this.bodyText.length;
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key} : ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`;
   }

    send(connection) {
        return new Promise((resolve,reject) => {
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, ()=> {
                    connection.write(this.toString());
                })
            }

            connection.on('data',(data) => {
                resolve(data.toString())
                connection.end();
            });

            connection.on('error', (err)=> {
                reject(err);
                connection.end();
            })
        })
    }

}

class Response {

}
void async function() {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8080",
        path: "/",
        headers: {
         ['Content-Type']: 'application/x-www-form-urlencoded',
         ["X-Foo2"] : "customed"
        },
        body: {
          name:"suyuhuan"
        }
     })

     let response = await request.send();
     console.log(response);
}();

// const client = net.createConnection({
//   host:"127.0.0.1",
//   port:8080},()=>{
// console.log('connected to server!');

// client.write(`POST /HTTP/1.1\r
// Content-Type:application/x-www-form-urlencoded\r
// Content-Length:22\r
// \r
// name=suyuhuan`);
// });

// client.on('data', (data)=> {
//   console.log(data.toString());
//   client.end();
// });

// client.on('end', ()=> {
//   console.log('disconnected from server');
// })