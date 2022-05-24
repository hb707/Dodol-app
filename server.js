const express = require('express')
const axios = require('axios')
const app = express()

const REST_API_KEY = '07e2741dea7ed6e8b2ba90e09024f231';
const REDIRECT_URI = 'http://localhost:3001'

app.get('/', async (req, res) => {
  res.send('home')
})

app.get('/oauth/kakao',(req,res)=>{
  res.send('kakao')
})
app.listen(3001,()=>{
  console.log('server running on localhost 3001')
})