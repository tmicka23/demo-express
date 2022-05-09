const express = require('express')
const app = express()
const port = 3000

app.get('/', (_, res) => {
  res.send('Hello Kinoba!')
})

app.listen(port, () => {
  console.log(`Demo Express app listening on port ${port}`)
})