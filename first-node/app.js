// function sayHello(name){
//      console.log('Hello ' + name);
// }
//
// sayHello("Keith");

// const Logger = require('./logger');
// const logger = new Logger();
// logger.on("messageLogged", (args) => {
//     console.log(`works id:${args.id} url:${args.url}`);
// })
// logger.log("Cartoon");

const http = require('http');
const server = http.createServer((req, res) =>{
    if(req.url === "/"){
        res.write("Hello World");
        res.end();
    }
    if(req.url === "/api/courses"){
        res.write(JSON.stringify([{id:1, name:"Keith", lol:"lol"},{id:2, name:"Mzaza", lol:"lol"}]));
        res.end();
    }
});
server.listen('3000');
console.log("listening on port 3000...")


