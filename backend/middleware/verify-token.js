const jwt = require('jsonwebtoken')
const User = require(_base+'/model/user')

const verifyToken = (req,res,next)=>{
      console.log(req.headers.authorization)
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){

    jwt.verify(req.headers.authorization.split(' ')[1],process.env.JWT_SECRET,(err,decode)=>{
      if(err || !decode){
        /*
        *My custom 511 error(Indicates frontend
        *token no longer valid in backend) So remove
        *localstorage token in frontend and redirect
        *frontend user back to login
        */
     
        return res.status(511).send({message:'Frontend AccessToken no longer valid!'})
      }
      else{
        const user = User.findOne({_id:decode.id})
        if(!user) return res.status(500).send({message:'No User!'})
        req.user = user
        next()
      }
    })
  }
  else{
     //console.log(req.headers.authorization)
     return res.status(403).send({message:'Unauthorized Access!'})
    
  }
}

module.exports = verifyToken