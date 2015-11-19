var name = 'gilles';
console.log(name);
function sayHello(){
  return "Hello";
}

var sayHello = function(){
  return "Hello";
}

var o ={};
o.age = 42;
o.ditBonjour = function(msg){
  return "bonjour" +msg;
}
console.log(o.age);
console.log(o.ditBonjour('technocite'));
console.log(process.argv);
