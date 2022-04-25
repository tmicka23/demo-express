const express = require('express')
const bodyParser = require('body-parser')

const port = 3000

const app = express()

app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.json({ message: `Hello ${req.query?.name || 'Kinoba'}!` })
})

app.get('/hello/:name', (req, res) => {
  res.json({ message: `Hello ${req.params.name}!` })
})

let todos = [
  {
    id: 1,
    text: 'Create a course for learn NodeJs',
    done: true
  }
]

app.get('/todos', (_, res) => {
  res.json(todos)
})

app.get('/todos/:id', (req, res) => {
  const todo = todos.find((item) => item.id === parseInt(req.params.id))
  if (todo) {
    res.json(todo)
  } else {
    res.sendStatus(404)
  }
})

app.post('/todos', (req, res) => {
  const lastTodo = todos[todos.length - 1]
  const newTodo = {id: lastTodo.id + 1,...req.body}
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

app.put('/todos/:id', (req, res) => {
  let todoIndex = todos.findIndex((item) => item.id === parseInt(req.params.id))
  if (todoIndex >= 0) {
    todos[todoIndex] = {...todos[todoIndex], ...req.body}
    res.json(todos[todoIndex])
  } else {
    res.sendStatus(404)
  }
})

app.delete('/todos/:id', (req, res) => {
  const todo = todos.find((item) => item.id === parseInt(req.params.id))
  if (todo) {
    todos = todos.filter((item) => item.id !== todo.id)
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})

app.listen(port, () => {
  console.log(`Demo Express app listening on port ${port}`)
})