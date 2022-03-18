const express = require('express')
const app = express()
const path = require('path')
const port = 3500
const dotenv = require('dotenv').config()
global._root= __dirname;
const route = require('./backend/route/index')
//const bp = require('body-parser')

// Used to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/*For loading server files in client browser
backend/files becomes the root of the node server files*/
var dir = path.join(__dirname, 'backend/files');
app.use(express.static(dir));

//App listener
app.listen(port,(req,res)=>{
  console.log("App running on port: "+process.env.PORT)
})

//Cross-origin setting
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
   //update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//All my Apis
route.index(app)


