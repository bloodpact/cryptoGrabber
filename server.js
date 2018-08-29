const path = require('path');
const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');
const url = 'https://coinmarketcap.com/all/views/all/';

// const osmosis = require('osmosis');
const publicPath = path.join(__dirname, '../');
app.use(express.static(publicPath));
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
const port = process.env.port || 3333;
app.listen(port, () =>{
    console.log(`server on ${port} is up`)
});