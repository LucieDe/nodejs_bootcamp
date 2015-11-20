var http = require("http");
var cheerio = require('cheerio');

http.get("http://www.triptyk.eu", function(res) {
  console.log("Got response: " + res.statusCode);
  res.setEncoding('utf8');
  res.on('data',function(data){
    var $ = cheerio.load(data);
    //console.log(data);
    console.log("----------------------------------------------------------------------");
    $('a').each(function(i,element){
      console.log(element.attribs.href);
    });
    console.log("----------------------------------------------------------------------");
  });

  res.on('error', function(e) {
    console.log("Got error: " + e.message);
  });
});
