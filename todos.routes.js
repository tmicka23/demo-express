const express = require('express')
const router = express.Router()
const { difference, keys } = require('lodash')

let todos = [
  {
    id: 1,
    text: 'Create a course for learn NodeJs',
    done: true
  }
]

const permittedParams = (req, _res, next) => {
  const permittedKeys = ['text', 'done']
  const unpermittedKeys = difference(keys(req.body), permittedKeys)
  if (unpermittedKeys) {
    console.log('unpermitted params :', unpermittedKeys)
    unpermittedKeys.forEach((key) => delete req.body[key])
  }
  next()
}

const todoRequestSeparator = (_req, _res, next) => {
  console.log('------------------------------------------------------------------')
  next()
}

router.use(todoRequestSeparator)

router.get('/', (_, res) => {
  res.json(todos)
})

router.get('/:id', (req, res) => {
  const todo = todos.find((item) => item.id === parseInt(req.params.id))
  if (todo) {
    res.json(todo)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', permittedParams, (req, res) => {
  const lastTodo = todos[todos.length - 1]
  const newTodo = {id: lastTodo.id + 1,...req.body}
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

router.put('/:id', permittedParams, (req, res) => {
  let todoIndex = todos.findIndex((item) => item.id === parseInt(req.params.id))
  if (todoIndex >= 0) {
    todos[todoIndex] = {...todos[todoIndex], ...req.body}
    res.json(todos[todoIndex])
  } else {
    res.sendStatus(404)
  }
})

router.delete('/:id', (req, res) => {
  const todo = todos.find((item) => item.id === parseInt(req.params.id))
  if (todo) {
    todos = todos.filter((item) => item.id !== todo.id)
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})

module.exports = router