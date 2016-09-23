var express = require('express');
var app = express();
var json = require('express-json');

const DOGS = [
  {
    id: 1,
    name: "Boira",
    age: 6,
    friends: [2]
  },
  {
    id: 2,
    name: "Nona",
    age: 10,
    friends: []
  },
  {
    id: 3,
    name: "Sot",
    age: 7,
    friends: [1,2]
  }
];

app.use(json());

app.get('/dogs', function (req, res) {
  let ids = req.query.ids;
  let dogs = DOGS;

  if (ids !== 'undefined') {
    idgs = ids.split(',').map(i => parseInt(i, 10));
    dogs = dogs.filter(dog => ids.includes(dog.id));
  }

  res.send({ dogs });
});

app.get('/dogs/:id/friends', function (req, res) {
  let dog = DOGS.find(dog => dog.id === parseInt(req.params.id, 10));
  let { friends } = dog;

  res.send({ dogs: DOGS.filter(dog => friends.includes(dog.id)) });
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});