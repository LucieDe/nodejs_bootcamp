'use strict'
let fs = require('fs');
let express = require('express');
let http = require('http');
let morgan = require('morgan');

// let mongojs = require('mongojs');
// let db = mongojs("restaurants", ["restaurants"]);

//Routes
let restaurants = require(`${__dirname}/routes/restaurants`);

let app = express();
//logger in place
let accessLogStream = fs.createWriteStream(`${__dirname}/log/access.log`,{flags:'a'});
app.use(morgan('combined',{stream:accessLogStream}));

//use static assets
app.use(express.static(`${__dirname}/public`));

//set app routes as middlewares
app.use('/api/restaurants', restaurants);

// app.get('/api/restaurants', function(req,res){
//   db.restaurants.find(function(err,docs){
//     if(err) throw err;
//     res.json(docs);
//   });
// });
//
// app.get('/api/restaurants/:id', function(req,res){
//   db.restaurants.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,docs){
//     if(err) throw err;
//     res.json(docs);
//   });
// });


http.createServer(app).listen(80, function(){
  console.log("Express started on localhost: 80 \n Press CTRL+c to terminate");
});
