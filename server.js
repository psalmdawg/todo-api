var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todoNextId = 1;
var bodyParser = require('body-parser');
var todos = [];
var nextTodoId = 1;

app.use(bodyParser.json());



app.get('/todos', function(req, res){
    res.json(todos)
})

app.get('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id)
  var matchedTodo;

  todos.forEach(function(todo){
    if(todoId === todo.id ){
      matchedTodo = todo;
    }
  });

  if(matchedTodo){
    res.json(matchedTodo)
  } else {
    res.status(404).send();
  }

})

app.get('/', function(req, res){
  res.send('Todo api Root')
})

app.post('/todos', function(req, res){
  var body = req.body;
  body.id = nextTodoId++;

   console.log(body)

  todos.push(body)
  console.log('description: ' + body.description)
  res.json(body)
})

app.listen(PORT, function(){
  console.log("listening on port " + PORT + "!")
});
