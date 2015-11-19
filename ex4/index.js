var fs = require("fs");

//fs.readdir('../', function (err, files) {
  //if (err) throw err;
  //fs.writeFile('files.txt', createNiceListOfFiles(files), function (err, data) {
    //if (err) throw err;
    //console.log('great');
  //});
//});

//function createNiceListOfFiles(arrFiles){
//  return arrFiles.join('\n');
//};


//avec module
var utils = require("../modules/utils");

fs.readdir('../', function (err, files) {
  if (err) throw err;
  fs.writeFile('files.txt', utils.createNiceListOfFiles(files), function (err, data) {
    if (err) throw err;
    console.log('great');
  });
});
