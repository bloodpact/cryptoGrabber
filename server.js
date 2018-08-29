const path = require('path');
const express = require('express');
const http =require('http');

const request = require('request');
const cheerio = require('cheerio');
const socketIO = require('socket.io')
const url = 'https://coinmarketcap.com/';
const app = express();
const server = http.createServer(app);
const publicPath = path.join(__dirname, '/public');
const port = process.env.port || 3333;

app.use(express.static(publicPath));

let io = socketIO(server);
io.on('connection', (socket)=>{
    socket.emit('cryptAsk')
})

let startScript = Date.now();
request(url, (err, reponse, html)=>{
    if(!err){
        let  $ = cheerio.load(html);
        let items = [{}];
        let allIems = $("tbody").children();
        allIems.each((index)=>{
            items.push({'currency':$("tbody").children().eq(index).children().eq(1).find("a.currency-name-container").text(),
                    'price':$("tbody").children().eq(index).children().eq(4).find("a.price").text()})
        });
        console.log(items);
        let endScript= Date.now();
        let result = endScript - startScript;
        console.log(`время выполнения ${result} ms`);
    }
});
server.listen(port, () =>{
    console.log(`server on ${port} is up`)
});