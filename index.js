const express = require('express')
const bodyParser = require('body-parser')

const todosRouter = require('./todos.routes')

const port = 3000

const app = express()

app.use(bodyParser.json())
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