var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
  id : 1,
  description : "meet JuliLamb and take her for dinner",
  completed : false
}, {
  id : 2,
  description : "get out of bed",
  completed : false
}, {
  id : 3,
  description : "get out of bed",
  completed : true
}]

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

app.listen(PORT, function(){
  console.log("listening on port " + PORT + "!")
});
