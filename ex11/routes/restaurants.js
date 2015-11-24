'use strict';
let express = require('express');
let router = express.Router();

let restaurantModel = require(`${process.cwd()}/models/restaurants`)();

router.get('/', function(req,res){
  // res.send("You are in the route /api/restaurants");
  restaurantModel.getAll(function(err,data){
    if(err) throw err;
    res.json(data);
  });
});

router.get('/:id', function(req,res){
  let id = req.params.id;
  restaurantModel.getOne(id, function(err,data){
    if(err) throw err;
    res.json(data);
  });
});

router.get('/:field/:searchValue', function(req,res){
  let field = req.params.field;
  let searchValue = req.params.searchValue;
  restaurantModel.getByName(field,searchValue, function(err,data){
    if(err) throw err;
    res.json(data);
  });
});

module.exports = router;
