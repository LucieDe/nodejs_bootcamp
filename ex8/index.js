var http = require('http');
var fs = require('fs');

var port = process.argv[2] || 3000;
var routes = {
  "/api/friends":"datas/datas.json"
}

var srv = http.createServer(function (req, res) {
  console.log(req.url);
  if (routes[req.url]) {
    console.log("ok");
    res.writeHead(200, {'Content-Type': 'text/json'});

    var routeFiles = routes[req.url];
    fs.readFile(routeFiles,function(err,data){
      if (err) throw err;
      res.end(data);
    })
  //  res.end(routes[req.url]);
  }else{
    res.writeHead(404);
    res.end('The url : ' + req.url + ' don\'t exist');
  };

  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.end('Hello world it is now '+ new Date());

});

srv.listen(3000, function(err) {
  console.log('Server is now listening on port 3000');
});
// taper ensuite dans le navigateur localhost:3000 pour faire apparraitre ce qu'on veux
