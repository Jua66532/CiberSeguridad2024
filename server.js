const express = require('express')
const app = express()

app.get('/', function (req, res) 
{
    //res.send(Hello world)
  res.sendFile(__dirname + "/index.html");
})


app.listen(3000)