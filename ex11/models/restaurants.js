'use strict';

let mongoose = require('mongoose');

function Restaurants(){
  let dbURI = 'mongodb://localhost/restaurants';
  mongoose.connect(dbURI);

  let restaurantSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      street: String,
      number: Number,
      city: String,
      zip: String
    },
    phone: {
      type: String,
      required: true
    },
    web: {
      type: String,
      required:true
    },
    type: {
      type: Array,
      required: true
    },
    rating: {
      type: Number,
      required: false
    },
    createAt: {
      type: Date,
      default: Date.now
    }
  });
  let restaurant = mongoose.model('Restaurant', restaurantSchema);

  function getAll(next) {
    restaurant.find(null, function(err,data) {
      next(err,data);
    }).sort([['name','ascending']]);
  };

  function getOne(id, next){
    restaurant.findById(id, function(err,data) {
      next(err, data);
    });
  };

  function getBySpecifiedField(field, searchValue, next){
    var query = {[field]:new RegExp(searchValue,"i")};
    restaurant.findOne(query, function(err,data) {
      next(err, data);
    });
  };


  function setRestaurant(ob, next){
    var resto = new restaurant(ob);
    if(!ob._id){
      resto.save(function(err, next){
        next(err);
      });
    }else{
      // restaurant.findOne({_id: ob._id}, function(err,doc){
      //   for (var elem in ob){
      //     doc[elem] = ob[elem];
      //   };
      //   doc.save(function(err){
      //     next(err);
      //   });
      // });
      restaurant.findByIdAndUpdate(ob._id, ob, function(err) {
        next(err);
      });
    };
  };

  function deleteRestaurant(id,next){
    if(ob){
      restaurant.remove({_id:id},function(err){
        next(err);
      });
    };
  };


  var that = {};
  that.getAll = getAll;
  that.getOne = getOne;
  that.getBySpecifiedField = getBySpecifiedField;
  that.setRestaurant = setRestaurant;
  that.deleteRestaurant = deleteRestaurant;
  return that;

}


module.exports = Restaurants;
