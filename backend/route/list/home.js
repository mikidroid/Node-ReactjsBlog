const h = "droid"
const express = require('express')
const app = express()
// Used to parse JSON bodies


exports.index = (app)=>{
 
  app.get('/',(req,res)=>{
   res.send({da:'heyy baba '+ _root+'/backend'})
  });

app.post('/droid2',(req,res)=>{
 console.log(req.body.name)
   res.send({da:'Your name is is '+ req.body.name})
  });
}