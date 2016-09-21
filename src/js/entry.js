require("../css/style.css")
document.write('It works.' + '<br/>')
var Person = require('./module.js')
document.write(Person.person('jone', 30, 'teacher'));

var img = document.createElement('img');
img.src = require('../img/pic.png');
document.body.appendChild(img);