//version 1 : sans le fichier friends.js

// var fs = require('fs');
// var moment = require('moment');
// var express = require('express');
// var app = express();
// var _ = require('lodash');
//
//
// app.get('/api/friends', function(req, res){
//   fs.readFile('datas/datas.json',function(err,data){
//     if (err) throw err;
//     res.json(JSON.parse(data.toString('utf8')));
//   });
// });
//
// app.get('/api/friends/:id', function(req, res){
//   var id = parseInt(req.params.id);
//   // res.send(`The id is ${req.params.id}`);
//   fs.readFile('datas/datas.json',function(err,data){
//     if (err) throw err;
//     var friends = JSON.parse(data.toString('utf8')).friends;
//     console.log(_.find(friends,{'id':id}));
//     res.json(_.find(friends,{'id':id}));
//   });
// });
//
// app.use(function(req, res, next) {
//   console.log(moment().format()+'||'+req.url+'||'+req.method);
//   next();
// });
//
// app.use(function(req, res) {
//   res.status(404);
//   res.send('You have enter an url (' + req.url + '). It doesn\'t exist.');
// });
//
// app.listen(3000,function(){
//   console.log('Express started on localhost:3000 \n Press CTRL+c to terminate');
// });

//version 2 : avec le fichier friends.js
'use strict';
let moment = require('moment');
let http = require('http');
let express = require('express');
var bodyParser = require('body-parser');
let friends = require(__dirname+'/modules/friends.js');
let myFriends = friends(initApp);

function initApp(){
  let app = express();

  app.use(bodyParser.json());

  app.use(function(req,res,next){
    console.log(moment().format()+'||'+req.url+'||'+req.method+'||'+req.ip);
    next();
  });

  app.get('/api/friends', function(req,res){
    res.json(myFriends.getAllFriends());
  });

  app.get('/api/friends/:id', function(req,res){
    let id = parseInt(req.params.id);
    res.json(myFriends.getFriends(id));
  });

  app.post('/api/friends', function(req,res){
    console.log(req.body);
    res.json({"result":myFriends.setFriend(req.body)});
  });

  app.put('/api/friends', function(req,res){
    res.json({"result":myFriends.setFriend(req.body)});
  });

  app.delete('/api/friends/:id', function(req,res){
    let id = parseInt(req.params.id);
    res.json(myFriends.deleteFriend(id));
    res.send('DELETE request to homepage');
  });

  app.use(function(req,res){
    res.status(404);
    res.send("The page "+req.url+" don\'t exist");
  });

http.createServer(app).listen(80, function(){
  console.log("Express started on localhost: 80 \n Press CTRL+c to terminate");
});

}
