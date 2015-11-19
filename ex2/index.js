// var a = require("nom du module");

var fs = require("fs");
// fs.readFile('fake.txt', function (err, data) {
//   if (err) throw err;
//   // throw permet d'envoyer une erreur dans la fenêtre de commande et d'arreter la suite de la lecture
//   console.log(data.toString());
// });
// // .toString permet de transformer le code binaire qui provient de data en string

fs.readFile('fake.txt', function (err, data) {
  if (err) throw err;
  var inData = data.toString();
  var array = inData.split("\n");
  var lineCount = array.length;
  console.log(lineCount);
});
