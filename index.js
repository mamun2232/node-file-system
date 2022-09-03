const express = require('express');
const app = express()
const port = process.env.PORT || 5000
const randomUserRoute = require('./Router/randomUserRoute')
app.use(express.json())
app.use('/user', randomUserRoute)

app.use('/' , (req , res)=>{
      res.send("hellw worlds")
})

app.listen(port , () =>{
      console.log('server start' , port)
})