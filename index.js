const fs = require('fs')
const express = require('express')
const os = require("os");

const app = express()
const port = process.env.PORT || 80
const hostname = os.hostname();

const STATE_PATH = process.env.STATE_PATH || '/state/wat'

console.log({STATE_PATH})

app.get('/', (req, res) => {
  fs.readFile(STATE_PATH, 'utf8' , (err, state) => {
    if (err) {
      res
        .status(500)
        .send(err.toString())
      return
    }

    res.send({hostname, state})

  })
})

app.post('/', (req, res) => {
  const data = new Date().toUTCString()

  const state = `${hostname} - ${data}`

  fs.writeFile(STATE_PATH, state, 'utf8', (err) => {
    if (err) {
      res
        .status(500)
        .send(err.toString())
      return
    }

    res.end()
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
