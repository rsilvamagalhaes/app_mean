//Setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var db = mongoose.connection;

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev'));
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.methodOverride());
});

app.listen(8080);
console.log("App ouvindo na porta 8080");

var Todo = mongoose.model('Todo', {
  text : String
});

mongoose.connect('mongodb://localhost/test');

//routes API
app.get('/api/todos', function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      res.send(err);
    }
    res.json(todos);
  });
});


app.post('/api/todos', function(req, res) {
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
    if (err) { 
      res.send(err);
    }

    Todo.find(function(err, todos){
      if (err) {
        res.send(err);
      }
      res.json(todos);
    });
  });
});


app.delete('/api/todos/:todo_id', function(req, res){
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo) {
    if (err) {
      res.send(err);
    }
    Todo.find(function(err, todos) {
      if (err) {
        res.send(err);
      }
      res.json(todos);
    });
  });
});



