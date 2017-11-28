var express = require('express');
var http = require('http');
var app = express();

http.createServer(app).listen(3000);

app.get('*',function(req,res){
    res.redirect(301,"https://www.sfriend.ru:3001");
});
