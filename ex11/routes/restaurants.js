'use strict';
let express = require('express');
let router = express.Router();

let restaurantModel = require(`${process.cwd()}/models/restaurants`)();

router.get('/', function(req,res){
  // res.send("You are in the route /api/restaurants");
  restaurantModel.getAll(function(err,data){
    if(err) res.json(err.message);
    res.json(data);
  });
});

router.get('/:id', function(req,res){
  let id = req.params.id;
  restaurantModel.getOne(id, function(err,data){
    if(err) res.json(err.message);
    res.json(data);
  });
});

router.get('/:field/:searchValue', function(req,res){
  let field = req.params.field;
  let searchValue = req.params.searchValue;
  restaurantModel.getBySpecifiedField(field,searchValue, function(err,data){
    if(err) res.json(err.message);
    res.json(data);
  });
});

router.post('/', function(req,res){
  let ob = req.body;
  restaurantModel.setRestaurant(ob, function(err) {
    if(err) res.json(err.message);
    res.json({"message":"insertion was a success"});
  });
});

router.delete('/', function(req,res){
  let id = req.params.id;
  restaurantModel.deleteRestaurant(id, function(err){
    if(err) res.json(err.message);
    res.json({"message":"you have delete successfully"});
  });
});



module.exports = router;
