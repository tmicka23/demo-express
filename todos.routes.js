const express = require('express')
const router = express.Router()
const { difference, keys } = require('lodash')

const Todo = require('./todo.model')

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

router.get('/', async (_, res) => {
  const todos = await Todo.findAll()
  res.json(todos)
})

router.get('/:id', async (req, res) => {
  const todo = await Todo.findOne(req.params.id)
  if (todo) {
    res.json(todo)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', permittedParams, async (req, res) => {
  const todo = await Todo.create(req.body)
  res.status(201).json(todo)
})

router.put('/:id', permittedParams, async (req, res) => {
  const todo = await Todo.update(req.params.id, req.body)
  res.json(todo)
})

router.delete('/:id', async (req, res) => {
  await Todo.delete(req.params.id)
  res.sendStatus(204)
})

module.exports = router