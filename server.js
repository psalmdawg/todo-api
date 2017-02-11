var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore')

var PORT = process.env.PORT || 3000;
var app = express();
var todos = [];
var nextTodoId = 1;

app.use(bodyParser.json());


app.get('/todos', function(req, res){
    res.json(todos)
})

app.get('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id, 10)
  var matchedTodo =_.findWhere(todos, {id:todoId})

  if(matchedTodo){
    res.json(matchedTodo)
  } else {
    res.status(404).send();
  }

})

app.get('/', function(req, res){
  res.send('Todo API root')
})

app.post('/todos', function(req, res){
  //sanitises the data. using underscore. to select only the inputs to the database that you want
  //this is underscore. its filters the request body, and only selects the value properites associated with the two set . description, completed
	var body = _.pick(req.body, 'description', 'completed');

  if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
  return res.status(400).send();
  }
  body.description = body.description.trim();
  body.id = nextTodoId++;

  console.log(body)

  todos.push(body)
  console.log('description: ' + body.description)
  res.json(body)
})

app.listen(PORT, function(){
  console.log("listening on port " + PORT + "!")
});
