'use strict';
let fs = require('fs');
let _ = require('lodash');
function friends(cb){
  //API Privée
  //init data
  let friends = null;
  fs.readFile('datas/datas.json',function(err,data){
    if (err) throw err;
    friends = JSON.parse(data.toString('utf8')).friends;
    cb();
  });

  function persistData(){
    let dataOut = JSON.stringify({"friends": friends});
    fs.writeFile('datas/datas.json',dataOut, function(err){
      if(err) throw err;
      console.log("data well saved");
    });
  };

  function getAllFriends(){
    return (friends);
  };

  function getFriends(id){
    return(_.find(friends, {"id":id}));
  };

  function setFriend(ob){
    if(!ob.id){
      let maxId = _.max(friends, 'id').id;
      let currentId = maxId += 1;
      ob.id = currentId;
      friends.push(ob);
      // console.log(friends);
    }else{
      let index = _.findIndex(friends,{"id":parseInt(ob.id)});
      if(index !== -1){
        friends[index] = ob;
      }else{
        console.log({"error":"no index was find"});
      };
    };
    persistData();
    return friends;
  };

  function deleteFriend(id){
    let index = _.findIndex(friends,{"id":parseInt(id)});
    if(index !== -1){
      _.pullAt(friends,index)
    }else{
      console.log({"error":"no index was find"});
    };
    persistData();
    return friends;
  }


  //API Publique
  let that = {};
  that.getFriends = getFriends;
  that.getAllFriends = getAllFriends;
  that.setFriend = setFriend;
  that.deleteFriend = deleteFriend;
  return that;
};

module.exports = friends;
