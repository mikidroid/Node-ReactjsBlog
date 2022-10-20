//Auth Controller
let path = require('path')
const dotenv = require('dotenv').config()
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
//Models
const User = require('../model/user')
//++++++++++++++++++++++++++++++++++++

  //Login Function
  const Login = async (req,res)=>{
    //Make body shorter
    let r = req.body
    const user = await User.findOne({email:r.email})
    .exec((err,user)=>{
      if(!user){
        res.status(401)
        res.send({data:"No User!"})
      }
      //Compare passwords with bcrypt
      let comparePassword = bcrypt.compareSync(r.password,user.password)
      if(!comparePassword){
        return res.status(401).send("Incorrect password!")}
      //Create JWT token
      let token = JWT.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"2H"})
      return res.status(200).send({
            user:user,
            accessToken:token,
            isAdmin:user.isAdmin
      })
    })
  }
  //+++++++++++++++++++++++++++++++++++++++++
  
  //Register function 
  const Register = async(req,res)=>{
     let r = req.body
     let data ={
       username:r.username,
       password: bcrypt.hashSync(r.password,10),
       email:r.email,
       isAdmin:false,
       level:1
     }
     const user = await User.create(data)
     if(!user){
       res.status(500)
     }
     res.status(200).send(user)
  }
  //++++++++++++++++++++++++++++++++

module.exports = {Login,Register}