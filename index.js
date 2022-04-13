const express = require('express')
const bodyParser = require('body-parser')

const todosRouter = require('./todos.routes')

const port = 3000

const app = express()

const logPath  = (req, _res, next) => {
  console.log(`Starting ${req.method} ${req.originalUrl}`)
  console.log('with params :', req.body)
  next()
}

app.use(bodyParser.json())
app.use(logPath)
app.use('/todos', todosRouter)


app.get('/', (req, res) => {
  res.json({ message: `Hello ${req.query?.name || 'Kinoba'}!` })
})

app.get('/hello/:name', (req, res) => {
  res.json({ message: `Hello ${req.params.name}!` })
})


app.listen(port, () => {
  console.log(`Demo Express app listening on port ${port}`)
})