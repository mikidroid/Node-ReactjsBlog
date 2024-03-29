
const express = require('express')
const app = express()
const path = require('path')
const port = 3500
const dotenv = require('dotenv').config()
global._root= __dirname;
global._base= __dirname+'/backend';
const route = require('./backend/route/index')

//http server...  these will help socket
const Http = require("http").createServer(app)

//const io = require("socket.io")(Http)
global.io = require("socket.io")(Http,{
  cors:{
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST"]
  }
});


io.on('connection', (soc) => {
  
});



// Used to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/*For loading server files in client browser
backend/files becomes the root of the node server files*/
var dir = path.join(__dirname, 'backend/files');
app.use(express.static(dir));

//App listener using the httpServer created with express's app instance
Http.listen(port,(req,res)=>{
  console.log("App running on port: "+process.env.PORT)
})

//Cross-origin setting
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
   //update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
  next();
});

//All my Apis
route(app,io)


