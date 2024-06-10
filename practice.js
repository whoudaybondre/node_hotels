// function add(a, b) {
//     return a + b;
// }

// var add = function(a, b) {
//     return a + b;
// }

// var add = (a, b) => { return a + b; }

// var add = (a, b) => a + b;



// var result = add(2, 5);
// console.log(result);

// (function() {
//     console.log("my name is uday");
// })();

// function callback() {
//     console.log("running call back function")
// };

// const add = function(a, b, callback) {
//     var result = a + b;
//     console.log('result: ' + result);
//     callback();
// };

// add(5, 5, callback);

// add(1, 2, () => console.log("call back function running"));

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt', 'hi' + user.username + '!\n', () => console.log("file is created"));
// var _ = require('lodash');


// const notes = require('./notes.js');
// var age = notes.age;
// var result = notes.add(2, 4);
// console.log(age);
// console.log(result);

// var data = ["uday", "uday", "bondre", 1, 1, 1, 2, 2, 2, 3, 3, 3];
// var filter = _.uniq(data);
// console.log(filter);


// app.get('/uday', function(req, res) {
//     var person = {
//         name: "uday",
//         surname: "bondre",
//         age: 21
//     };
//     res.send(person)
// })

// app.post('/person', function(req, res) {
//     res.send('data is saved');
// })