var fs = require('fs');
var moment = require('moment');
var express = require('express');
var app = express();


app.get('/api/friends', function(req, res){
  fs.readFile('datas/datas.json',function(err,data){
    if (err) throw err;
    res.json(JSON.parse(data.toString('utf8')));
  })
});

app.use(function(req, res, next) {
  console.log(moment().format()+'||'+req.url+'||'+req.method);
  next();
});

app.use(function(req, res) {
  res.status(404);
  res.send('You have enter an url (' + req.url + '). It doesn\'t exist.');
});

app.listen(3000,function(){
  console.log('Express started on localhost:3000 \n Press CTRL+c to terminate')
});
